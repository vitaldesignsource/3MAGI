<?php
/**
 * Three Magi Press — the dashboard's read side: ranges, buckets and one
 * function per dashboard section. Header-free; admin.php does the HTTP.
 *
 * Every query is a prepared statement. Anything a request can choose (range,
 * sort, filters) arrives here already whitelisted by admin.php; values are
 * bound, never interpolated. The few strings built into SQL below are
 * constants from this file (column names, the page-group table).
 *
 * Units: timestamps are Unix seconds (UTC); durations are whole seconds;
 * percentages are 0–100 with one decimal; vitals are milliseconds except CLS,
 * which is unitless. "visitors" are daily-salted hashes, so over a range of
 * several days a returning person counts once per day they came.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli' && isset($_SERVER['SCRIPT_FILENAME'])
    && @realpath((string) $_SERVER['SCRIPT_FILENAME']) === __FILE__) {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/_analytics.php';

const TA_RANGES = ['today', 'yesterday', '7d', '30d', '90d', '12m', 'custom'];
const TA_MAX_CUSTOM_DAYS = 731;

/** [key, label, prefixes]. A prefix ending in "/" matches below it; any other
 *  prefix matches itself and everything below it. "/" alone is the home page. */
const TA_PAGE_GROUPS = [
    ['home', 'Home', ['/']],
    ['essays', 'Essays', ['/articles/']],
    ['scriptorium', 'Scriptorium', ['/third-lamp/education']],
    ['third-lamp', 'The Third Lamp', ['/third-lamp']],
    ['powers', 'The Powers', ['/powers']],
    ['christianities', 'Christianities', ['/christianities']],
    ['books', 'Books', ['/books']],
    ['membership', 'Membership', ['/plans', '/welcome', '/restore']],
    ['admin', 'Dashboard', ['/admin']],
];

const TA_CHANNEL_LABELS = [
    'search' => 'Search engines',
    'social' => 'Social',
    'ai' => 'AI assistants',
    'other' => 'Other sites',
    'direct' => 'Direct / none',
];

/** [good up to, poor above]. web.dev's published thresholds. */
const TA_VITALS = [
    'lcp' => [2500, 4000],
    'inp' => [200, 500],
    'cls' => [0.1, 0.25],
    'fcp' => [1800, 3000],
    'ttfb' => [800, 1800],
];

const TA_ISSUES = [
    'title_missing', 'title_long', 'title_duplicate',
    'description_missing', 'description_short', 'description_long', 'description_duplicate',
    'canonical_missing', 'canonical_elsewhere', 'noindex',
    'h1_missing', 'h1_multiple', 'img_no_alt',
    'og_title_missing', 'og_image_missing', 'lang_missing',
];

// ---------------------------------------------------------------- ranges ---

/**
 * Resolve a range in the owner's time zone. Returns the range array, or a
 * string naming the bad parameter.
 *
 * from is inclusive, to exclusive. A range that ends today ends NOW (to = now
 * + 1, so this second counts), and its previous period ends at the same
 * moment of the earlier day, so "today" compares like with like against
 * "yesterday up to this hour".
 */
function ta_range(string $key, ?string $from, ?string $to, string $tz, int $now)
{
    if (!in_array($key, TA_RANGES, true)) {
        return 'range';
    }
    $tz = ta_canonicalTz($tz);
    if ($tz === null) {
        return 'tz';
    }
    $zone = new DateTimeZone($tz);
    $nowDt = (new DateTimeImmutable('@' . $now))->setTimezone($zone);
    $today0 = $nowDt->setTime(0, 0, 0);
    $endsNow = true;
    switch ($key) {
        case 'today':
            [$start, $days] = [$today0, 1];
            break;
        case 'yesterday':
            [$start, $days, $endsNow] = [$today0->modify('-1 day'), 1, false];
            break;
        case '7d':
            [$start, $days] = [$today0->modify('-6 days'), 7];
            break;
        case '30d':
            [$start, $days] = [$today0->modify('-29 days'), 30];
            break;
        case '90d':
            [$start, $days] = [$today0->modify('-89 days'), 90];
            break;
        case '12m':
            [$start, $days] = [$today0->modify('-364 days'), 365];
            break;
        default:
            $f = ta_parseDay($from, $zone);
            if ($f === null) {
                return 'from';
            }
            $t = ta_parseDay($to, $zone);
            if ($t === null || $t < $f || $t > $today0) {
                return 'to';
            }
            $days = (int) $f->diff($t)->days + 1;
            if ($days > TA_MAX_CUSTOM_DAYS) {
                return 'from';
            }
            $start = $f;
            $endsNow = $t->format('Y-m-d') === $today0->format('Y-m-d');
    }
    $fromTs = $start->getTimestamp();
    // A range that ends now includes the current second (to is exclusive).
    $toTs = $endsNow ? $now + 1 : $start->modify("+$days days")->getTimestamp();
    $prevStart = $start->modify("-$days days");
    $prevTo = $endsNow ? $nowDt->modify("-$days days")->getTimestamp() + 1 : $fromTs;
    $lastDay = (new DateTimeImmutable('@' . ($toTs - 1)))->setTimezone($zone);
    return [
        'key' => $key,
        'tz' => $tz,
        'from' => $fromTs,
        'to' => $toTs,
        'prev_from' => $prevStart->getTimestamp(),
        'prev_to' => $prevTo,
        'days' => $days,
        'granularity' => $days <= 2 ? 'hour' : 'day',
        'label_from' => $start->format('Y-m-d'),
        'label_to' => $lastDay->format('Y-m-d'),
    ];
}

function ta_parseDay(?string $s, DateTimeZone $zone): ?DateTimeImmutable
{
    if ($s === null || !preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $s, $m) || !checkdate((int) $m[2], (int) $m[3], (int) $m[1])) {
        return null;
    }
    $d = DateTimeImmutable::createFromFormat('!Y-m-d', $s, $zone);
    return $d === false ? null : $d;
}

/** Chart buckets between two instants: [['ts', 'end', 'label'], …]. */
function ta_buckets(int $from, int $to, string $granularity, string $tz): array
{
    $zone = new DateTimeZone($tz);
    $out = [];
    $cur = (new DateTimeImmutable('@' . $from))->setTimezone($zone);
    if ($granularity === 'hour') {
        // Align to the start of the local hour (zones with :30 offsets included).
        $t = $from - ((($from + $cur->getOffset()) % 3600) + 3600) % 3600;
        for ($i = 0; $t < $to && $i < 2000; $i++, $t += 3600) {
            $label = (new DateTimeImmutable('@' . $t))->setTimezone($zone)->format('Y-m-d H:00');
            $out[] = ['ts' => $t, 'end' => $t + 3600, 'label' => $label];
        }
        return $out;
    }
    $day = $cur->setTime(0, 0, 0);
    for ($i = 0; $day->getTimestamp() < $to && $i < 1000; $i++) {
        $next = $day->modify('+1 day');
        $out[] = ['ts' => $day->getTimestamp(), 'end' => $next->getTimestamp(), 'label' => $day->format('Y-m-d')];
        $day = $next;
    }
    return $out;
}

/** Index of the bucket holding $ts, walking forward from $i (input sorted). */
function ta_bucketIndex(array $buckets, int $ts, int &$i): ?int
{
    $n = count($buckets);
    while ($i < $n && $ts >= $buckets[$i]['end']) {
        $i++;
    }
    return ($i < $n && $ts >= $buckets[$i]['ts']) ? $i : null;
}

// --------------------------------------------------------------- helpers ---

/** SQL filter for "people, not the owner" on a table alias. Constants only. */
function ta_who(string $alias, bool $includeOwner): string
{
    return "$alias.agent = 'human'" . ($includeOwner ? '' : " AND $alias.owner = 0");
}

function ta_all(PDO $db, string $sql, array $args = []): array
{
    $st = $db->prepare($sql);
    $st->execute($args);
    return $st->fetchAll();
}

function ta_one(PDO $db, string $sql, array $args = []): array
{
    $st = $db->prepare($sql);
    $st->execute($args);
    $row = $st->fetch();
    return $row === false ? [] : $row;
}

function ta_pct(float $part, float $whole): float
{
    return $whole > 0 ? round($part * 100 / $whole, 1) : 0.0;
}

function ta_change($value, $previous): ?float
{
    $value = (float) $value;
    $previous = (float) $previous;
    return $previous > 0 ? round(($value - $previous) * 100 / $previous, 1) : null;
}

function ta_kpi($value, $previous): array
{
    return [
        'value' => $value,
        'previous' => $previous,
        'change' => is_float($value) || is_float($previous) ? round((float) $value - (float) $previous, 2) : (int) $value - (int) $previous,
        'change_pct' => ta_change($value, $previous),
    ];
}

function ta_groupOf(string $path): string
{
    foreach (TA_PAGE_GROUPS as [$key, , $prefixes]) {
        foreach ($prefixes as $p) {
            if ($p === '/') {
                if ($path === '/') {
                    return $key;
                }
            } elseif (str_ends_with($p, '/') ? str_starts_with($path, $p) : ($path === $p || str_starts_with($path, $p . '/'))) {
                return $key;
            }
        }
    }
    return 'other';
}

function ta_groupLabel(string $key): string
{
    foreach (TA_PAGE_GROUPS as [$k, $label]) {
        if ($k === $key) {
            return $label;
        }
    }
    return 'Other';
}

/** The section a page sits in: its first path segment ("/powers/map" → "/powers"). */
function ta_sectionOf(string $path): string
{
    if ($path === '/') {
        return '/';
    }
    $seg = explode('/', ltrim($path, '/'))[0];
    return '/' . $seg;
}

/** Nearest-rank 75th percentile. */
function ta_p75(array $values): ?float
{
    $values = array_values(array_filter($values, static fn($v) => $v !== null));
    $n = count($values);
    if ($n === 0) {
        return null;
    }
    sort($values, SORT_NUMERIC);
    return (float) $values[max(0, (int) ceil(0.75 * $n) - 1)];
}

function ta_rating(string $metric, ?float $v): ?string
{
    if ($v === null) {
        return null;
    }
    [$good, $poor] = TA_VITALS[$metric];
    return $v <= $good ? 'good' : ($v <= $poor ? 'needs-improvement' : 'poor');
}

