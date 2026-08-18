<?php
/**
 * Three Magi Press — form mail handler.
 *
 * Receives the Contact, Contribute and Lamp Post tip forms and emails them to
 * the editors. Replaces the PocketBase collections + hooks that ran on
 * Hostinger Horizons, so the site needs no backend beyond PHP.
 *
 * Deliberate choices:
 *  - The recipient is hardcoded. Nothing in the request can redirect mail.
 *  - Uploads are read from PHP's temp dir and base64'd straight into the
 *    message. No file is ever written to a web-served path, so a malicious
 *    upload has nothing to execute.
 *  - From: stays on our own domain (SPF/DKIM alignment); the submitter's
 *    address goes in Reply-To so "reply" still works.
 *  - Besides the email, one line per submission is appended to a log file
 *    OUTSIDE the web root (see LOG_FILE), because mail() returning true only
 *    means the MTA accepted the message, not that it arrived.
 */

declare(strict_types=1);

// ---------------------------------------------------------------- config ---

/** Where submissions are delivered. */
const MAIL_TO = '3rdlamp@3magipress.com';

/** Envelope / From: sender. Must be a mailbox on a domain hosted here, or
 *  receiving servers will bin it as spoofed. */
const MAIL_FROM = 'noreply@3magipress.com';
const MAIL_FROM_NAME = 'The Third Lamp';

/** Hosts allowed to post here. */
const ALLOWED_HOSTS = [
    'threemagipress.com',
    'www.threemagipress.com',
    '3magipress.com',
    'www.3magipress.com',
];

/** Only these inputs may carry files. Anything else is ignored. */
const UPLOAD_FIELDS = ['document_upload', 'image_attachments'];

const MAX_FILE_BYTES  = 8 * 1024 * 1024;   // per attachment
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;  // all attachments combined
const MAX_FIELD_CHARS = 60000;             // per text field, after trim
const MAX_SUBJECT_CHARS = 150;
const RATE_LIMIT_MAX = 5;                  // successful sends...
const RATE_LIMIT_WINDOW = 600;             // ...per this many seconds, per IP

/**
 * Accepted upload types: extension => [declared MIME, acceptable sniffed MIMEs].
 * Images and PDF must sniff exactly. Office/text formats are sniffed
 * inconsistently across libmagic versions (docx often reads as zip), so those
 * accept a short list of plausible results — but never anything that sniffs
 * as an image, script or executable (see REJECT_SNIFFED).
 */
const ALLOWED_UPLOADS = [
    'pdf'  => ['application/pdf', ['application/pdf']],
    'doc'  => ['application/msword', ['application/msword', 'application/x-ole-storage', 'application/octet-stream', 'application/CDFV2']],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
               ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream']],
    'odt'  => ['application/vnd.oasis.opendocument.text',
               ['application/vnd.oasis.opendocument.text', 'application/zip', 'application/octet-stream']],
    'rtf'  => ['application/rtf', ['application/rtf', 'text/rtf', 'text/plain']],
    'txt'  => ['text/plain', ['text/plain', 'text/x-*', 'application/octet-stream']],
    'jpg'  => ['image/jpeg', ['image/jpeg']],
    'jpeg' => ['image/jpeg', ['image/jpeg']],
    'png'  => ['image/png',  ['image/png']],
    'gif'  => ['image/gif',  ['image/gif']],
    'webp' => ['image/webp', ['image/webp']],
];

/** Sniffed types that are refused for every extension. */
const REJECT_SNIFFED = [
    'application/x-php', 'text/x-php', 'application/x-httpd-php',
    'application/x-executable', 'application/x-dosexec', 'application/x-mach-binary',
    'application/x-sh', 'application/x-shellscript', 'text/x-shellscript',
    'application/javascript', 'text/javascript', 'text/html', 'application/xhtml+xml',
];

/** Human labels for the three forms. */
const FORMS = [
    'contact'    => 'Contact enquiry',
    'submission' => 'Third Lamp submission',
    'tip'        => 'Lamp Post tip',
];

/** Fields never echoed into the email. */
const HIDDEN_FIELDS = ['form', 'company_website'];

/**
 * Where a one-line JSON record of each submission is appended. Sits one level
 * ABOVE the document root (public_html/../) so it is never web-served. If that
 * directory isn't writable the log is skipped silently — email still goes.
 */
function logFilePath(): ?string
{
    $root = $_SERVER['DOCUMENT_ROOT'] ?? '';
    if ($root === '') {
        return null;
    }
    $dir = dirname(rtrim($root, '/'));
    return $dir . '/form-submissions.log';
}

