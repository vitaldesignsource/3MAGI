#!/usr/bin/env python3
"""Runtime tests for the membership endpoints.

Exercises the real PHP against a real HTTP server. Stripe is not called: the
tests that need a Stripe answer drive the pass's own timestamp so the re-check
window has not opened, which is the same code path a fresh member takes.

What matters most here is the negative space — that a forged, tampered,
truncated or absent pass cannot get essay text out of the server.
"""
import glob
import json
import os
import subprocess
import sys

PORT = os.environ.get("PHP_TEST_PORT", "8099")
BASE = f"http://127.0.0.1:{PORT}"
WORK = os.environ["TL_TEST_WORK"]

passed = failed = 0


def check(name, cond, detail=""):
    global passed, failed
    if cond:
        passed += 1
        print(f"  ok   {name}")
    else:
        failed += 1
        print(f"  FAIL {name}  {detail}")


def curl(path, *, cookie=None, method="GET", data=None):
    cmd = ["curl", "-s", "-o", "-", "-w", "\n__STATUS__%{http_code}", "-X", method]
    if cookie:
        cmd += ["-H", f"Cookie: {cookie}"]
    if data:
        for k, v in data.items():
            cmd += ["-F", f"{k}={v}"]
    cmd.append(BASE + path)
    out = subprocess.run(cmd, capture_output=True, text=True, errors="replace").stdout
    body, _, status = out.rpartition("__STATUS__")
    try:
        parsed = json.loads(body.strip())
    except Exception:
        parsed = body.strip()
    return int(status or 0), parsed


def mint(payload):
    """Sign a payload with the same secret the server uses."""
    php = os.environ.get("PHP", "php")
    script = (
        '<?php $_SERVER["DOCUMENT_ROOT"]="' + WORK + '/www"; '
        'require "' + WORK + '/www/api/_lib.php"; '
        'echo signPayload(json_decode($argv[1], true));'
    )
    p = os.path.join(WORK, "_mint.php")
    open(p, "w").write(script)
    return subprocess.run([php, p, json.dumps(payload)], capture_output=True, text=True).stdout.strip()


GATED = "herculaneum"        # published, members-only
DRAFT = "prognostikon"       # comingSoon
FREE_TEXT = "Herculaneum"    # appears in the gated essay's JSON

print("\n# the gate: no pass")
st, d = curl(f"/api/essay.php?slug={GATED}")
check("gated essay without a pass → 402", st == 402 and isinstance(d, dict) and d.get("code") == "members_only", (st, d))
check("  …and no essay text in the body", FREE_TEXT not in json.dumps(d), str(d)[:120])

st, d = curl(f"/api/essay.php?slug={DRAFT}")
check("draft without preview → 401", st == 401 and d.get("code") == "preview_required", (st, d))

print("\n# the gate: forged and tampered passes")
good = mint({"v": 1, "k": "sub_test123", "t": "supporter", "c": 9999999999, "e": ""})
check("minted a signed pass", good.count(".") == 1 and len(good) > 40, good[:40])

st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={good}")
check("valid pass → 200 with the essay", st == 200 and isinstance(d, dict) and d.get("ok") is True, (st, str(d)[:80]))
check("  …and the text is actually there", "content" in d and json.dumps(d["content"]).count("Herculaneum") > 0)

body, sig = good.split(".")
st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={body}.{'A' * len(sig)}")
check("wrong signature → 402", st == 402, (st, d))

import base64
def b64d(v):
    v += "=" * (-len(v) % 4)
    return base64.urlsafe_b64decode(v).decode()
def b64e(v):
    return base64.urlsafe_b64encode(v.encode()).decode().rstrip("=")

tampered_payload = json.loads(b64d(body))
tampered_payload["t"] = "lifetime"
st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={b64e(json.dumps(tampered_payload))}.{sig}")
check("tampered payload, original signature → 402", st == 402, (st, d))

st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={body}")
check("truncated token (no signature) → 402", st == 402, (st, d))

