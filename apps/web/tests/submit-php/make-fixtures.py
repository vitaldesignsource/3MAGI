#!/usr/bin/env python3
"""Generate the upload fixtures run-tests.py expects, into the given directory.

Everything is synthesised so nothing large or binary has to live in git.
"""
import os
import struct
import sys
import zipfile
import zlib

out = sys.argv[1] if len(sys.argv) > 1 else "fixtures"
os.makedirs(out, exist_ok=True)
os.chdir(out)


def png():
    """A genuine 1×1 PNG."""
    def chunk(tag, data):
        body = struct.pack(">I", len(data)) + tag + data
        return body + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(b"\x00\xff\x00\x00"))
            + chunk(b"IEND", b""))


open("figure.png", "wb").write(png())
open("figure-copy.png", "wb").write(png())          # sent under the same name → dedupe
open("Épreuve finale ✦.png", "wb").write(png())     # non-ASCII filename
open("essay.pdf", "wb").write(
    b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
    b"2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n")
with zipfile.ZipFile("draft.docx", "w") as z:
    z.writestr("[Content_Types].xml",
               '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
               '<Default Extension="xml" ContentType="application/xml"/>'
               '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>')
    z.writestr("word/document.xml",
               '<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
               '<w:body><w:p><w:r><w:t>Hello</w:t></w:r></w:p></w:body></w:document>')
open("notes.txt", "w").write("Some source notes.\n")

# Hostile / invalid inputs
open("shell.png", "w").write('<?php system($_GET["c"]); ?>')                       # PHP wearing a .png
open("page.txt", "w").write("<!DOCTYPE html><html><script>alert(1)</script></html>")  # HTML wearing .txt
open("binary.exe", "wb").write(b"MZ" + b"\x00" * 100)                               # disallowed type
with open("huge.png", "wb") as fh:                                                   # over the 8 MB cap
    fh.write(png())
    fh.write(b"\x00" * (9 * 1024 * 1024))
open("empty.pdf", "wb").write(b"")

print(f"fixtures written to {os.getcwd()}: {len(os.listdir('.'))} files")