// ----------------------------------------------------------------- setup ---

ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

const JSON_FLAGS = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE;

/** Send a JSON response and stop. */
function respond(int $status, array $body): void
{
    http_response_code($status);
    $json = json_encode($body, JSON_FLAGS);
    echo $json === false ? '{"ok":false,"error":"Unexpected error."}' : $json;
    exit;
}

function fail(int $status, string $message): void
{
    respond($status, ['ok' => false, 'error' => $message]);
}

/** Strip anything that could break out of a mail header. */
function headerSafe(string $value): string
{
    return trim(str_replace(["\r", "\n", "\0"], ' ', $value));
}

/** HTML-escape, replacing (not dropping) any invalid UTF-8 sequence. */
function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Collapse a submitted value to a trimmed, length-capped string. */
function fieldValue(mixed $raw): string
{
    if (is_array($raw)) {
        $raw = implode(', ', array_map(static fn($v) => is_scalar($v) ? (string) $v : '', $raw));
    }
    if (!is_scalar($raw)) {
        return '';
    }
    $s = trim((string) $raw);
    if (mb_strlen($s, 'UTF-8') > MAX_FIELD_CHARS) {
        $s = mb_substr($s, 0, MAX_FIELD_CHARS, 'UTF-8') . "\n\n[truncated at " . MAX_FIELD_CHARS . " characters]";
    }
    return $s;
}

/** "pen_name" -> "Pen name" */
function humanLabel(string $key): string
{
    return ucfirst(str_replace('_', ' ', $key));
}

function clientIp(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** Bytes from a php.ini shorthand like "8M" or "128M". */
function iniBytes(string $key): int
{
    $v = trim((string) ini_get($key));
    if ($v === '' || $v === '-1') {
        return PHP_INT_MAX;
    }
    $n = (int) $v;
    switch (strtolower(substr($v, -1))) {
        case 'g': $n *= 1024; // no break
        case 'm': $n *= 1024; // no break
        case 'k': $n *= 1024;
    }
    return $n;
}

/**
 * Per-IP sliding window backed by a temp file. Only SUCCESSFUL sends are
 * counted (see rateLimitRecord), so a visitor fixing validation errors is
 * never locked out. Enough to stop a bot hammering the form; not a WAF.
 */
function rateLimitFile(): ?string
{
    $dir = sys_get_temp_dir() . '/tmp-form-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return null;
    }
    return $dir . '/' . hash('sha256', clientIp()) . '.json';
}

function rateLimitStamps(string $file): array
{
    $raw = @file_get_contents($file);
    $stamps = $raw === false ? [] : json_decode($raw, true);
    $stamps = is_array($stamps) ? $stamps : [];
    $floor = time() - RATE_LIMIT_WINDOW;
    return array_values(array_filter($stamps, static fn($t) => is_int($t) && $t > $floor));
}

function rateLimitExceeded(): bool
{
    $file = rateLimitFile();
    if ($file === null) {
        return false; // can't track — fail open rather than block real people
    }
    return count(rateLimitStamps($file)) >= RATE_LIMIT_MAX;
}

function rateLimitRecord(): void
{
    $file = rateLimitFile();
    if ($file === null) {
        return;
    }
    $stamps = rateLimitStamps($file);
    $stamps[] = time();
    @file_put_contents($file, json_encode($stamps), LOCK_EX);

    // Occasionally sweep stale per-IP files so the directory doesn't grow forever.
    if (random_int(1, 50) === 1) {
        $cutoff = time() - RATE_LIMIT_WINDOW * 2;
        foreach (glob(dirname($file) . '/*.json') ?: [] as $old) {
            if (@filemtime($old) < $cutoff) {
                @unlink($old);
            }
        }
    }
}

/**
 * Normalise $_FILES into a flat list, for both single (name="x") and multiple
 * (name="x[]") inputs. Only fields listed in UPLOAD_FIELDS are considered.
 */
function collectUploads(): array
{
    $out = [];
    foreach ($_FILES as $field => $info) {
        if (!in_array($field, UPLOAD_FIELDS, true) || !is_array($info) || !isset($info['name'])) {
            continue;
        }
        $names = (array) $info['name'];
        $count = count($names);
        for ($i = 0; $i < $count; $i++) {
            $get = static fn(string $k) => is_array($info[$k] ?? null) ? ($info[$k][$i] ?? null) : ($info[$k] ?? null);
            $error = (int) $get('error');
            if ($error === UPLOAD_ERR_NO_FILE) {
                continue;
            }
            $out[] = [
                'field' => $field,
                'name'  => (string) $get('name'),
                'tmp'   => (string) $get('tmp_name'),
                'size'  => (int) $get('size'),
                'error' => $error,
            ];
        }
    }
    return $out;
}

