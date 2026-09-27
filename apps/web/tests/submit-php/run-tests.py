#!/usr/bin/env python3
"""End-to-end tests for public/api/submit.php against the local PHP server.

Every mail() call is captured as a raw .eml by fake-sendmail.sh; we parse those
with the stdlib email package to check the actual MIME the editors would get.
"""
import base64
import email
import email.header
import glob
import json
import os
import shutil
import subprocess
import sys

PORT = os.environ.get("PHP_TEST_PORT", "8098")
BASE = f"http://127.0.0.1:{PORT}/api/submit.php"
S = os.environ.get("PHP_TEST_WORK", os.path.join(os.path.dirname(os.path.abspath(__file__)), ".work"))
MAIL = os.path.join(S, "mail")
FIX = os.path.join(S, "fixtures")
RATE = os.path.join(S, "tmp", "tmp-form-rate")
LOG = os.path.join(S, "form-submissions.log")   # DOCUMENT_ROOT is S/www → log lands one level up, in S

passed = failed = 0
def check(name, cond, detail=""):
    global passed, failed
    if cond:
        passed += 1
        print(f"  ok   {name}")
    else:
        failed += 1
        print(f"  FAIL {name}  {detail}")

def reset():
    for f in glob.glob(os.path.join(MAIL, "*")): os.remove(f)
    shutil.rmtree(RATE, ignore_errors=True)

def post(fields=None, files=None, headers=None, raw_body=None):
    """POST via curl. fields: dict; files: list of (field, path[, sendas]); returns (status, json|text)."""
    cmd = ["curl", "-s", "-o", "-", "-w", "\n__STATUS__%{http_code}", BASE]
    for h in (headers or []): cmd += ["-H", h]
    if raw_body is not None:
        cmd += ["--data-binary", "@" + raw_body, "-H", "Content-Type: application/x-www-form-urlencoded"]
    else:
        for k, v in (fields or {}).items(): cmd += ["-F", f"{k}={v}"]
        for item in (files or []):
            field, path = item[0], item[1]
            sendas = item[2] if len(item) > 2 else None
            spec = f"{field}=@{path}" + (f";filename={sendas}" if sendas else "")
            cmd += ["-F", spec]
    out = subprocess.run(cmd, capture_output=True, text=True, errors="replace").stdout
    body, _, status = out.rpartition("__STATUS__")
    body = body.rstrip("\n")
    try: data = json.loads(body)
    except Exception: data = body
    return int(status or 0), data

def mails():
    return sorted(glob.glob(os.path.join(MAIL, "*.eml")))

def parse(path):
    with open(path, "rb") as fh:
        return email.message_from_binary_file(fh)

def last_mail():
    """The most recent captured message, or an empty message if none was sent
    (so a missing mail shows up as failed checks rather than a crash)."""
    m = mails()
    return parse(m[-1]) if m else email.message_from_string("")

def decoded_subject(msg):
    return str(email.header.make_header(email.header.decode_header(msg["Subject"])))

def parts(msg):
    return [p for p in msg.walk() if not p.is_multipart()]

def html_of(msg):
    for p in parts(msg):
        if p.get_content_type() == "text/html":
            return p.get_payload(decode=True).decode("utf-8", "replace")
    return ""

def text_of(msg):
    for p in parts(msg):
        if p.get_content_type() == "text/plain" and p.get("Content-Disposition") is None:
            return p.get_payload(decode=True).decode("utf-8", "replace")
    return ""

def attachments(msg):
    return [p for p in parts(msg) if (p.get("Content-Disposition") or "").startswith("attachment")]

CONTACT = {"form": "contact", "name": "Ada Lovelace", "email": "ada@example.com",
           "category": "Editorial & Submissions", "subject": "A question about issue III",
           "message": "First line.\nSecond line with <b>markup</b> & ampersand.", "company_website": ""}

