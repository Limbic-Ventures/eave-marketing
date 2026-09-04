#!/usr/bin/env python3
"""OG card helper. Run `python3 scripts/og-save-server.py`, open http://localhost:3457/scripts/og-cards.html,
then in the console run `await saveAll()`. Edit CARDS in og-cards.html to add pages. Writes og/<name>.jpg."""
import base64, json, os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, "og")

class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=REPO, **k)

    def do_POST(self):
        if self.path != "/save":
            self.send_error(404); return
        n = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(n))
        name = os.path.basename(body["name"])
        if not name.endswith(".jpg") or "/" in name or ".." in name:
            self.send_error(400); return
        data = body["dataUrl"].split(",", 1)[1]
        path = os.path.join(OUT, name)
        with open(path, "wb") as f:
            f.write(base64.b64decode(data))
        size = os.path.getsize(path)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"saved": name, "bytes": size}).encode())

    def log_message(self, fmt, *args):
        sys.stderr.write("%s\n" % (fmt % args))

ThreadingHTTPServer(("127.0.0.1", 3457), H).serve_forever()