/** Friendly text for PHP's upload error codes. */
function uploadErrorText(int $code): string
{
    return match ($code) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'larger than the server allows',
        UPLOAD_ERR_PARTIAL => 'only partly uploaded — please try again',
        UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE, UPLOAD_ERR_EXTENSION => 'could not be stored by the server',
        default => 'upload failed',
    };
}

/** Does a sniffed MIME match one of the accepted patterns ("text/x-*" allowed)? */
function sniffAccepted(string $sniffed, array $accepted): bool
{
    foreach ($accepted as $pattern) {
        if ($pattern === $sniffed) {
            return true;
        }
        if (str_ends_with($pattern, '*') && str_starts_with($sniffed, substr($pattern, 0, -1))) {
            return true;
        }
    }
    return false;
}

/**
 * Validate an upload. Returns [ok, mimeOrReason].
 */
function checkUpload(array $file): array
{
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return [false, uploadErrorText($file['error'])];
    }
    if (!is_uploaded_file($file['tmp'])) {
        return [false, 'not a valid upload'];
    }
    if ($file['size'] <= 0) {
        return [false, 'empty file'];
    }
    if ($file['size'] > MAX_FILE_BYTES) {
        return [false, 'larger than ' . (int) (MAX_FILE_BYTES / 1048576) . ' MB'];
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!array_key_exists($ext, ALLOWED_UPLOADS)) {
        return [false, ($ext === '' ? 'has no file extension' : 'file type .' . $ext . ' is not accepted')];
    }
    [$declared, $accepted] = ALLOWED_UPLOADS[$ext];

    $sniffed = $declared;
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo !== false) {
            $s = finfo_file($finfo, $file['tmp']);
            finfo_close($finfo);
            if (is_string($s) && $s !== '') {
                $sniffed = strtolower($s);
            }
        }
    }

    if (in_array($sniffed, REJECT_SNIFFED, true)) {
        return [false, 'contents are not an accepted document or image'];
    }
    if (!sniffAccepted($sniffed, $accepted)) {
        return [false, 'contents do not match a .' . $ext . ' file'];
    }

    return [true, $declared];
}

/**
 * Safe, unique filename for the attachment header. Keeps the extension,
 * transliterates non-Latin names where iconv can, and de-duplicates.
 */
function safeFilename(string $name, array &$used): string
{
    $base = basename(str_replace('\\', '/', $name));
    $ext = strtolower(pathinfo($base, PATHINFO_EXTENSION));
    $stem = pathinfo($base, PATHINFO_FILENAME);

    if (function_exists('iconv')) {
        $t = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $stem);
        if (is_string($t) && trim($t) !== '') {
            $stem = $t;
        }
    }
    $stem = preg_replace('/[^A-Za-z0-9._-]+/', '_', $stem) ?? '';
    $stem = trim($stem, '._-');
    if ($stem === '') {
        $stem = 'attachment';
    }
    $stem = substr($stem, 0, 80);

    $candidate = $ext === '' ? $stem : "$stem.$ext";
    $n = 2;
    while (isset($used[$candidate])) {
        $candidate = ($ext === '' ? "$stem-$n" : "$stem-$n.$ext");
        $n++;
    }
    $used[$candidate] = true;
    return $candidate;
}

/** RFC 2047 subject: fold properly when mbstring can, else one encoded word. */
function encodeSubject(string $subject): string
{
    $subject = headerSafe($subject);
    if (mb_strlen($subject, 'UTF-8') > MAX_SUBJECT_CHARS) {
        $subject = mb_substr($subject, 0, MAX_SUBJECT_CHARS - 1, 'UTF-8') . '…';
    }
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8', 'B', "\n");
    }
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

// ------------------------------------------------------------- the request ---

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

// When a POST exceeds post_max_size PHP silently empties $_POST and $_FILES.
// Catch that first, or the visitor gets a baffling "Unknown form".
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 0 && $_POST === [] && $_FILES === []) {
    $limit = min(iniBytes('post_max_size'), iniBytes('upload_max_filesize'), MAX_TOTAL_BYTES);
    fail(413, sprintf(
        'Your message and attachments together are too large to send (limit about %d MB). '
        . 'Please remove or shrink an attachment, or email the files to %s.',
        (int) floor($limit / 1048576),
        MAIL_TO
    ));
}