# ---------------------------------------------------------------- basics ---
print("\n# method / form key / origin")
reset()
st, d = post(fields={"form": "nope"})
check("unknown form → 400", st == 400 and d.get("ok") is False and "Unknown" in d.get("error", ""), (st, d))
st, d = post(fields=CONTACT, headers=["Origin: https://evil.example"])
check("cross-site Origin → 403", st == 403, (st, d))
check("  …and no mail sent", len(mails()) == 0)
st, d = post(fields=CONTACT, headers=["Origin: https://www.threemagipress.com"])
check("allowed Origin → 200", st == 200 and d.get("ok") is True, (st, d))
st, d = post(fields=CONTACT)  # no Origin header (same-origin form post)
check("no Origin header → 200", st == 200 and d.get("ok") is True, (st, d))
check("two mails captured", len(mails()) == 2, len(mails()))

# --------------------------------------------------------- contact content ---
print("\n# contact email content")
msg = last_mail()
check("To is the editors", msg["To"] == "3rdlamp@3magipress.com", msg["To"])
check("From is our domain", "noreply@3magipress.com" in (msg["From"] or ""), msg["From"])
check("Reply-To is the submitter", msg["Reply-To"] == "ada@example.com", msg["Reply-To"])
check("Subject decodes correctly", decoded_subject(msg) == "Contact — Editorial & Submissions: A question about issue III", decoded_subject(msg))
check("top-level multipart/mixed", msg.get_content_type() == "multipart/mixed", msg.get_content_type())
ctypes = [p.get_content_type() for p in parts(msg)]
check("has text/plain AND text/html alternatives", "text/plain" in ctypes and "text/html" in ctypes, ctypes)
h = html_of(msg)
check("markup in message is escaped, not rendered", "&lt;b&gt;markup&lt;/b&gt;" in h and "<b>markup</b>" not in h)
check("ampersand escaped", "&amp; ampersand" in h)
check("newline → <br>", "First line.<br" in h)
check("html has the name/email/category rows", all(x in h for x in ["Ada Lovelace", "ada@example.com", "Editorial &amp; Submissions"]))
t = text_of(msg)
check("plain text has the fields too", "Ada Lovelace" in t and "Second line" in t)
check("honeypot field NOT in email", "company_website" not in h and "Company website" not in h)
check("'form' key NOT in email", "<th" in h and ">Form<" not in h)
raw = open(mails()[-1], "rb").read() if mails() else b"\n\n"
body_raw = raw.split(b"\r\n\r\n", 1)[1] if b"\r\n\r\n" in raw else raw.split(b"\n\n", 1)[1]
check("our body/MIME uses LF only (ignoring the CRLF terminator mail() appends)", b"\r" not in body_raw.rstrip(b"\r\n"))
own_hdrs = [l for l in raw.split(b"\n\n", 1)[0].split(b"\n") if l.startswith((b"MIME-Version", b"From:", b"X-Mailer", b"Content-Type"))]
check("our own header lines have no CR", all(b"\r" not in l for l in own_hdrs), own_hdrs)

# ---------------------------------------------------- validation & safety ---
print("\n# validation and injection")
reset()
st, d = post(fields={**CONTACT, "email": "not-an-email"})
check("invalid email → 400", st == 400 and "email" in d.get("error", "").lower(), (st, d))
st, d = post(fields={**CONTACT, "message": ""})
check("missing required → 400 with field name", st == 400 and "Message" in d.get("error", ""), (st, d))
st, d = post(fields={**CONTACT, "email": "x@example.com\r\nBcc: victim@example.com"})
check("CRLF in email → rejected as invalid (400)", st == 400, (st, d))
inj = {**CONTACT, "name": "Eve\r\nBcc: victim@example.com\r\nX-Injected: yes", "subject": "Hi\r\nBcc: victim2@example.com"}
st, d = post(fields=inj)
check("header-injection attempt still 200 (values are data)", st == 200, (st, d))
msg = last_mail(); raw = open(mails()[-1], "rb").read()
check("…no Bcc header injected", msg["Bcc"] is None and b"\nBcc:" not in raw.split(b"\n\n", 1)[0])
check("…no X-Injected header", msg["X-Injected"] is None)
check("…subject sanitised to one line", "\n" not in decoded_subject(msg) and "Bcc" in decoded_subject(msg))
st, d = post(fields={**CONTACT, "company_website": "http://spam.example"})
check("honeypot filled → 200 ok (fake success)", st == 200 and d.get("ok") is True, (st, d))
check("…but no mail sent for honeypot", len(mails()) == 1, len(mails()))
long_title = "Λ" * 400  # non-ASCII, and far over the subject cap
st, d = post(fields={"form": "submission", "name": "N", "email": "n@example.com", "proposed_title": long_title})
msg = last_mail()
subj = decoded_subject(msg)
check("long unicode subject truncated with ellipsis", subj.endswith("…") and len(subj) < 200, len(subj))
check("subject header lines all < 998 bytes", all(len(l) < 998 for l in msg["Subject"].encode().split(b"\n")))
check("subject decodes as UTF-8 (starts with title)", subj.startswith("New Third Lamp Submission: ΛΛΛ"), subj[:40])
bad_utf8 = {**CONTACT, "message": "caf\xe9 broken"}  # will be sent as latin-1 byte via curl? use a file
with open(os.path.join(S, "bad.bin"), "wb") as fh:
    fh.write(b"form=contact&name=Bob&email=bob@example.com&message=caf\xe9%20invalid%20byte%20but%20kept")