st, d = curl(f"/api/essay.php?slug={GATED}", cookie="tl_pass=")
check("empty pass → 402", st == 402, (st, d))

st, d = curl(f"/api/essay.php?slug={GATED}", cookie="tl_member=supporter")
check("cosmetic tl_member cookie alone grants nothing → 402", st == 402, (st, d))

print("\n# the gate: slug handling")
for bad, label in [("../tl-secrets", "path traversal"), ("..%2f..%2ftl-secrets", "encoded traversal"),
                   ("Herculaneum", "uppercase"), ("no_such_essay", "underscore"), ("", "empty")]:
    st, d = curl(f"/api/essay.php?slug={bad}", cookie=f"tl_pass={good}")
    check(f"{label} slug rejected", st in (400, 404), (bad, st))

st, d = curl("/api/essay.php?slug=black-mirror-of-fire", cookie=f"tl_pass={good}")
check("free essay is not in the private dir → 404", st == 404, (st, d))

print("\n# expiry and re-check")
stale = mint({"v": 1, "k": "sub_stale", "t": "supporter", "c": 1, "e": ""})
st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={stale}")
check("pass older than the fail-open cap → 402", st == 402, (st, d))

recent = mint({"v": 1, "k": "sub_recent", "t": "supporter", "c": 9999999999, "e": ""})
st, d = curl(f"/api/essay.php?slug={GATED}", cookie=f"tl_pass={recent}")
check("pass inside the re-check window → 200 without calling Stripe", st == 200, (st, str(d)[:60]))

print("\n# drafts and preview")
preview = mint({"v": 1, "p": 1, "c": 9999999999})
st, d = curl(f"/api/essay.php?slug={DRAFT}", cookie=f"tl_preview={preview}")
check("valid preview cookie reads a draft → 200", st == 200 and d.get("ok") is True, (st, str(d)[:80]))
st, d = curl(f"/api/essay.php?slug={DRAFT}", cookie=f"tl_pass={good}")
check("a paying member still cannot read drafts → 401", st == 401, (st, d))
st, d = curl(f"/api/preview.php?key=wrong-key")
check("wrong preview key → 403", st == 403, (st, d))
st, d = curl(f"/api/preview.php?key=test-preview-key")
check("correct preview key → 200", st == 200 and d.get("preview") is True, (st, d))

print("\n# pass endpoint")
st, d = curl("/api/pass.php")
check("no cookie → member:false", st == 200 and d.get("member") is False, (st, d))
st, d = curl("/api/pass.php", cookie=f"tl_pass={good}")
check("valid pass → member:true with tier", st == 200 and d.get("member") is True and d.get("tier") == "supporter", (st, d))
st, d = curl("/api/pass.php?logout=1")
check("logout → member:false", st == 200 and d.get("member") is False, (st, d))

print("\n# redeem")
st, d = curl("/api/redeem.php?session_id=not-a-session")
check("malformed session id → 400", st == 400, (st, d))
st, d = curl("/api/redeem.php?session_id=cs_" + "a" * 40)
check("well-formed but unknown session → 4xx/5xx, never a pass", st >= 400, (st, str(d)[:80]))

print("\n# recover does not leak who is a member")
st1, d1 = curl("/api/recover.php", method="POST", data={"email": "definitely-not-a-member@example.com"})
st2, d2 = curl("/api/recover.php", method="POST", data={"email": "not-an-email"})
check("unknown address → 200 neutral", st1 == 200 and "membership" in json.dumps(d1), (st1, d1))
check("malformed address gives the SAME answer", d1 == d2, (d1, d2))

print("\n# method handling")
st, d = curl(f"/api/essay.php?slug={GATED}", method="POST")
check("POST to essay.php → 405", st == 405, (st, d))
st, d = curl("/api/recover.php")
check("GET to recover.php → 405", st == 405, (st, d))

print(f"\n{'=' * 52}\npassed {passed}, failed {failed}")
sys.exit(1 if failed else 0)