// Reject cross-site posts. Browsers always send Origin on cross-origin POSTs;
// no Origin means same-origin, or a non-browser client (which the honeypot
// and rate limit deal with).
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST);
    if (!is_string($host) || !in_array(strtolower($host), ALLOWED_HOSTS, true)) {
        fail(403, 'Cross-site submissions are not accepted.');
    }
}

$formKey = strtolower(fieldValue($_POST['form'] ?? ''));
if (!array_key_exists($formKey, FORMS)) {
    fail(400, 'Unknown form.');
}

// Honeypot: a field hidden from people. Anything in it is a bot. Answer 200
// so the bot believes it succeeded and doesn't retry.
if (fieldValue($_POST['company_website'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

if (rateLimitExceeded()) {
    fail(429, 'Too many messages from this connection in a short time. Please try again in a few minutes.');
}

$submitterEmail = fieldValue($_POST['email'] ?? '');
if ($submitterEmail !== '' && !filter_var($submitterEmail, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'That email address does not look valid.');
}

// Per-form required fields and subject line.
switch ($formKey) {
    case 'contact':
        foreach (['name', 'email', 'message'] as $req) {
            if (fieldValue($_POST[$req] ?? '') === '') {
                fail(400, 'Please complete the ' . humanLabel($req) . ' field.');
            }
        }
        $category = fieldValue($_POST['category'] ?? '') ?: 'General Enquiry';
        $subjectLine = fieldValue($_POST['subject'] ?? '') ?: '(no subject)';
        $subject = sprintf('Contact — %s: %s', $category, $subjectLine);
        break;

    case 'submission':
        foreach (['name', 'email'] as $req) {
            if (fieldValue($_POST[$req] ?? '') === '') {
                fail(400, 'Please complete the ' . humanLabel($req) . ' field.');
            }
        }
        $title = fieldValue($_POST['proposed_title'] ?? '') ?: '(untitled)';
        $subject = 'New Third Lamp Submission: ' . $title;
        break;

    default: // tip
        if (fieldValue($_POST['tip'] ?? '') === '') {
            fail(400, 'Please write your tip before sending.');
        }
        $tipName = fieldValue($_POST['name'] ?? '');
        $subject = 'Lamp Post tip' . ($tipName !== '' ? ' from ' . $tipName : '');
        break;
}

// ------------------------------------------------------------ attachments ---

$attachments = [];
$rejected = [];
$totalBytes = 0;
$usedNames = [];

$uploads = collectUploads();
$maxUploads = (int) ini_get('max_file_uploads');
if ($maxUploads > 0 && count($_FILES) > 0 && count($uploads) >= $maxUploads) {
    // PHP dropped anything past its cap before we ever saw it.
    $rejected[] = 'some files — the server accepts at most ' . $maxUploads . ' files per message';
}

foreach ($uploads as $file) {
    [$ok, $detail] = checkUpload($file);
    $shown = $file['name'] !== '' ? $file['name'] : '(unnamed file)';
    if (!$ok) {
        $rejected[] = $shown . ' — ' . $detail;
        continue;
    }
    if ($totalBytes + $file['size'] > MAX_TOTAL_BYTES) {
        $rejected[] = $shown . ' — skipped, attachments exceed ' . (int) (MAX_TOTAL_BYTES / 1048576) . ' MB in total';
        continue;
    }
    $data = @file_get_contents($file['tmp']);
    if ($data === false) {
        $rejected[] = $shown . ' — could not be read';
        continue;
    }
    $totalBytes += $file['size'];
    $mime = $detail;
    if ($mime === 'text/plain') {
        $mime .= '; charset=UTF-8';
    }
    $attachments[] = [
        'filename' => safeFilename($file['name'], $usedNames),
        'mime'     => $mime,
        'encoded'  => chunk_split(base64_encode($data), 76, "\n"),
    ];
    unset($data);
}

// ------------------------------------------------------------- build mail ---

// The submission form gets every field, blank ones included, so the editors
// can tell "left blank" from "not asked". Contact and tips only show what was
// filled in.
$showBlank = $formKey === 'submission';
$rowsHtml = '';
$rowsText = '';
$logFields = [];
foreach ($_POST as $key => $raw) {
    if (!is_string($key) || in_array($key, HIDDEN_FIELDS, true)) {
        continue;
    }
    $value = fieldValue($raw);
    if ($value === '' && !$showBlank) {
        continue;
    }
    $label = humanLabel($key);
    $logFields[$key] = mb_substr($value, 0, 500, 'UTF-8');
    $display = $value === '' ? '—' : $value;
    $rowsHtml .= sprintf(
        "<tr><th align=\"left\" valign=\"top\" style=\"padding:6px 14px 6px 0;white-space:nowrap;color:#666;font-weight:normal\">%s</th>"
        . "<td style=\"padding:6px 0\">%s</td></tr>\n",
        h($label),
        nl2br(h($display))
    );
    $rowsText .= $label . ":\n" . ($value === '' ? '—' : preg_replace('/^/m', '    ', $value)) . "\n\n";
}

$received = gmdate('j M Y H:i') . ' UTC';
$noticeHtml = '';
$noticeText = '';
if ($rejected !== []) {
    $noticeHtml = '<p style="color:#a33"><strong>Attachments not included:</strong><br>'
        . implode('<br>', array_map('h', $rejected)) . '</p>';
    $noticeText = "ATTACHMENTS NOT INCLUDED:\n  - " . implode("\n  - ", $rejected) . "\n\n";
}

$html = sprintf(
    '<!doctype html><html><body style="font:14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111">'
    . '<h2 style="margin:0 0 4px">%s</h2>'
    . '<p style="margin:0 0 16px;color:#666">Received %s &middot; %d attachment(s)</p>'
    . '%s<table cellpadding="0" cellspacing="0">%s</table>'
    . '</body></html>',
    h(FORMS[$formKey]),
    h($received),
    count($attachments),
    $noticeHtml,
    $rowsHtml
);
$text = FORMS[$formKey] . "\nReceived " . $received . ' · ' . count($attachments) . " attachment(s)\n\n"
    . $noticeText . $rowsText;

// PHP's mail() hands the message to the local sendmail, which expects bare LF
// on Linux and adds CRLF on the wire itself. Sending CRLF here can end up as
// CR CR LF on some MTAs, so LF throughout (this is what PHPMailer does too).
$eol = "\n";
$mixed = '=_mixed_' . bin2hex(random_bytes(12));
$alt   = '=_alt_' . bin2hex(random_bytes(12));

$headers = [
    'MIME-Version: 1.0',
    sprintf('From: %s <%s>', headerSafe(MAIL_FROM_NAME), MAIL_FROM),
    'X-Mailer: threemagipress-forms',
    'Content-Type: multipart/mixed; boundary="' . $mixed . '"',
];
if ($submitterEmail !== '') {
    $headers[] = 'Reply-To: ' . headerSafe($submitterEmail);
}

$body = '--' . $mixed . $eol
    . 'Content-Type: multipart/alternative; boundary="' . $alt . '"' . $eol . $eol
    . '--' . $alt . $eol
    . 'Content-Type: text/plain; charset=UTF-8' . $eol
    . 'Content-Transfer-Encoding: base64' . $eol . $eol
    . chunk_split(base64_encode($text), 76, $eol) . $eol
    . '--' . $alt . $eol
    . 'Content-Type: text/html; charset=UTF-8' . $eol
    . 'Content-Transfer-Encoding: base64' . $eol . $eol
    . chunk_split(base64_encode($html), 76, $eol) . $eol
    . '--' . $alt . '--' . $eol . $eol;

foreach ($attachments as $a) {
    $body .= '--' . $mixed . $eol
        . 'Content-Type: ' . $a['mime'] . '; name="' . $a['filename'] . '"' . $eol
        . 'Content-Transfer-Encoding: base64' . $eol
        . 'Content-Disposition: attachment; filename="' . $a['filename'] . '"' . $eol . $eol
        . $a['encoded'] . $eol;
}
$body .= '--' . $mixed . '--' . $eol;
unset($attachments);

$sent = @mail(
    MAIL_TO,
    encodeSubject($subject),
    $body,
    implode($eol, $headers),
    '-f' . MAIL_FROM
);

// ---------------------------------------------------------- durable record ---

$logPath = logFilePath();
if ($logPath !== null) {
    $line = json_encode([
        'time'        => gmdate('c'),
        'form'        => $formKey,
        'ip'          => clientIp(),
        'sent'        => $sent,
        'subject'     => $subject,
        'reply_to'    => $submitterEmail,
        'attachments' => array_keys($usedNames),
        'rejected'    => $rejected,
        'fields'      => $logFields,
    ], JSON_FLAGS);
    if ($line !== false) {
        @file_put_contents($logPath, $line . "\n", FILE_APPEND | LOCK_EX);
    }
}

if (!$sent) {
    error_log('[3magi] mail() failed for form=' . $formKey);
    fail(500, 'The message could not be sent. Please email ' . MAIL_TO . ' directly.');
}

rateLimitRecord();

respond(200, [
    'ok' => true,
    'attachments' => count($usedNames),
    'rejected' => $rejected,
]);