st, d = post(raw_body=os.path.join(S, "bad.bin"))
check("invalid UTF-8 in a field → 200", st == 200, (st, d))
h = html_of(last_mail())
check("…field is substituted not blanked", "invalid byte but kept" in h and "caf" in h, h[-200:])

# ------------------------------------------------------------------ tips ---
print("\n# lamp post tip")
reset()
st, d = post(fields={"form": "tip", "name": "", "email": "", "tip": "A grimoire surfaced at auction."})
check("tip with only text → 200", st == 200 and d.get("ok") is True, (st, d))
msg = last_mail()
check("tip subject", decoded_subject(msg) == "Lamp Post tip", decoded_subject(msg))
check("tip has no Reply-To when email blank", msg["Reply-To"] is None, msg["Reply-To"])
h = html_of(msg)
check("blank name/email rows omitted for tips", ">Name<" not in h and ">Email<" not in h)
st, d = post(fields={"form": "tip", "tip": ""})
check("empty tip → 400", st == 400, (st, d))

# ------------------------------------------------------- submission+files ---
print("\n# submission with attachments")
reset()
sub = {"form": "submission", "path": "Completed work", "name": "Mary Shelley", "email": "mary@example.com",
       "proposed_title": "On the Aether", "related_issue": "Issue III — Those Who Descended",
       "biography": "", "agreed_contributor_terms": "on"}
files = [("document_upload", f"{FIX}/essay.pdf"),
         ("image_attachments[]", f"{FIX}/figure.png"),
         ("image_attachments[]", f"{FIX}/figure-copy.png", "figure.png"),        # duplicate name
         ("image_attachments[]", f"{FIX}/Épreuve finale ✦.png"),                  # unicode name
         ("image_attachments[]", f"{FIX}/shell.png"),                             # php disguised as png
         ("image_attachments[]", f"{FIX}/huge.png"),                              # > 8MB
         ("image_attachments[]", f"{FIX}/empty.pdf"),                             # empty
         ("image_attachments[]", f"{FIX}/notes.txt")]                             # txt via the multi field