function ta_vitalsSummary(array $rows): array
{
    $out = ['n' => count($rows)];
    foreach (array_keys(TA_VITALS) as $m) {
        $vals = [];
        foreach ($rows as $r) {
            if ($r[$m] !== null) {
                $vals[] = (float) $r[$m];
            }
        }
        $p = ta_p75($vals);
        if ($p !== null) {
            $p = $m === 'cls' ? round($p, 3) : (int) round($p);
        }
        $out[$m] = ['p75' => $p, 'rating' => ta_rating($m, $p === null ? null : (float) $p), 'n' => count($vals)];
    }
    return $out;
}

/** Series of counts over buckets from a sorted list of rows with 'ts'. */
function ta_series(array $buckets, array $rows, callable $add, array $zero): array
{
    $points = [];
    $acc = [];
    foreach ($buckets as $b) {
        $points[] = ['ts' => $b['ts'], 'label' => $b['label']] + $zero;
        $acc[] = [];
    }
    $i = 0;
    foreach ($rows as $r) {
        $k = ta_bucketIndex($buckets, (int) $r['ts'], $i);
        if ($k !== null) {
            $add($points[$k], $acc[$k], $r);
        }
    }
    return $points;
}

/** Visitors / visits / pageviews per bucket. */
function ta_trafficSeries(PDO $db, int $from, int $to, string $gran, string $tz, bool $owner, ?string $path = null): array
{
    $buckets = ta_buckets($from, $to, $gran, $tz);
    $pathSql = $path !== null ? ' AND p.path = ?' : '';
    $args = $path !== null ? [$from, $to, $path] : [$from, $to];
    $pv = ta_all($db, 'SELECT p.ts, p.visitor FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . $pathSql . ' ORDER BY p.ts', $args);
    $points = ta_series($buckets, $pv, static function (array &$pt, array &$acc, array $r) {
        $pt['pageviews']++;
        if (!isset($acc[$r['visitor']])) {
            $acc[$r['visitor']] = true;
            $pt['visitors']++;
        }
    }, ['visitors' => 0, 'visits' => 0, 'pageviews' => 0]);
    if ($path === null) {
        $visits = ta_all($db, 'SELECT s.start_ts AS ts FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner) . ' ORDER BY s.start_ts', [$from, $to]);
        $i = 0;
        foreach ($visits as $r) {
            $k = ta_bucketIndex($buckets, (int) $r['ts'], $i);
            if ($k !== null) {
                $points[$k]['visits']++;
            }
        }
    } else {
        $visits = ta_all($db, 'SELECT MIN(p.ts) AS ts FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . $pathSql . ' GROUP BY p.session_id ORDER BY 1', $args);
        $i = 0;
        foreach ($visits as $r) {
            $k = ta_bucketIndex($buckets, (int) $r['ts'], $i);
            if ($k !== null) {
                $points[$k]['visits']++;
            }
        }
    }
    return $points;
}

function ta_kpiNumbers(PDO $db, int $from, int $to, bool $owner): array
{
    $p = ta_one($db, 'SELECT COUNT(*) AS pageviews, COUNT(DISTINCT p.visitor) AS visitors FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner), [$from, $to]);
    $s = ta_one($db, 'SELECT COUNT(*) AS visits, COALESCE(SUM(s.pageviews = 1), 0) AS bounces, AVG(s.last_ts - s.start_ts) AS dur, COALESCE(SUM(s.pageviews), 0) AS views
        FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner), [$from, $to]);
    $visits = (int) ($s['visits'] ?? 0);
    return [
        'visitors' => (int) ($p['visitors'] ?? 0),
        'visits' => $visits,
        'pageviews' => (int) ($p['pageviews'] ?? 0),
        'views_per_visit' => $visits > 0 ? round((int) $s['views'] / $visits, 2) : 0.0,
        'bounce_rate' => ta_pct((float) ($s['bounces'] ?? 0), (float) $visits),
        'avg_visit_s' => $visits > 0 ? (int) round((float) $s['dur']) : 0,
    ];
}

function ta_live(PDO $db, int $now, bool $owner): array
{
    $r = ta_one($db, 'SELECT COUNT(DISTINCT s.visitor) AS v FROM sessions s WHERE s.last_ts >= ? AND ' . ta_who('s', $owner), [$now - TA_LIVE_WINDOW]);
    $p = ta_one($db, 'SELECT COUNT(*) AS n FROM pageviews p WHERE p.ts >= ? AND ' . ta_who('p', $owner), [$now - TA_LIVE_WINDOW]);
    return ['visitors' => (int) ($r['v'] ?? 0), 'pageviews' => (int) ($p['n'] ?? 0), 'window_s' => TA_LIVE_WINDOW];
}

// --------------------------------------------------------------- overview ---

function ta_reportOverview(PDO $db, array $range, bool $owner, int $now): array
{
    $cur = ta_kpiNumbers($db, $range['from'], $range['to'], $owner);
    $prev = ta_kpiNumbers($db, $range['prev_from'], $range['prev_to'], $owner);
    $kpis = [];
    foreach ($cur as $k => $v) {
        $kpis[$k] = ta_kpi($v, $prev[$k]);
    }
    $args = [$range['from'], $range['to']];
    $pages = ta_all($db, 'SELECT p.path, COUNT(*) AS views, COUNT(DISTINCT p.visitor) AS visitors FROM pageviews p
        WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . ' GROUP BY p.path ORDER BY views DESC, p.path LIMIT 10', $args);
    $sources = ta_all($db, 'SELECT s.channel, s.source, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner) . ' GROUP BY s.channel, s.source ORDER BY visits DESC LIMIT 10', $args);
    $countries = ta_all($db, 'SELECT s.country, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner) . ' GROUP BY s.country ORDER BY visits DESC LIMIT 10', $args);
    $ex = ta_one($db, "SELECT COALESCE(SUM(owner = 1 AND agent = 'human'), 0) AS o, COALESCE(SUM(agent = 'bot'), 0) AS b, COALESCE(SUM(agent = 'headless'), 0) AS h
        FROM pageviews WHERE ts >= ? AND ts < ?", $args);
    return [
        'range' => $range,
        'kpis' => $kpis,
        'live' => ta_live($db, $now, $owner),
        'series' => [
            'granularity' => $range['granularity'],
            'points' => ta_trafficSeries($db, $range['from'], $range['to'], $range['granularity'], $range['tz'], $owner),
            'previous' => ta_trafficSeries($db, $range['prev_from'], $range['prev_to'], $range['granularity'], $range['tz'], $owner),
        ],
        'top_pages' => array_map(static fn($r) => ['path' => $r['path'], 'views' => (int) $r['views'], 'visitors' => (int) $r['visitors']], $pages),
        'top_sources' => array_map(static fn($r) => ta_sourceRow($r) + ['visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors']], $sources),
        'top_countries' => array_map(static fn($r) => ta_countryRow($r['country']) + ['visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors']], $countries),
        // With include_owner the owner's views are in the figures above, so
        // none of them is left out.
        'excluded' => ['owner_pageviews' => $owner ? 0 : (int) $ex['o'], 'bot_pageviews' => (int) $ex['b'], 'headless_pageviews' => (int) $ex['h']],
    ];
}

function ta_sourceRow(array $r): array
{
    $channel = (string) ($r['channel'] ?? 'direct');
    $name = $r['source'] ?? null;
    return ['channel' => $channel, 'name' => $name === null || $name === '' ? ($channel === 'direct' ? 'Direct' : 'Unknown') : (string) $name];
}

function ta_countryRow($cc): array
{
    $cc = is_string($cc) && $cc !== '' ? $cc : null;
    return ['country' => $cc, 'name' => $cc === null ? 'Unknown' : ta_countryName($cc)];
}

// ------------------------------------------------------------------ pages ---

const TA_PAGE_SORTS = [
    'views' => 'views', 'visitors' => 'visitors', 'entries' => 'entries', 'exits' => 'exits',
    'engaged' => 'avg_engaged_s', 'scroll' => 'avg_scroll_pct', 'change' => 'change_pct', 'path' => 'path',
];

function ta_reportPages(PDO $db, array $range, bool $owner, array $opt): array
{
    $args = [$range['from'], $range['to']];
    $prefix = $opt['prefix'] ?? null;
    $prefixSql = '';
    $prefixArgs = [];
    if ($prefix !== null && $prefix !== '/') {
        $prefixSql = ' AND (p.path = ? OR substr(p.path, 1, ?) = ?)';
        $prefixArgs = [$prefix, strlen($prefix) + 1, rtrim($prefix, '/') . '/'];
    }
    $rows = ta_all($db, 'SELECT p.path, COUNT(*) AS views, COUNT(DISTINCT p.visitor) AS visitors, AVG(p.engaged_s) AS eng, AVG(p.scroll_pct) AS scr, MIN(p.is_404) AS nf
        FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . $prefixSql . ' GROUP BY p.path', array_merge($args, $prefixArgs));
    $entries = [];
    foreach (ta_all($db, 'SELECT s.landing AS path, COUNT(*) AS n FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner) . ' GROUP BY s.landing', $args) as $r) {
        $entries[$r['path']] = (int) $r['n'];
    }
    $exits = [];
    foreach (ta_all($db, 'SELECT s.exit_path AS path, COUNT(*) AS n FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner) . ' GROUP BY s.exit_path', $args) as $r) {
        $exits[$r['path']] = (int) $r['n'];
    }
    $prev = [];
    foreach (ta_all($db, 'SELECT p.path, COUNT(*) AS n FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . ' GROUP BY p.path', [$range['prev_from'], $range['prev_to']]) as $r) {
        $prev[$r['path']] = (int) $r['n'];
    }
    $titles = [];
    foreach (ta_all($db, 'SELECT path, title FROM page_facts') as $r) {
        $titles[$r['path']] = $r['title'];
    }
    $pages = [];
    $groups = [];
    foreach ($rows as $r) {
        $path = (string) $r['path'];
        $g = ta_groupOf($path);
        $views = (int) $r['views'];
        $pv = $prev[$path] ?? 0;
        $page = [
            'path' => $path,
            'group' => $g,
            'section' => ta_sectionOf($path),
            'title' => $titles[$path] ?? null,
            'views' => $views,
            'visitors' => (int) $r['visitors'],
            'entries' => $entries[$path] ?? 0,
            'exits' => $exits[$path] ?? 0,
            'avg_engaged_s' => $r['eng'] === null ? null : (int) round((float) $r['eng']),
            'avg_scroll_pct' => $r['scr'] === null ? null : round((float) $r['scr'], 1),
            'prev_views' => $pv,
            'change_pct' => ta_change($views, $pv),
            'not_found' => (int) $r['nf'] === 1,
        ];
        if (($opt['group'] ?? null) !== null && $opt['group'] !== $g) {
            continue;
        }
        $pages[] = $page;
    }
    // Group totals need distinct visitors per group, so they are counted in SQL.
    $case = ta_groupCaseSql('p.path');
    foreach (ta_all($db, "SELECT $case AS g, COUNT(*) AS views, COUNT(DISTINCT p.visitor) AS visitors, COUNT(DISTINCT p.path) AS pages
        FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND " . ta_who('p', $owner) . ' GROUP BY g', $args) as $r) {
        $groups[(string) $r['g']] = ['group' => (string) $r['g'], 'label' => ta_groupLabel((string) $r['g']),
            'prefixes' => ta_groupPrefixes((string) $r['g']), 'views' => (int) $r['views'], 'visitors' => (int) $r['visitors'], 'pages' => (int) $r['pages']];
    }
    usort($groups, static fn($a, $b) => $b['views'] <=> $a['views']);

    $rising = array_values(array_filter($pages, static fn($p) => $p['views'] > $p['prev_views'] && !$p['not_found']));
    usort($rising, static fn($a, $b) => [($b['views'] - $b['prev_views']), $b['views']] <=> [($a['views'] - $a['prev_views']), $a['views']]);
    $rising = array_map(static fn($p) => ['path' => $p['path'], 'title' => $p['title'], 'views' => $p['views'], 'prev_views' => $p['prev_views'],
        'gain' => $p['views'] - $p['prev_views'], 'change_pct' => $p['change_pct']], array_slice($rising, 0, 10));

    $sort = TA_PAGE_SORTS[$opt['sort'] ?? 'views'] ?? 'views';
    $desc = ($opt['dir'] ?? 'desc') !== 'asc';
    usort($pages, static function ($a, $b) use ($sort, $desc) {
        $x = $a[$sort];
        $y = $b[$sort];
        if ($x === $y) {
            return $b['views'] <=> $a['views'] ?: strcmp($a['path'], $b['path']);
        }
        if ($x === null) {
            return 1;
        }
        if ($y === null) {
            return -1;
        }
        $c = is_string($x) ? strcmp($x, $y) : ($x <=> $y);
        return $desc ? -$c : $c;
    });
    $total = count($pages);
    $limit = (int) ($opt['limit'] ?? 500);
    return [
        'range' => $range,
        'total_pages' => $total,
        'pages' => array_slice($pages, 0, $limit),
        'groups' => array_values($groups),
        'rising' => $rising,
    ];
}

function ta_groupPrefixes(string $key): array
{
    foreach (TA_PAGE_GROUPS as [$k, , $prefixes]) {
        if ($k === $key) {
            return $prefixes;
        }
    }
    return [];
}

/** CASE expression mapping a path column to its group key. Built from the
 *  constant table above (no request data), with quotes doubled regardless. */
function ta_groupCaseSql(string $col): string
{
    $q = static fn(string $s) => "'" . str_replace("'", "''", $s) . "'";
    $sql = 'CASE';
    foreach (TA_PAGE_GROUPS as [$key, , $prefixes]) {
        $conds = [];
        foreach ($prefixes as $p) {
            if ($p === '/') {
                $conds[] = "$col = '/'";
            } elseif (str_ends_with($p, '/')) {
                $conds[] = "substr($col, 1, " . strlen($p) . ') = ' . $q($p);
            } else {
                $conds[] = "($col = " . $q($p) . " OR substr($col, 1, " . (strlen($p) + 1) . ') = ' . $q($p . '/') . ')';
            }
        }
        $sql .= ' WHEN ' . implode(' OR ', $conds) . ' THEN ' . $q($key);
    }
    return $sql . " ELSE 'other' END";
}

function ta_reportPage(PDO $db, array $range, bool $owner, string $path, ?array $sitemap = null): array
{
    $a = [$path, $range['from'], $range['to']];
    $t = ta_one($db, 'SELECT COUNT(*) AS views, COUNT(DISTINCT p.visitor) AS visitors, AVG(p.engaged_s) AS eng, AVG(p.scroll_pct) AS scr, MIN(p.is_404) AS nf
        FROM pageviews p WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner), $a);
    $entries = (int) (ta_one($db, 'SELECT COUNT(*) AS n FROM sessions s WHERE s.landing = ? AND s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner), $a)['n'] ?? 0);
    $exits = (int) (ta_one($db, 'SELECT COUNT(*) AS n FROM sessions s WHERE s.exit_path = ? AND s.start_ts >= ? AND s.start_ts < ? AND ' . ta_who('s', $owner), $a)['n'] ?? 0);
    $pr = ta_one($db, 'SELECT COUNT(*) AS views, COUNT(DISTINCT p.visitor) AS visitors FROM pageviews p WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner),
        [$path, $range['prev_from'], $range['prev_to']]);
    $sources = ta_all($db, 'SELECT s.channel, s.source, COUNT(*) AS n FROM pageviews p JOIN sessions s ON s.id = p.session_id
        WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND p.seq = 1 AND ' . ta_who('p', $owner) . ' GROUP BY s.channel, s.source ORDER BY n DESC LIMIT 50', $a);
    // The page a view came from is the in-app referrer the beacon reported
    // (prev_path): a reader who opens three essays from an index in new tabs
    // came to each of them from the index, whatever order the tabs report in.
    // Only a view with no referrer at all falls back to the view before it
    // in the visit.
    $prevPages = ta_all($db, 'SELECT COALESCE(p.prev_path, pr.path) AS path, COUNT(*) AS n FROM pageviews p
        LEFT JOIN pageviews pr ON p.prev_path IS NULL AND p.ref IS NULL AND pr.session_id = p.session_id AND pr.seq = p.seq - 1
        WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . ' AND COALESCE(p.prev_path, pr.path) IS NOT NULL
        GROUP BY 1 ORDER BY n DESC, 1 LIMIT 50', $a);
    // The pages opened from this one, later in the same visit, by the same rule.
    $nextPages = ta_all($db, 'SELECT nx.path, COUNT(DISTINCT nx.id) AS n FROM pageviews p
        JOIN pageviews nx ON nx.session_id = p.session_id AND nx.seq > p.seq
            AND (nx.prev_path = p.path OR (nx.prev_path IS NULL AND nx.ref IS NULL AND nx.seq = p.seq + 1))
        WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . ' GROUP BY nx.path ORDER BY n DESC, nx.path LIMIT 50', $a);
    $views = (int) ($t['views'] ?? 0);
    // Views that were the last of their visit, counted in full (not from the
    // first 50 next pages above).
    $last = (int) (ta_one($db, 'SELECT COUNT(*) AS n FROM pageviews p WHERE p.path = ? AND p.ts >= ? AND p.ts < ? AND ' . ta_who('p', $owner) . '
        AND NOT EXISTS (SELECT 1 FROM pageviews nx WHERE nx.session_id = p.session_id AND nx.seq > p.seq)', $a)['n'] ?? 0);
    $facts = ta_one($db, 'SELECT * FROM page_facts WHERE path = ?', [$path]);
    $vit = ta_all($db, 'SELECT v.lcp, v.cls, v.inp, v.fcp, v.ttfb FROM vitals v WHERE v.path = ? AND v.ts >= ? AND v.ts < ? AND ' . ta_who('v', $owner), $a);
    $crawls = ta_all($db, 'SELECT bot, COUNT(*) AS n, MAX(ts) AS last FROM crawls WHERE path = ? AND ts >= ? AND ts < ? GROUP BY bot ORDER BY n DESC', $a);
    return [
        'range' => $range,
        'path' => $path,
        'group' => ta_groupOf($path),
        'title' => $facts['title'] ?? null,
        'not_found' => $views > 0 && (int) $t['nf'] === 1,
        'in_sitemap' => $sitemap === null ? null : in_array($path, $sitemap, true),
        'totals' => [
            'views' => $views,
            'visitors' => (int) ($t['visitors'] ?? 0),
            'entries' => $entries,
            'exits' => $exits,
            'avg_engaged_s' => ($t['eng'] ?? null) === null ? null : (int) round((float) $t['eng']),
            'avg_scroll_pct' => ($t['scr'] ?? null) === null ? null : round((float) $t['scr'], 1),
        ],
        'previous' => ['views' => (int) ($pr['views'] ?? 0), 'visitors' => (int) ($pr['visitors'] ?? 0)],
        'change_pct' => ta_change($views, (int) ($pr['views'] ?? 0)),
        'sources' => array_map(static fn($r) => ta_sourceRow($r) + ['entries' => (int) $r['n']], $sources),
        'previous_pages' => array_map(static fn($r) => ['path' => $r['path'], 'views' => (int) $r['n']], $prevPages),
        'next_pages' => array_map(static fn($r) => ['path' => $r['path'], 'views' => (int) $r['n']], $nextPages),
        'left_site' => $last,
        'series' => [
            'granularity' => $range['granularity'],
            'points' => array_map(static fn($p) => ['ts' => $p['ts'], 'label' => $p['label'], 'views' => $p['pageviews'], 'visitors' => $p['visitors']],
                ta_trafficSeries($db, $range['from'], $range['to'], $range['granularity'], $range['tz'], $owner, $path)),
        ],
        'facts' => $facts === [] ? null : ta_factsRow($facts),
        'vitals' => $vit === [] ? null : ta_vitalsSummary($vit),
        'crawls' => [
            'hits' => array_sum(array_map(static fn($r) => (int) $r['n'], $crawls)),
            'last' => $crawls === [] ? null : max(array_map(static fn($r) => (int) $r['last'], $crawls)),
            'bots' => array_map(static fn($r) => ['bot' => $r['bot'], 'hits' => (int) $r['n'], 'last' => (int) $r['last']], $crawls),
        ],
    ];
}

function ta_factsRow(array $f): array
{
    return [
        'checked' => (int) $f['ts'],
        'title' => $f['title'],
        'description' => $f['description'],
        'canonical' => $f['canonical'],
        'robots' => $f['robots'],
        'lang' => $f['lang'],
        'h1_count' => $f['h1_count'] === null ? null : (int) $f['h1_count'],
        'og_title' => $f['og_title'] === null ? null : (bool) $f['og_title'],
        'og_image' => $f['og_image'] === null ? null : (bool) $f['og_image'],
        'img_no_alt' => $f['img_no_alt'] === null ? null : (int) $f['img_no_alt'],
    ];
}

// ---------------------------------------------------------------- sources ---

function ta_reportSources(PDO $db, array $range, bool $owner): array
{
    $args = [$range['from'], $range['to']];
    $w = ta_who('s', $owner);
    $chan = [];
    foreach (TA_CHANNELS as $c) {
        $chan[$c] = ['channel' => $c, 'label' => TA_CHANNEL_LABELS[$c], 'visits' => 0, 'visitors' => 0, 'pageviews' => 0, 'bounce_rate' => 0.0, 'prev_visits' => 0, 'change_pct' => null];
    }
    foreach (ta_all($db, "SELECT s.channel, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors, SUM(s.pageviews) AS pv, SUM(s.pageviews = 1) AS b
        FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.channel", $args) as $r) {
        $c = (string) $r['channel'];
        if (!isset($chan[$c])) {
            continue;
        }
        $chan[$c]['visits'] = (int) $r['visits'];
        $chan[$c]['visitors'] = (int) $r['visitors'];
        $chan[$c]['pageviews'] = (int) $r['pv'];
        $chan[$c]['bounce_rate'] = ta_pct((float) $r['b'], (float) $r['visits']);
    }
    foreach (ta_all($db, "SELECT s.channel, COUNT(*) AS visits FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.channel",
        [$range['prev_from'], $range['prev_to']]) as $r) {
        if (isset($chan[$r['channel']])) {
            $chan[$r['channel']]['prev_visits'] = (int) $r['visits'];
        }
    }
    foreach ($chan as $c => $row) {
        $chan[$c]['change_pct'] = ta_change($row['visits'], $row['prev_visits']);
    }

    $sources = [];
    foreach (ta_all($db, "SELECT s.channel, s.source, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors, SUM(s.pageviews = 1) AS b
        FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.channel, s.source ORDER BY visits DESC LIMIT 200", $args) as $r) {
        $k = $r['channel'] . "\0" . ($r['source'] ?? '');
        $sources[$k] = ta_sourceRow($r) + ['visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'],
            'bounce_rate' => ta_pct((float) $r['b'], (float) $r['visits']), 'hosts' => [], 'landing_pages' => []];
    }
    $hosts = [];
    foreach (ta_all($db, "SELECT s.channel, s.source, s.ref_host, s.ref, COUNT(*) AS n FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $w AND s.ref_host IS NOT NULL GROUP BY s.channel, s.source, s.ref_host, s.ref ORDER BY n DESC", $args) as $r) {
        $k = $r['channel'] . "\0" . ($r['source'] ?? '');
        if (!isset($sources[$k])) {
            continue;
        }
        $h = (string) $r['ref_host'];
        $hosts[$k][$h] ??= ['host' => $h, 'visits' => 0, 'referrers' => []];
        $hosts[$k][$h]['visits'] += (int) $r['n'];
        if (count($hosts[$k][$h]['referrers']) < 25) {
            $hosts[$k][$h]['referrers'][] = ['ref' => $r['ref'], 'visits' => (int) $r['n']];
        }
    }
    foreach ($hosts as $k => $list) {
        usort($list, static fn($a, $b) => $b['visits'] <=> $a['visits']);
        $sources[$k]['hosts'] = array_values($list);
    }
    foreach (ta_all($db, "SELECT s.channel, s.source, s.landing, COUNT(*) AS n FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.channel, s.source, s.landing ORDER BY n DESC", $args) as $r) {
        $k = $r['channel'] . "\0" . ($r['source'] ?? '');
        if (isset($sources[$k]) && count($sources[$k]['landing_pages']) < 15) {
            $sources[$k]['landing_pages'][] = ['path' => $r['landing'], 'visits' => (int) $r['n']];
        }
    }
    $campaigns = ta_all($db, "SELECT s.utm_source, s.utm_medium, s.utm_campaign, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors, SUM(s.pageviews) AS pv
        FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w AND (s.utm_source IS NOT NULL OR s.utm_medium IS NOT NULL OR s.utm_campaign IS NOT NULL)
        GROUP BY s.utm_source, s.utm_medium, s.utm_campaign ORDER BY visits DESC LIMIT 200", $args);
    return [
        'range' => $range,
        'channels' => array_values($chan),
        'sources' => array_values($sources),
        'campaigns' => array_map(static fn($r) => ['source' => $r['utm_source'], 'medium' => $r['utm_medium'], 'campaign' => $r['utm_campaign'],
            'visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'], 'pageviews' => (int) $r['pv']], $campaigns),
    ];
}

// ----------------------------------------------------------------- search ---

function ta_reportSearch(PDO $db, array $range, bool $owner): array
{
    $args = [$range['from'], $range['to']];
    $w = ta_who('q', $owner);
    $t = ta_one($db, "SELECT COUNT(*) AS n, COUNT(DISTINCT q.query) AS u, COALESCE(SUM(q.results = 0), 0) AS z, COUNT(DISTINCT q.visitor) AS v
        FROM searches q WHERE q.ts >= ? AND q.ts < ? AND $w", $args);
    $rows = ta_all($db, "SELECT q.ts, q.results FROM searches q WHERE q.ts >= ? AND q.ts < ? AND $w ORDER BY q.ts", $args);
    $gran = $range['granularity'];
    $points = ta_series(ta_buckets($range['from'], $range['to'], $gran, $range['tz']), $rows, static function (array &$pt, array &$acc, array $r) {
        $pt['searches']++;
        if ($r['results'] !== null && (int) $r['results'] === 0) {
            $pt['no_results']++;
        }
    }, ['searches' => 0, 'no_results' => 0]);
    $top = ta_all($db, "SELECT q.query, COUNT(*) AS n, COUNT(DISTINCT q.visitor) AS v, AVG(q.results) AS r, MAX(q.ts) AS last
        FROM searches q WHERE q.ts >= ? AND q.ts < ? AND $w GROUP BY q.query ORDER BY n DESC, q.query LIMIT 100", $args);
    $none = ta_all($db, "SELECT q.query, COUNT(*) AS n, COUNT(DISTINCT q.visitor) AS v, MAX(q.ts) AS last
        FROM searches q WHERE q.ts >= ? AND q.ts < ? AND $w AND q.results = 0 GROUP BY q.query ORDER BY n DESC, q.query LIMIT 100", $args);
    return [
        'range' => $range,
        'totals' => ['searches' => (int) $t['n'], 'unique_queries' => (int) $t['u'], 'no_result_searches' => (int) $t['z'], 'searchers' => (int) $t['v']],
        'per_day' => ['granularity' => $gran, 'points' => $points],
        'top' => array_map(static fn($r) => ['query' => $r['query'], 'searches' => (int) $r['n'], 'visitors' => (int) $r['v'],
            'avg_results' => $r['r'] === null ? null : round((float) $r['r'], 1), 'last' => (int) $r['last']], $top),
        'no_results' => array_map(static fn($r) => ['query' => $r['query'], 'searches' => (int) $r['n'], 'visitors' => (int) $r['v'], 'last' => (int) $r['last']], $none),
    ];
}

// ------------------------------------------------------------- technology ---

function ta_reportTechnology(PDO $db, array $range, bool $owner): array
{
    $args = [$range['from'], $range['to']];
    $w = ta_who('s', $owner);
    $total = (int) (ta_one($db, "SELECT COUNT(*) AS n FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w", $args)['n'] ?? 0);
    $dim = static function (string $col, int $limit = 50) use ($db, $args, $w, $total): array {
        $rows = ta_all($db, "SELECT $col AS name, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
            WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY $col ORDER BY visits DESC LIMIT $limit", $args);
        return array_map(static fn($r) => ['name' => $r['name'] === null || $r['name'] === '' ? 'Unknown' : (string) $r['name'],
            'visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'], 'pct' => ta_pct((float) $r['visits'], (float) $total)], $rows);
    };
    $withVersions = static function (string $col, string $ver) use ($db, $args, $w, $dim): array {
        $list = $dim("s.$col");
        $vers = [];
        foreach (ta_all($db, "SELECT s.$col AS name, s.$ver AS ver, COUNT(*) AS n FROM sessions s WHERE s.start_ts >= ? AND s.start_ts < ? AND $w
            GROUP BY s.$col, s.$ver ORDER BY n DESC", $args) as $r) {
            $name = $r['name'] === null || $r['name'] === '' ? 'Unknown' : (string) $r['name'];
            if (count($vers[$name] ?? []) < 10) {
                $vers[$name][] = ['version' => $r['ver'] ?? 'Unknown', 'visits' => (int) $r['n']];
            }
        }
        foreach ($list as $i => $row) {
            $list[$i]['versions'] = $vers[$row['name']] ?? [];
        }
        return $list;
    };
    $screens = ta_all($db, "SELECT s.screen_w AS sw, s.screen_h AS sh, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $w AND s.screen_w IS NOT NULL AND s.screen_h IS NOT NULL GROUP BY sw, sh ORDER BY visits DESC LIMIT 30", $args);
    $vpCase = "CASE WHEN s.viewport_w IS NULL THEN 'Unknown' WHEN s.viewport_w < 480 THEN '<480' WHEN s.viewport_w < 768 THEN '480–767'
        WHEN s.viewport_w < 1024 THEN '768–1023' WHEN s.viewport_w < 1280 THEN '1024–1279' ELSE '≥1280' END";
    $langs = ta_all($db, "SELECT s.lang AS name, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.lang ORDER BY visits DESC LIMIT 50", $args);
    $countries = ta_all($db, "SELECT s.country, COUNT(*) AS visits, COUNT(DISTINCT s.visitor) AS visitors FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $w GROUP BY s.country ORDER BY visits DESC", $args);
    return [
        'range' => $range,
        'visits' => $total,
        'devices' => $dim('s.device'),
        'browsers' => $withVersions('browser', 'browser_ver'),
        'os' => $withVersions('os', 'os_ver'),
        'screens' => array_map(static fn($r) => ['name' => $r['sw'] . '×' . $r['sh'], 'width' => (int) $r['sw'], 'height' => (int) $r['sh'],
            'visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'], 'pct' => ta_pct((float) $r['visits'], (float) $total)], $screens),
        'viewports' => $dim($vpCase, 10),
        'languages' => array_map(static fn($r) => ['name' => $r['name'] ?? 'Unknown', 'primary' => $r['name'] === null ? null : explode('-', (string) $r['name'])[0],
            'visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'], 'pct' => ta_pct((float) $r['visits'], (float) $total)], $langs),
        'countries' => array_map(static fn($r) => ta_countryRow($r['country']) + ['visits' => (int) $r['visits'], 'visitors' => (int) $r['visitors'],
            'pct' => ta_pct((float) $r['visits'], (float) $total)], $countries),
    ];
}

// --------------------------------------------------------------- visitors ---

function ta_visitRow(array $s): array
{
    $utm = ($s['utm_source'] ?? null) !== null || ($s['utm_medium'] ?? null) !== null || ($s['utm_campaign'] ?? null) !== null
        ? ['source' => $s['utm_source'], 'medium' => $s['utm_medium'], 'campaign' => $s['utm_campaign']] : null;
    return [
        'id' => $s['id'],
        'start' => (int) $s['start_ts'],
        'last' => (int) $s['last_ts'],
        'duration_s' => (int) $s['last_ts'] - (int) $s['start_ts'],
        'ip' => $s['ip'],
        'ip_masked' => (bool) $s['ip_masked'],
        'gpc' => (bool) $s['gpc'],
        'country' => $s['country'],
        'country_name' => $s['country'] === null ? null : ta_countryName((string) $s['country']),
        'country_source' => 'time_zone',
        'tz' => $s['tz'],
        'device' => $s['device'],
        'browser' => $s['browser'],
        'browser_version' => $s['browser_ver'],
        'os' => $s['os'],
        'os_version' => $s['os_ver'],
        'lang' => $s['lang'],
        'screen' => $s['screen_w'] !== null && $s['screen_h'] !== null ? $s['screen_w'] . '×' . $s['screen_h'] : null,
        'landing' => $s['landing'],
        'exit' => $s['exit_path'],
        'pages' => (int) $s['pageviews'],
        'channel' => $s['channel'],
        'source' => ta_sourceRow($s)['name'],
        'referrer' => $s['ref'],
        'utm' => $utm,
        'agent' => $s['agent'],
        'bot' => $s['bot'],
        'owner' => (bool) $s['owner'],
    ];
}

/** $f: ip, page, country, device, channel, source, agent, limit, offset — validated by admin.php. */
function ta_reportVisitors(PDO $db, array $range, bool $owner, array $f): array
{
    $where = ['s.start_ts >= ?', 's.start_ts < ?'];
    $args = [$range['from'], $range['to']];
    $agent = $f['agent'] ?? 'human';
    if ($agent !== 'all') {
        $where[] = 's.agent = ?';
        $args[] = $agent;
    }
    if (!$owner) {
        $where[] = 's.owner = 0';
    }
    foreach (['ip' => 's.ip = ?', 'country' => 's.country = ?', 'device' => 's.device = ?', 'channel' => 's.channel = ?'] as $k => $cond) {
        if (($f[$k] ?? null) !== null) {
            $where[] = $cond;
            $args[] = $f[$k];
        }
    }
    if (($f['source'] ?? null) !== null) {
        if ($f['source'] === 'Direct') {
            $where[] = "(s.source IS NULL AND s.channel = 'direct')";
        } else {
            $where[] = 's.source = ?';
            $args[] = $f['source'];
        }
    }
    if (($f['page'] ?? null) !== null) {
        $where[] = 'EXISTS (SELECT 1 FROM pageviews p WHERE p.session_id = s.id AND p.path = ?)';
        $args[] = $f['page'];
    }
    $sqlWhere = implode(' AND ', $where);
    $total = (int) (ta_one($db, "SELECT COUNT(*) AS n FROM sessions s WHERE $sqlWhere", $args)['n'] ?? 0);
    $limit = (int) ($f['limit'] ?? 50);
    $offset = (int) ($f['offset'] ?? 0);
    $rows = ta_all($db, "SELECT s.* FROM sessions s WHERE $sqlWhere ORDER BY s.start_ts DESC, s.id LIMIT ? OFFSET ?", array_merge($args, [$limit, $offset]));
    return ['range' => $range, 'total' => $total, 'offset' => $offset, 'limit' => $limit, 'visits' => array_map('ta_visitRow', $rows)];
}

/** Everything one address did within retention. */
function ta_reportVisitor(PDO $db, string $ip): array
{
    $sum = ta_one($db, 'SELECT COUNT(*) AS n, MIN(start_ts) AS first, MAX(last_ts) AS last, COALESCE(SUM(pageviews), 0) AS pv, MAX(ip_masked) AS m FROM sessions WHERE ip = ?', [$ip]);
    $sessions = ta_all($db, 'SELECT * FROM sessions WHERE ip = ? ORDER BY start_ts DESC LIMIT 200', [$ip]);
    $pages = [];
    if ($sessions !== []) {
        $ids = array_column($sessions, 'id');
        $ph = implode(',', array_fill(0, count($ids), '?'));
        foreach (ta_all($db, "SELECT session_id, ts, path, engaged_s, scroll_pct, is_404 FROM pageviews WHERE session_id IN ($ph) ORDER BY ts, seq", $ids) as $p) {
            $pages[$p['session_id']][] = ['ts' => (int) $p['ts'], 'path' => $p['path'],
                'engaged_s' => $p['engaged_s'] === null ? null : (int) $p['engaged_s'],
                'scroll_pct' => $p['scroll_pct'] === null ? null : (int) $p['scroll_pct'], 'not_found' => (bool) $p['is_404']];
        }
    }
    $uas = ta_all($db, 'SELECT ua, browser, browser_ver, os, os_ver, device, agent, bot, COUNT(*) AS n, MIN(start_ts) AS first, MAX(last_ts) AS last
        FROM sessions WHERE ip = ? GROUP BY ua, browser, browser_ver, os, os_ver, device, agent, bot ORDER BY last DESC', [$ip]);
    $countries = ta_all($db, 'SELECT country, COUNT(*) AS n FROM sessions WHERE ip = ? GROUP BY country ORDER BY n DESC', [$ip]);
    $cb = ta_all($db, 'SELECT bot, COUNT(*) AS n, MAX(ts) AS last FROM crawls WHERE ip = ? GROUP BY bot ORDER BY n DESC', [$ip]);
    $cr = ta_all($db, 'SELECT ts, path, kind, bot, status, verdict FROM crawls WHERE ip = ? ORDER BY ts DESC LIMIT 100', [$ip]);
    $firstCrawl = ta_one($db, 'SELECT MIN(ts) AS f, MAX(ts) AS l FROM crawls WHERE ip = ?', [$ip]);
    $first = array_filter([$sum['first'] ?? null, $firstCrawl['f'] ?? null], static fn($v) => $v !== null);
    $last = array_filter([$sum['last'] ?? null, $firstCrawl['l'] ?? null], static fn($v) => $v !== null);
    return [
        'ip' => $ip,
        'masked' => ta_isMaskedForm($ip) || (int) ($sum['m'] ?? 0) === 1,
        'ip_retention_days' => ta_ipDays(),
        'first_seen' => $first === [] ? null : (int) min($first),
        'last_seen' => $last === [] ? null : (int) max($last),
        'visits_count' => (int) ($sum['n'] ?? 0),
        'pageviews_count' => (int) ($sum['pv'] ?? 0),
        'user_agents' => array_map(static fn($r) => ['ua' => $r['ua'] === '' ? null : $r['ua'], 'browser' => $r['browser'], 'browser_version' => $r['browser_ver'],
            'os' => $r['os'], 'os_version' => $r['os_ver'], 'device' => $r['device'], 'agent' => $r['agent'], 'bot' => $r['bot'],
            'visits' => (int) $r['n'], 'first' => (int) $r['first'], 'last' => (int) $r['last']], $uas),
        'countries' => array_map(static fn($r) => ta_countryRow($r['country']) + ['visits' => (int) $r['n']], $countries),
        'visits' => array_map(static fn($s) => ta_visitRow($s) + ['page_views' => $pages[$s['id']] ?? []], $sessions),
        'crawls' => [
            'hits' => array_sum(array_map(static fn($r) => (int) $r['n'], $cb)),
            'bots' => array_map(static fn($r) => ['bot' => $r['bot'], 'hits' => (int) $r['n'], 'last' => (int) $r['last']], $cb),
            'recent' => array_map(static fn($r) => ['ts' => (int) $r['ts'], 'path' => $r['path'], 'kind' => $r['kind'], 'bot' => $r['bot'],
                'status' => (int) $r['status'], 'verdict' => $r['verdict']], $cr),
        ],
    ];
}

function ta_reportLive(PDO $db, int $now, bool $owner): array
{
    $since = $now - TA_LIVE_WINDOW;
    $visits = ta_all($db, 'SELECT s.* FROM sessions s WHERE s.last_ts >= ? AND ' . ta_who('s', $owner) . ' ORDER BY s.last_ts DESC LIMIT 100', [$since]);
    $pages = ta_all($db, 'SELECT p.path, COUNT(DISTINCT p.visitor) AS v, COUNT(*) AS n FROM pageviews p WHERE p.ts >= ? AND ' . ta_who('p', $owner)
        . ' GROUP BY p.path ORDER BY v DESC, n DESC LIMIT 50', [$since]);
    $recent = ta_all($db, 'SELECT p.ts, p.path, s.id AS sid, s.ip, s.ip_masked, s.country, s.device, s.browser, s.os, s.channel, s.source
        FROM pageviews p JOIN sessions s ON s.id = p.session_id WHERE p.ts >= ? AND ' . ta_who('p', $owner) . ' ORDER BY p.ts DESC, p.id DESC LIMIT 50', [$since]);
    $live = ta_live($db, $now, $owner);
    return [
        'now' => $now,
        'window_s' => TA_LIVE_WINDOW,
        'visitors' => $live['visitors'],
        'pageviews' => $live['pageviews'],
        'pages' => array_map(static fn($r) => ['path' => $r['path'], 'visitors' => (int) $r['v'], 'views' => (int) $r['n']], $pages),
        'visits' => array_map(static fn($s) => ['id' => $s['id'], 'ip' => $s['ip'], 'ip_masked' => (bool) $s['ip_masked'], 'country' => $s['country'],
            'country_name' => $s['country'] === null ? null : ta_countryName((string) $s['country']), 'device' => $s['device'], 'browser' => $s['browser'],
            'os' => $s['os'], 'current_path' => $s['exit_path'], 'landing' => $s['landing'], 'pages' => (int) $s['pageviews'],
            'start' => (int) $s['start_ts'], 'last' => (int) $s['last_ts'], 'channel' => $s['channel'], 'source' => ta_sourceRow($s)['name']], $visits),
        'recent' => array_map(static fn($r) => ['ts' => (int) $r['ts'], 'path' => $r['path'], 'visit_id' => $r['sid'], 'ip' => $r['ip'], 'ip_masked' => (bool) $r['ip_masked'],
            'country' => $r['country'], 'device' => $r['device'], 'browser' => $r['browser'], 'os' => $r['os'], 'channel' => $r['channel'],
            'source' => ta_sourceRow($r)['name']], $recent),
    ];
}

// --------------------------------------------------------------- crawlers ---

function ta_verificationLabel(string $bot, int $hits, int $verified, int $failed): string
{
    $family = ta_crawlerFamily($bot);
    if (!isset(TA_VERIFY_DOMAINS[$family])) {
        return 'unverifiable';
    }
    if ($hits > 0 && $verified === $hits) {
        return 'verified';
    }
    if ($hits > 0 && $failed === $hits) {
        return 'failed';
    }
    return $verified > 0 || $failed > 0 ? 'mixed' : 'claimed';
}

function ta_reportCrawlers(PDO $db, array $range, ?string $bot, ?array $sitemap): array
{
    $where = 'c.ts >= ? AND c.ts < ?';
    $args = [$range['from'], $range['to']];
    if ($bot !== null) {
        $where .= ' AND c.bot = ?';
        $args[] = $bot;
    }
    // "Pages" are pages: robots.txt, sitemap.xml and llms.txt are counted apart.
    $t = ta_one($db, "SELECT COUNT(*) AS n, COUNT(DISTINCT c.bot) AS b, COUNT(DISTINCT CASE WHEN c.kind = 'page' THEN c.path END) AS p,
        COALESCE(SUM(c.verdict = 'verified'), 0) AS v, COALESCE(SUM(c.verdict = 'failed'), 0) AS f FROM crawls c WHERE $where", $args);
    $bots = ta_all($db, "SELECT c.bot, COUNT(*) AS n, COUNT(DISTINCT CASE WHEN c.kind = 'page' THEN c.path END) AS p, COUNT(DISTINCT c.ip) AS ips, MAX(c.ts) AS last,
        COALESCE(SUM(c.verdict = 'verified'), 0) AS v, COALESCE(SUM(c.verdict = 'failed'), 0) AS f
        FROM crawls c WHERE $where GROUP BY c.bot ORDER BY n DESC", $args);
    $buckets = ta_buckets($range['from'], $range['to'], $range['granularity'], $range['tz']);
    $top = array_slice(array_column($bots, 'bot'), 0, 8);
    $counts = [];
    foreach ($top as $b) {
        $counts[$b] = array_fill(0, count($buckets), 0);
    }
    $other = array_fill(0, count($buckets), 0);
    $i = 0;
    foreach (ta_all($db, "SELECT c.ts, c.bot FROM crawls c WHERE $where ORDER BY c.ts", $args) as $r) {
        $k = ta_bucketIndex($buckets, (int) $r['ts'], $i);
        if ($k === null) {
            continue;
        }
        if (isset($counts[$r['bot']])) {
            $counts[$r['bot']][$k]++;
        } else {
            $other[$k]++;
        }
    }
    $series = [];
    foreach ($counts as $b => $c) {
        $series[] = ['bot' => $b, 'counts' => $c];
    }
    if (array_sum($other) > 0) {
        $series[] = ['bot' => 'Other', 'counts' => $other];
    }
    $pages = ta_all($db, "SELECT c.path, COUNT(*) AS n, MAX(c.ts) AS last, GROUP_CONCAT(DISTINCT c.bot) AS bots
        FROM crawls c WHERE $where AND c.kind = 'page' GROUP BY c.path ORDER BY n DESC, c.path LIMIT 500", $args);
    $files = ['robots' => null, 'sitemap' => null, 'llms' => null];
    foreach (array_keys($files) as $kind) {
        $files[$kind] = ['hits' => 0, 'last' => null, 'bots' => []];
    }
    foreach (ta_all($db, "SELECT c.kind, c.bot, COUNT(*) AS n, MAX(c.ts) AS last FROM crawls c WHERE $where AND c.kind <> 'page' GROUP BY c.kind, c.bot ORDER BY n DESC", $args) as $r) {
        $k = (string) $r['kind'];
        if (!isset($files[$k])) {
            continue;
        }
        $files[$k]['hits'] += (int) $r['n'];
        $files[$k]['last'] = max((int) $files[$k]['last'], (int) $r['last']);
        $files[$k]['bots'][] = ['bot' => $r['bot'], 'hits' => (int) $r['n'], 'last' => (int) $r['last']];
    }
    $ips = ta_all($db, "SELECT c.ip, c.bot, MAX(c.ip_masked) AS m, COUNT(*) AS n, MAX(c.ts) AS last, v.verdict, v.ptr, v.checked_ts
        FROM crawls c LEFT JOIN bot_verdicts v ON v.ip = c.ip WHERE $where GROUP BY c.ip, c.bot ORDER BY n DESC LIMIT 300", $args);
    $recent = ta_all($db, "SELECT c.ts, c.path, c.kind, c.bot, c.ip, c.ip_masked, c.status, c.verdict FROM crawls c WHERE $where ORDER BY c.ts DESC, c.id DESC LIMIT 100", $args);
    $beacon = ta_all($db, "SELECT COALESCE(s.bot, 'Unnamed bot') AS bot, COUNT(*) AS n FROM pageviews p JOIN sessions s ON s.id = p.session_id
        WHERE p.ts >= ? AND p.ts < ? AND p.agent = 'bot' GROUP BY 1 ORDER BY n DESC LIMIT 50", [$range['from'], $range['to']]);
    $inSitemap = $sitemap === null ? null : array_flip($sitemap);
    return [
        'range' => $range,
        'totals' => ['hits' => (int) $t['n'], 'bots' => (int) $t['b'], 'pages' => (int) $t['p'], 'verified_hits' => (int) $t['v'],
            'failed_hits' => (int) $t['f'], 'claimed_hits' => (int) $t['n'] - (int) $t['v'] - (int) $t['f']],
        'bots' => array_map(static fn($r) => ['bot' => $r['bot'], 'family' => ta_crawlerFamily((string) $r['bot']) ?: null, 'hits' => (int) $r['n'],
            'pages' => (int) $r['p'], 'ips' => (int) $r['ips'], 'last' => (int) $r['last'],
            'verification' => ta_verificationLabel((string) $r['bot'], (int) $r['n'], (int) $r['v'], (int) $r['f']),
            'verified_hits' => (int) $r['v'], 'failed_hits' => (int) $r['f'], 'claimed_hits' => (int) $r['n'] - (int) $r['v'] - (int) $r['f']], $bots),
        'series' => ['granularity' => $range['granularity'], 'buckets' => array_map(static fn($b) => ['ts' => $b['ts'], 'label' => $b['label']], $buckets), 'bots' => $series],
        'pages' => array_map(static fn($r) => ['path' => $r['path'], 'hits' => (int) $r['n'], 'last' => (int) $r['last'],
            'bots' => $r['bots'] === null ? [] : explode(',', (string) $r['bots']),
            'in_sitemap' => $inSitemap === null ? null : isset($inSitemap[$r['path']])], $pages),
        'files' => $files,
        'ips' => array_map(static fn($r) => ['ip' => $r['ip'], 'ip_masked' => (bool) $r['m'], 'bot' => $r['bot'], 'hits' => (int) $r['n'], 'last' => (int) $r['last'],
            'verifiable' => isset(TA_VERIFY_DOMAINS[ta_crawlerFamily((string) $r['bot'])]) && !(bool) $r['m'],
            'verdict' => $r['verdict'], 'ptr' => $r['ptr'], 'checked' => $r['checked_ts'] === null ? null : (int) $r['checked_ts']], $ips),
        'recent' => array_map(static fn($r) => ['ts' => (int) $r['ts'], 'path' => $r['path'], 'kind' => $r['kind'], 'bot' => $r['bot'], 'ip' => $r['ip'],
            'ip_masked' => (bool) $r['ip_masked'], 'status' => (int) $r['status'], 'verdict' => $r['verdict']], $recent),
        'beacon_bots' => array_map(static fn($r) => ['bot' => $r['bot'], 'pageviews' => (int) $r['n']], $beacon),
    ];
}

// -------------------------------------------------------------------- SEO ---

// ta_sitemapPaths() lives in _analytics.php: hit.php needs it too.

function ta_canonicalPath(?string $canonical, string $pagePath): ?string
{
    if ($canonical === null || $canonical === '') {
        return null;
    }
    if ($canonical[0] === '/') {
        return ta_cleanPath($canonical);
    }
    $parts = @parse_url($canonical);
    if (!is_array($parts) || !isset($parts['host'])) {
        return null;
    }
    $host = strtolower((string) $parts['host']);
    $siteHost = strtolower((string) parse_url(ta_siteUrl(), PHP_URL_HOST));
    if (!in_array($host, TA_SITE_HOSTS, true) && $host !== $siteHost) {
        return '//' . $host; // another site entirely
    }
    return ta_cleanPath((string) ($parts['path'] ?? '/') ?: '/');
}

function ta_pageIssues(array $f, array $titleCounts, array $descCounts): array
{
    $issues = [];
    $title = $f['title'];
    $desc = $f['description'];
    if ($title === null || trim((string) $title) === '') {
        $issues[] = 'title_missing';
    } else {
        if (mb_strlen((string) $title) > 60) {
            $issues[] = 'title_long';
        }
        if (($titleCounts[mb_strtolower(trim((string) $title))] ?? 0) > 1) {
            $issues[] = 'title_duplicate';
        }
    }
    if ($desc === null || trim((string) $desc) === '') {
        $issues[] = 'description_missing';
    } else {
        $len = mb_strlen((string) $desc);
        if ($len < 70) {
            $issues[] = 'description_short';
        } elseif ($len > 160) {
            $issues[] = 'description_long';
        }
        if (($descCounts[mb_strtolower(trim((string) $desc))] ?? 0) > 1) {
            $issues[] = 'description_duplicate';
        }
    }
    $canon = ta_canonicalPath($f['canonical'], (string) $f['path']);
    if ($f['canonical'] === null || $f['canonical'] === '') {
        $issues[] = 'canonical_missing';
    } elseif ($canon !== $f['path']) {
        $issues[] = 'canonical_elsewhere';
    }
    if ($f['robots'] !== null && stripos((string) $f['robots'], 'noindex') !== false) {
        $issues[] = 'noindex';
    }
    if ($f['h1_count'] !== null) {
        if ((int) $f['h1_count'] === 0) {
            $issues[] = 'h1_missing';
        } elseif ((int) $f['h1_count'] > 1) {
            $issues[] = 'h1_multiple';
        }
    }
    if ($f['img_no_alt'] !== null && (int) $f['img_no_alt'] > 0) {
        $issues[] = 'img_no_alt';
    }
    if ($f['og_title'] !== null && !(int) $f['og_title']) {
        $issues[] = 'og_title_missing';
    }
    if ($f['og_image'] !== null && !(int) $f['og_image']) {
        $issues[] = 'og_image_missing';
    }
    if ($f['lang'] === null || $f['lang'] === '') {
        $issues[] = 'lang_missing';
    }
    return $issues;
}

function ta_reportSeo(PDO $db, array $range, bool $owner): array
{
    $args = [$range['from'], $range['to']];
    $ws = ta_who('s', $owner);
    // (a) search-engine visits and their landing pages
    $engines = ta_all($db, "SELECT s.source, COUNT(*) AS n, COUNT(DISTINCT s.visitor) AS v FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $ws AND s.channel = 'search' GROUP BY s.source ORDER BY n DESC", $args);
    $landing = [];
    foreach (ta_all($db, "SELECT s.landing, s.source, COUNT(*) AS n FROM sessions s
        WHERE s.start_ts >= ? AND s.start_ts < ? AND $ws AND s.channel = 'search' GROUP BY s.landing, s.source ORDER BY n DESC", $args) as $r) {
        $p = (string) $r['landing'];
        $landing[$p] ??= ['path' => $p, 'visits' => 0, 'engines' => []];
        $landing[$p]['visits'] += (int) $r['n'];
        $landing[$p]['engines'][] = ['name' => $r['source'] ?? 'Unknown', 'visits' => (int) $r['n']];
    }
    usort($landing, static fn($a, $b) => $b['visits'] <=> $a['visits']);

    // (c) page health from the facts the beacon reported (the not-found page excluded)
    $facts = ta_all($db, "SELECT pf.* FROM page_facts pf LEFT JOIN pageviews pv ON pv.view_id = pf.view_id
        WHERE COALESCE(pv.is_404, 0) = 0 AND NOT EXISTS (SELECT 1 FROM notfound n WHERE n.view_id = pf.view_id)
        AND pf.path <> '/admin' AND substr(pf.path, 1, 7) <> '/admin/' ORDER BY pf.path");
    $titleCounts = [];
    $descCounts = [];
    foreach ($facts as $f) {
        if ($f['title'] !== null && trim((string) $f['title']) !== '') {
            $k = mb_strtolower(trim((string) $f['title']));
            $titleCounts[$k] = ($titleCounts[$k] ?? 0) + 1;
        }
        if ($f['description'] !== null && trim((string) $f['description']) !== '') {
            $k = mb_strtolower(trim((string) $f['description']));
            $descCounts[$k] = ($descCounts[$k] ?? 0) + 1;
        }
    }
    $summary = array_fill_keys(TA_ISSUES, 0);
    $healthPages = [];
    foreach ($facts as $f) {
        $issues = ta_pageIssues($f, $titleCounts, $descCounts);
        foreach ($issues as $i) {
            $summary[$i]++;
        }
        $row = ta_factsRow($f);
        $healthPages[] = ['path' => $f['path'], 'title_length' => $f['title'] === null ? 0 : mb_strlen((string) $f['title']),
            'description_length' => $f['description'] === null ? 0 : mb_strlen((string) $f['description']), 'issues' => $issues] + $row;
    }
    usort($healthPages, static fn($a, $b) => [count($b['issues']), $a['path']] <=> [count($a['issues']), $b['path']]);

    // (d) Core Web Vitals, p75
    $vit = ta_all($db, 'SELECT v.path, v.device, v.lcp, v.cls, v.inp, v.fcp, v.ttfb FROM vitals v WHERE v.ts >= ? AND v.ts < ? AND ' . ta_who('v', $owner), $args);
    $byPath = [];
    $byDevice = [];
    foreach ($vit as $r) {
        $byPath[$r['path']][] = $r;
        $byDevice[$r['device'] ?? 'unknown'][] = $r;
    }
    $vPages = [];
    foreach ($byPath as $p => $rows) {
        $vPages[] = ['path' => $p] + ta_vitalsSummary($rows);
    }
    usort($vPages, static fn($a, $b) => [$b['n'], $a['path']] <=> [$a['n'], $b['path']]);
    $devices = [];
    foreach ($byDevice as $d => $rows) {
        $devices[$d] = ta_vitalsSummary($rows);
    }

    // (e) 404s and where they came from
    $wn = ta_who('n', $owner);
    $nf = ta_all($db, "SELECT n.path, COUNT(*) AS hits, MAX(n.ts) AS last FROM notfound n WHERE n.ts >= ? AND n.ts < ? AND $wn GROUP BY n.path ORDER BY hits DESC, n.path LIMIT 300", $args);
    $nfRefs = [];
    foreach (ta_all($db, "SELECT n.path, n.ref, COUNT(*) AS hits FROM notfound n WHERE n.ts >= ? AND n.ts < ? AND $wn GROUP BY n.path, n.ref ORDER BY hits DESC", $args) as $r) {
        if (count($nfRefs[$r['path']] ?? []) < 20) {
            $nfRefs[$r['path']][] = ['ref' => $r['ref'], 'hits' => (int) $r['hits']];
        }
    }
    $nfCrawls = [];
    foreach (ta_all($db, "SELECT c.path, COUNT(*) AS n FROM crawls c WHERE c.ts >= ? AND c.ts < ? AND c.path IN (SELECT DISTINCT n.path FROM notfound n WHERE n.ts >= ? AND n.ts < ?) GROUP BY c.path",
        array_merge($args, $args)) as $r) {
        $nfCrawls[$r['path']] = (int) $r['n'];
    }

    // (f) sitemap coverage
    $smError = null;
    $sitemap = ta_sitemapPaths($smError);
    $visited = [];
    foreach (ta_all($db, 'SELECT p.path, COUNT(*) AS n FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND p.is_404 = 0 AND ' . ta_who('p', $owner) . ' GROUP BY p.path', $args) as $r) {
        $visited[$r['path']] = (int) $r['n'];
    }
    $crawled = [];
    foreach (ta_all($db, "SELECT DISTINCT c.path FROM crawls c WHERE c.ts >= ? AND c.ts < ? AND c.kind = 'page'", $args) as $r) {
        $crawled[$r['path']] = true;
    }
    $sm = ['available' => $sitemap !== null, 'error' => $smError, 'url_count' => $sitemap === null ? 0 : count($sitemap),
        'never_visited' => [], 'never_crawled' => [], 'not_in_sitemap' => []];
    if ($sitemap !== null) {
        $set = array_flip($sitemap);
        foreach ($sitemap as $p) {
            if (!isset($visited[$p])) {
                $sm['never_visited'][] = $p;
            }
            if (!isset($crawled[$p])) {
                $sm['never_crawled'][] = $p;
            }
        }
        foreach ($visited as $p => $n) {
            if (!isset($set[$p]) && ta_groupOf((string) $p) !== 'admin') {
                $sm['not_in_sitemap'][] = ['path' => (string) $p, 'views' => $n];
            }
        }
        usort($sm['not_in_sitemap'], static fn($a, $b) => [$b['views'], $a['path']] <=> [$a['views'], $b['path']]);
    }

    // (g) links out: plain URLs the owner can open. Nothing is sent anywhere.
    $site = ta_siteUrl();
    $host = (string) parse_url($site, PHP_URL_HOST);
    $top = ta_all($db, 'SELECT p.path, COUNT(*) AS n FROM pageviews p WHERE p.ts >= ? AND p.ts < ? AND p.is_404 = 0 AND ' . ta_who('p', $owner)
        . ' GROUP BY p.path ORDER BY n DESC, p.path LIMIT 15', $args);
    $links = [
        'search_console' => 'https://search.google.com/search-console?resource_id=' . rawurlencode('sc-domain:' . $host),
        'bing_webmaster' => 'https://www.bing.com/webmasters/home?siteUrl=' . rawurlencode($site . '/'),
        'pagespeed_site' => 'https://pagespeed.web.dev/analysis?url=' . rawurlencode($site . '/'),
        'pages' => array_map(static fn($r) => [
            'path' => $r['path'],
            'views' => (int) $r['n'],
            'url' => $site . $r['path'],
            'pagespeed' => 'https://pagespeed.web.dev/analysis?url=' . rawurlencode($site . $r['path']),
            'search_console_inspect' => 'https://search.google.com/search-console/inspect?resource_id=' . rawurlencode('sc-domain:' . $host) . '&id=' . rawurlencode($site . $r['path']),
        ], $top),
    ];

    return [
        'range' => $range,
        'site_url' => $site,
        'search_engines' => [
            'visits' => array_sum(array_map(static fn($r) => (int) $r['n'], $engines)),
            'engines' => array_map(static fn($r) => ['name' => $r['source'] ?? 'Unknown', 'visits' => (int) $r['n'], 'visitors' => (int) $r['v']], $engines),
            'landing_pages' => array_slice(array_values($landing), 0, 100),
        ],
        'health' => ['pages_checked' => count($facts), 'summary' => $summary, 'pages' => $healthPages],
        'vitals' => [
            'thresholds' => TA_VITALS,
            'site' => ta_vitalsSummary($vit),
            'by_device' => $devices,
            'pages' => array_slice($vPages, 0, 200),
        ],
        'not_found' => [
            'hits' => array_sum(array_map(static fn($r) => (int) $r['hits'], $nf)),
            'pages' => array_map(static fn($r) => ['path' => $r['path'], 'hits' => (int) $r['hits'], 'last' => (int) $r['last'],
                'crawler_hits' => $nfCrawls[$r['path']] ?? 0, 'referrers' => $nfRefs[$r['path']] ?? []], $nf),
        ],
        'sitemap' => $sm,
        'links' => $links,
    ];
}

// ----------------------------------------------------------------- export ---

const TA_EXPORTS = [
    'pageviews' => [
        'sql' => 'SELECT p.ts, p.path, p.session_id, p.seq, p.engaged_s, p.scroll_pct, p.is_404, p.channel, p.source, p.ref, p.prev_path,
                  s.ip, s.ip_masked, s.country, s.device, s.browser, s.os, s.lang, p.agent, p.owner
                  FROM pageviews p LEFT JOIN sessions s ON s.id = p.session_id WHERE p.ts >= ? AND p.ts < ? ORDER BY p.ts, p.id',
        'cols' => ['time_utc', 'path', 'visit_id', 'seq', 'engaged_s', 'scroll_pct', 'not_found', 'channel', 'source', 'referrer', 'previous_path',
                   'ip', 'ip_masked', 'country_from_tz', 'device', 'browser', 'os', 'lang', 'agent', 'owner'],
    ],
    'sessions' => [
        'sql' => 'SELECT start_ts, last_ts, id, (last_ts - start_ts) AS duration_s, pageviews, landing, exit_path, ip, ip_masked, gpc, country, tz, device,
                  browser, browser_ver, os, os_ver, lang, screen_w, screen_h, viewport_w, channel, source, ref, utm_source, utm_medium, utm_campaign,
                  agent, bot, owner, ua FROM sessions WHERE start_ts >= ? AND start_ts < ? ORDER BY start_ts, id',
        'cols' => ['start_utc', 'last_utc', 'visit_id', 'duration_s', 'pages', 'landing', 'exit', 'ip', 'ip_masked', 'gpc', 'country_from_tz', 'tz', 'device',
                   'browser', 'browser_version', 'os', 'os_version', 'lang', 'screen_w', 'screen_h', 'viewport_w', 'channel', 'source', 'referrer',
                   'utm_source', 'utm_medium', 'utm_campaign', 'agent', 'bot', 'owner', 'user_agent'],
    ],
    'crawls' => [
        'sql' => 'SELECT ts, path, kind, bot, ip, ip_masked, status, method, verdict, ua FROM crawls WHERE ts >= ? AND ts < ? ORDER BY ts, id',
        'cols' => ['time_utc', 'path', 'kind', 'bot', 'ip', 'ip_masked', 'status', 'method', 'verdict', 'user_agent'],
    ],
    'searches' => [
        'sql' => 'SELECT ts, query, results, path, session_id, agent, owner FROM searches WHERE ts >= ? AND ts < ? ORDER BY ts, id',
        'cols' => ['time_utc', 'query', 'results', 'path', 'visit_id', 'agent', 'owner'],
    ],
    'notfound' => [
        'sql' => 'SELECT ts, path, ref, ref_host, session_id, agent, owner FROM notfound WHERE ts >= ? AND ts < ? ORDER BY ts, id',
        'cols' => ['time_utc', 'path', 'referrer', 'referrer_host', 'visit_id', 'agent', 'owner'],
    ],
    'vitals' => [
        'sql' => 'SELECT ts, path, device, nav, ttfb, fcp, lcp, cls, inp, session_id, agent, owner FROM vitals WHERE ts >= ? AND ts < ? ORDER BY ts, id',
        'cols' => ['time_utc', 'path', 'device', 'navigation', 'ttfb_ms', 'fcp_ms', 'lcp_ms', 'cls', 'inp_ms', 'visit_id', 'agent', 'owner'],
    ],
    'outbound' => [
        'sql' => 'SELECT ts, host, path, session_id, agent, owner FROM outbound WHERE ts >= ? AND ts < ? ORDER BY ts, id',
        'cols' => ['time_utc', 'target_host', 'from_path', 'visit_id', 'agent', 'owner'],
    ],
    'page_facts' => [
        'sql' => 'SELECT ts, path, title, description, canonical, robots, lang, h1_count, og_title, og_image, img_no_alt FROM page_facts WHERE ts >= ? AND ts < ? ORDER BY path',
        'cols' => ['checked_utc', 'path', 'title', 'description', 'canonical', 'robots', 'lang', 'h1_count', 'og_title', 'og_image', 'img_no_alt'],
    ],
];

/** A spreadsheet must never execute a stored string: =, +, -, @, tab and CR
 *  at the start of a cell are neutralised with a leading apostrophe. */
function ta_csvCell($v): string
{
    if ($v === null) {
        return '';
    }
    if (is_bool($v)) {
        return $v ? '1' : '0';
    }
    if (is_int($v) || is_float($v)) {
        return (string) $v;
    }
    $s = (string) $v;
    if ($s !== '' && strpbrk($s[0], "=+-@\t\r") !== false) {
        return "'" . $s;
    }
    return $s;
}

/**
 * One CSV field. Numbers are written bare; every other value is neutralised
 * (ta_csvCell) and then ALWAYS put in double quotes, inner quotes doubled.
 * fputcsv() quotes only fields holding a comma, a quote or white space, and a
 * spreadsheet in a locale whose list separator is ";" (German, French, Dutch,
 * Spanish, Italian Excel) splits an unquoted field at each ";", so a stored
 * "x;=HYPERLINK(…);" would become a cell of its own that starts with "=".
 * Inside quotes a ";" (or ",") never splits a field.
 */
function ta_csvField($v): string
{
    if ($v === null) {
        return '';
    }
    if (is_int($v) || is_float($v) || is_bool($v)) {
        return ta_csvCell($v);
    }
    return '"' . str_replace('"', '""', ta_csvCell($v)) . '"';
}

/** @param resource $out */
function ta_csvRow($out, array $cells): void
{
    fwrite($out, implode(',', array_map('ta_csvField', $cells)) . "\n");
}

/** Write the CSV for $table to $out. Timestamps become ISO 8601 UTC. */
function ta_exportCsv(PDO $db, string $table, int $from, int $to, $out): int
{
    $spec = TA_EXPORTS[$table];
    fwrite($out, implode(',', $spec['cols']) . "\n"); // constant [a-z_] names
    $st = $db->prepare($spec['sql']);
    $st->execute([$from, $to]);
    $n = 0;
    while (($row = $st->fetch(PDO::FETCH_NUM)) !== false) {
        $cells = [];
        foreach ($row as $i => $v) {
            $col = $spec['cols'][$i];
            if (str_ends_with($col, '_utc') && $v !== null) {
                $v = gmdate('Y-m-d\TH:i:s\Z', (int) $v);
            }
            $cells[] = $v;
        }
        ta_csvRow($out, $cells);
        $n++;
    }
    return $n;
}

// ----------------------------------------------------------------- health ---

function ta_reportHealth(?PDO $db, int $now, ?array $session): array
{
    [$dir, $source] = ta_dataDir();
    $file = $dir . '/' . TA_DB_FILE;
    $hash = ta_secret('admin_password_hash');
    $keys = [];
    foreach (['cookie_secret', 'admin_email', 'admin_password_hash'] as $k) {
        $keys[$k] = ta_secret($k) !== '';
    }
    $all = ta_secrets();
    foreach (['analytics_dir', 'analytics_ip_days', 'analytics_keep_days', 'analytics_timezone', 'analytics_max_mb', 'site_url'] as $k) {
        $keys[$k] = isset($all[$k]) && $all[$k] !== '';
    }
    $rows = null;
    $oldest = null;
    $newest = null;
    $lastPrune = null;
    $schema = null;
    $sqlite = null;
    $lastCrawl = null;
    $ownerViews = 0;
    if ($db !== null) {
        $rows = [];
        foreach (['pageviews', 'sessions', 'vitals', 'searches', 'notfound', 'outbound', 'crawls', 'page_facts', 'bot_verdicts'] as $t) {
            $rows[$t] = (int) $db->query("SELECT COUNT(*) FROM $t")->fetchColumn();
        }
        $o = ta_one($db, 'SELECT MIN(ts) AS a, MAX(ts) AS b FROM pageviews');
        $oldest = isset($o['a']) ? (int) $o['a'] : null;
        $newest = isset($o['b']) ? (int) $o['b'] : null;
        $lp = json_decode((string) ta_meta($db, 'last_prune'), true);
        $lastPrune = is_array($lp) ? $lp : null;
        $schema = (int) $db->query('PRAGMA user_version')->fetchColumn();
        $sqlite = (string) $db->query('SELECT sqlite_version()')->fetchColumn();
        $lc = ta_one($db, 'SELECT MAX(ts) AS t FROM crawls');
        $lastCrawl = isset($lc['t']) ? (int) $lc['t'] : null;
        $ownerViews = (int) (ta_one($db, 'SELECT COUNT(*) AS n FROM pageviews WHERE owner = 1 AND ts >= ?', [$now - 30 * 86400])['n'] ?? 0);
    }
    $err = ta_storageError();
    $htaccess = @file_get_contents(dirname(__DIR__) . '/.htaccess');
    $size = is_file($file) ? (int) @filesize($file) : 0;
    $wal = is_file($file . '-wal') ? (int) @filesize($file . '-wal') : 0;
    return [
        'authenticated' => $session !== null,
        'configured' => ta_adminMissing() === [],
        'keys' => $keys,
        'password_needs_rehash' => $hash !== '' && password_needs_rehash($hash, PASSWORD_DEFAULT),
        // The password is typed at the prompt, never written into the command:
        // a command line is saved in the shell's history file.
        'rehash_advice' => 'Make a new hash as in setup step 2: run php -r \'echo password_hash(trim(fgets(STDIN)), PASSWORD_DEFAULT), PHP_EOL;\', type the password, press Enter, and paste the line it prints into tl-secrets.php as admin_password_hash. Every signed-in browser is signed out.',
        'php_version' => PHP_VERSION,
        'pdo_sqlite' => extension_loaded('pdo_sqlite'),
        'sqlite_version' => $sqlite,
        'extensions' => ['pdo_sqlite' => extension_loaded('pdo_sqlite'), 'mbstring' => extension_loaded('mbstring'), 'intl' => extension_loaded('intl')],
        'storage' => [
            'ok' => $db !== null,
            'code' => $err['code'] ?? null,
            'message' => $err['message'] ?? null,
            'fix' => $err['fix'] ?? null,
            'dir' => $dir,
            'file' => $file,
            'source' => $source,
            'size_bytes' => $size,
            'wal_bytes' => $wal,
            'max_bytes' => ta_maxBytes(),
            'full' => $size + $wal >= ta_maxBytes(),
            'schema_version' => $schema,
        ],
        'limits' => ['per_network_10min' => ta_hitLimit(), 'beacon_per_minute' => TA_HIT_GLOBAL_PER_MIN,
            'crawl_per_network_10min' => TA_CRAWL_LOG_LIMIT, 'crawl_per_minute' => TA_CRAWL_GLOBAL_PER_MIN],
        'rows' => $rows,
        'oldest' => $oldest,
        'newest' => $newest,
        'retention' => ['ip_days' => ta_ipDays(), 'keep_days' => ta_keepDays(), 'session_gap_s' => TA_SESSION_GAP],
        'last_prune' => $lastPrune,
        'crawler_log' => [
            'htaccess_block' => is_string($htaccess) && str_contains($htaccess, 'api/crawl.php'),
            'last_crawl' => $lastCrawl,
        ],
        'this_browser' => [
            'excluded' => $session !== null,
            'cookie_expires' => $session !== null ? (int) $session['exp'] : null,
            'owner_pageviews_30d' => $ownerViews,
        ],
        'time' => ['now' => $now, 'default_tz' => ta_defaultTz()],
    ];
}