st, d = post(fields=sub, files=files)
check("submission → 200", st == 200 and d.get("ok") is True, (st, d))
check("reports 5 accepted attachments", d.get("attachments") == 5, d.get("attachments"))
rej = " | ".join(d.get("rejected", []))
check("shell.png (PHP code) rejected", "shell.png" in rej and ("not an accepted" in rej or "do not match" in rej), rej)
check("huge.png rejected (> 8 MB)", "huge.png" in rej and "8 MB" in rej, rej)
check("empty.pdf rejected (empty)", "empty.pdf" in rej and "empty" in rej, rej)
msg = last_mail()
atts = attachments(msg)
names = [a.get_filename() for a in atts]
check("5 attachments in the email", len(atts) == 5, names)
check("duplicate name de-duplicated", "figure.png" in names and "figure-2.png" in names, names)
check("unicode name transliterated & safe", any(n.startswith("Epreuve") and n.endswith(".png") for n in names), names)
check("notes.txt attached with charset", any(a.get_filename() == "notes.txt" and "charset" in (a.get("Content-Type") or "").lower() for a in atts))
pdf = next((a for a in atts if a.get_filename() == "essay.pdf"), None)
check("pdf attachment round-trips byte-exact", pdf is not None and pdf.get_payload(decode=True) == open(f"{FIX}/essay.pdf", "rb").read())
png = next((a for a in atts if a.get_filename() == "figure.png"), None)
check("png attachment round-trips byte-exact", png is not None and png.get_payload(decode=True) == open(f"{FIX}/figure.png", "rb").read())
h = html_of(msg)
check("rejected list appears in the email body", "Attachments not included" in h and "shell.png" in h)
check("blank field shown as — for submissions", ">Biography<" in h and "—" in h)
check("checkbox 'on' recorded", "Agreed contributor terms" in h)
check("first row is Path", h.index(">Path<") < h.index(">Name<"))
check("subject uses title", decoded_subject(msg) == "New Third Lamp Submission: On the Aether", decoded_subject(msg))
check("Reply-To is contributor", msg["Reply-To"] == "mary@example.com")

# other doc types + malicious doc types
reset()
st, d = post(fields=sub, files=[("document_upload", f"{FIX}/draft.docx")])
check("docx accepted", st == 200 and d.get("attachments") == 1 and not d.get("rejected"), (st, d))
st, d = post(fields=sub, files=[("document_upload", f"{FIX}/page.txt")])
check("html-in-.txt rejected", d.get("attachments") == 0 and "page.txt" in " ".join(d.get("rejected", [])), d)
st, d = post(fields=sub, files=[("document_upload", f"{FIX}/binary.exe")])
check(".exe rejected by extension", d.get("attachments") == 0 and "not accepted" in " ".join(d.get("rejected", [])), d)
st, d = post(fields=sub, files=[("some_other_field", f"{FIX}/figure.png")])
check("upload on a non-upload field is ignored", st == 200 and d.get("attachments") == 0, (st, d))
st, d = post(fields=sub, files=[("document_upload", f"{FIX}/figure.png", "photo.PDF")])
check("png renamed .PDF rejected (contents ≠ pdf)", d.get("attachments") == 0 and "do not match" in " ".join(d.get("rejected", [])), d)

# --------------------------------------------------------------- big POST ---
print("\n# oversized POST (post_max_size=20M)")
reset()
big = os.path.join(S, "big.bin")
with open(big, "wb") as fh:
    fh.write(b"form=contact&name=a&email=a@example.com&message=" + b"x" * (21 * 1024 * 1024))
st, d = post(raw_body=big)
check("oversized POST → 413 with helpful message", st == 413 and "too large" in d.get("error", ""), (st, str(d)[:120]))
check("…and no mail", len(mails()) == 0)

# ------------------------------------------------------------- rate limit ---
print("\n# rate limit (5 successful sends / 10 min per IP)")
reset()
codes = [post(fields=CONTACT)[0] for _ in range(6)]
check("first 5 succeed, 6th is 429", codes == [200] * 5 + [429], codes)
check("exactly 5 mails sent", len(mails()) == 5, len(mails()))
reset()
for _ in range(7): post(fields={**CONTACT, "email": "bad"})   # 7 failures
st, d = post(fields=CONTACT)
check("failed validations do NOT count toward the limit", st == 200, (st, d))

# ----------------------------------------------------------- durable log ---
print("\n# durable log")
check("log file exists outside docroot", os.path.exists(LOG), LOG)
lines = [l for l in open(LOG, encoding="utf-8").read().splitlines() if l.strip()]
ok_json = 0
for l in lines:
    try: json.loads(l); ok_json += 1
    except Exception: pass
check(f"every log line is valid JSON ({len(lines)} lines)", ok_json == len(lines) and len(lines) > 0, (ok_json, len(lines)))
last = json.loads(lines[-1])
check("log records form/sent/fields", last.get("form") == "contact" and last.get("sent") is True and "name" in last.get("fields", {}), last)

print(f"\n{'='*50}\npassed {passed}, failed {failed}")
sys.exit(1 if failed else 0)
