/* ===========================================================================
   THE STUDIO SERVER

   A tiny web server that runs only on your own computer. It lets studio.html
   do three things a normal web page is not allowed to do:

     - write the edition files
     - save photos and music into the right folders
     - commit and push to GitHub

   Nothing here is part of the website. It is never deployed and nobody else
   can reach it: it listens on 127.0.0.1, which means your machine only.

   Start it by double-clicking  Edit Website.bat  in the project folder.

   No npm, no packages - just Node's own built-in modules.
   =========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PORT = 4321;

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".m4a": "audio/mp4",
  ".ogg": "audio/ogg", ".wav": "audio/wav", ".ico": "image/x-icon", ".md": "text/markdown; charset=utf-8"
};

/* Every path from the browser is checked against the project folder before
   anything is read or written. Without this, a crafted request could reach
   files elsewhere on the computer. */
function safePath(relative) {
  const clean = String(relative || "").replace(/^[\/\\]+/, "").replace(/\\/g, "/");
  if (clean.split("/").some(part => part === ".." || part === "")) return null;
  const full = path.resolve(ROOT, clean);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) return null;
  return full;
}

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8",
                        "Cache-Control": "no-store" });
  res.end(body);
}

function readBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", c => {
      size += c.length;
      if (size > limitBytes) { reject(new Error("too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function git(args) {
  return new Promise(resolve => {
    execFile("git", args, { cwd: ROOT, windowsHide: true, maxBuffer: 8 * 1024 * 1024 },
      (err, stdout, stderr) => {
        resolve({ ok: !err, out: (stdout || "").trim(), err: (stderr || err && err.message || "").trim() });
      });
  });
}

/* ---------- the edition list, read from index.html ---------- */

/* Two plain markers rather than trying to recognise the decorated comment
   around them. The decoration can be reworded freely; these two lines are
   what the studio actually looks for. */
const EDITIONS_BLOCK = /(<!-- EDITIONS:START -->)([\s\S]*?)(<!-- EDITIONS:END -->)/;

function readIndex() { return fs.readFileSync(path.join(ROOT, "index.html"), "utf8"); }

function listEditionFiles() {
  const html = readIndex();
  // The link may carry a ?v= cache stamp, so stop at the ? and ignore it.
  return [...html.matchAll(/<script\s+src="(editions\/[^"?]+\.js)(?:\?[^"]*)?"/g)]
    .map(m => m[1]);
}

/* Browsers hang on to stylesheets and scripts hard, and GitHub Pages caches
   them too. Without this you change something, reload, and see the old page -
   which looks exactly like the change never happened. Every local css/js link
   carries a ?v= stamp, and bumping it makes every browser fetch fresh copies.
   Called on every save and every publish, so it is never something to
   remember. */
function bumpCacheVersion() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const stamp = Date.now().toString(36);
  html = html.replace(
    /(href|src)="((?:css|themes|js|editions)\/[^"?]+\.(?:css|js))(\?v=[^"]*)?"/g,
    (m, attr, p) => attr + '="' + p + "?v=" + stamp + '"');
  fs.writeFileSync(file, html, "utf8");
  return stamp;
}

// Put the given edition files into the EDITIONS block, oldest first.
function writeEditionList(files) {
  let html = readIndex();
  const eol = html.includes("\r\n") ? "\r\n" : "\n";
  const lines = files.map(f => '<script src="' + f + '"></script>').join(eol);
  if (!EDITIONS_BLOCK.test(html)) return false;
  html = html.replace(EDITIONS_BLOCK, (m, open, middle, close) =>
    open + eol + eol + lines + eol + eol + close);
  fs.writeFileSync(path.join(ROOT, "index.html"), html, "utf8");
  return true;
}

/* ---------- the API ---------- */

const api = {

  async "GET /api/hello"(req, res) {
    const branch = await git(["rev-parse", "--abbrev-ref", "HEAD"]);
    const remote = await git(["remote", "get-url", "origin"]);
    json(res, 200, {
      ok: true, root: ROOT,
      branch: branch.ok ? branch.out : null,
      hasRemote: remote.ok && !!remote.out,
      remote: remote.ok ? remote.out.replace(/\/\/[^@]*@/, "//") : null
    });
  },

  // Everything the editor needs to show the list of editions.
  async "GET /api/editions"(req, res) {
    const files = listEditionFiles();
    const out = files.map(f => {
      const full = path.join(ROOT, f);
      let text = null, missing = false;
      try { text = fs.readFileSync(full, "utf8"); } catch (e) { missing = true; }
      return { file: f, id: path.basename(f, ".js"), missing, text };
    });
    // photos and music already on disk, so the editor can offer them
    const music = fs.existsSync(path.join(ROOT, "assets/music"))
      ? fs.readdirSync(path.join(ROOT, "assets/music")).filter(f => /\.(mp3|m4a|ogg|wav)$/i.test(f))
      : [];
    json(res, 200, { editions: out, music });
  },

  // Photos already sitting in an edition's folder.
  async "GET /api/photos"(req, res, url) {
    const id = url.searchParams.get("id") || "";
    const dir = safePath("assets/editions/" + id);
    if (!dir) return json(res, 400, { ok: false, error: "bad id" });
    if (!fs.existsSync(dir)) return json(res, 200, { photos: [] });
    const photos = fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .map(f => ({ name: f, url: "assets/editions/" + id + "/" + f }));
    json(res, 200, { photos });
  },

  // Write one edition file and make sure index.html lists it.
  async "POST /api/save"(req, res) {
    const body = JSON.parse((await readBody(req, 4 * 1024 * 1024)).toString("utf8"));
    const id = String(body.id || "").trim();
    if (!/^\d{4}-[a-z-]+$/.test(id)) return json(res, 400, { ok: false, error: "bad edition name: " + id });
    const rel = "editions/" + id + ".js";
    const full = safePath(rel);
    if (!full) return json(res, 400, { ok: false, error: "bad path" });

    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, String(body.text).replace(/\r?\n/g, "\r\n"), "utf8");
    fs.mkdirSync(path.join(ROOT, "assets/editions", id), { recursive: true });

    // keep index.html's list correct and in date order
    let files = listEditionFiles();
    if (files.indexOf(rel) === -1) files.push(rel);
    files.sort();
    if (!writeEditionList(files)) {
      // Never fail silently here: if index.html cannot be updated the edition
      // exists but the site will not load it, which is baffling from outside.
      return json(res, 200, { ok: false, wrote: rel, error:
        "Saved the edition, but could not update index.html - the " +
        "<!-- EDITIONS:START --> / <!-- EDITIONS:END --> markers are missing. " +
        "Add the line <script src=\"" + rel + "\"></script> between them by hand." });
    }

    bumpCacheVersion();

    json(res, 200, { ok: true, file: rel, listed: files });
  },

  // Remove an edition file and its line in index.html. Photos are left alone.
  async "POST /api/delete"(req, res) {
    const body = JSON.parse((await readBody(req, 64 * 1024)).toString("utf8"));
    const id = String(body.id || "").trim();
    if (!/^\d{4}-[a-z-]+$/.test(id)) return json(res, 400, { ok: false, error: "bad edition name" });
    const rel = "editions/" + id + ".js";
    const full = safePath(rel);
    if (full && fs.existsSync(full)) fs.unlinkSync(full);
    writeEditionList(listEditionFiles().filter(f => f !== rel));
    json(res, 200, { ok: true });
  },

  // Save a photo or a music file where it belongs.
  async "POST /api/upload"(req, res, url) {
    const id = url.searchParams.get("id") || "";
    const kind = url.searchParams.get("kind") || "photo";
    const name = path.basename(String(url.searchParams.get("name") || "")).replace(/[^\w.\- ]/g, "_");
    if (!name) return json(res, 400, { ok: false, error: "no file name" });

    const rel = kind === "music" ? "assets/music/" + name : "assets/editions/" + id + "/" + name;
    const full = safePath(rel);
    if (!full) return json(res, 400, { ok: false, error: "bad path" });

    const data = await readBody(req, 60 * 1024 * 1024);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, data);
    json(res, 200, { ok: true, path: rel, bytes: data.length });
  },

  async "POST /api/deletePhoto"(req, res) {
    const body = JSON.parse((await readBody(req, 64 * 1024)).toString("utf8"));
    const full = safePath(body.path);
    if (!full || !/[\/\\]assets[\/\\]editions[\/\\]/.test(full))
      return json(res, 400, { ok: false, error: "only photos inside an edition folder can be removed" });
    if (fs.existsSync(full)) fs.unlinkSync(full);
    json(res, 200, { ok: true });
  },

  // What has changed since the last commit?
  async "GET /api/changes"(req, res) {
    const st = await git(["status", "--porcelain"]);
    const lines = st.out ? st.out.split(/\r?\n/).filter(Boolean) : [];
    json(res, 200, { ok: st.ok, changes: lines, error: st.ok ? null : st.err });
  },

  // Commit everything and push.
  async "POST /api/publish"(req, res) {
    const body = JSON.parse((await readBody(req, 64 * 1024)).toString("utf8"));
    const message = String(body.message || "Update the website").slice(0, 500);

    // Make sure the freshly published files are actually fetched by browsers.
    bumpCacheVersion();

    const status = await git(["status", "--porcelain"]);
    if (!status.ok) return json(res, 200, { ok: false, step: "status", error: status.err });
    if (!status.out) return json(res, 200, { ok: true, nothing: true });

    const add = await git(["add", "-A"]);
    if (!add.ok) return json(res, 200, { ok: false, step: "add", error: add.err });

    const commit = await git(["commit", "-m", message]);
    if (!commit.ok) return json(res, 200, { ok: false, step: "commit", error: commit.err || commit.out });

    const remote = await git(["remote", "get-url", "origin"]);
    if (!remote.ok || !remote.out) {
      return json(res, 200, { ok: true, committed: true, pushed: false,
        note: "Saved to your computer's history. There is no GitHub remote set up yet, so nothing was uploaded." });
    }

    const push = await git(["push"]);
    if (!push.ok) {
      return json(res, 200, { ok: true, committed: true, pushed: false,
        note: "Committed, but the upload failed. " + push.err });
    }
    json(res, 200, { ok: true, committed: true, pushed: true, out: commit.out });
  }
};

/* ---------- serve the site itself ---------- */

function serveFile(res, full) {
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(full).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const key = req.method + " " + url.pathname;

  if (api[key]) {
    try { await api[key](req, res, url); }
    catch (err) { json(res, 500, { ok: false, error: err.message }); }
    return;
  }
  if (url.pathname.startsWith("/api/")) return json(res, 404, { ok: false, error: "no such action" });

  let rel = decodeURIComponent(url.pathname);
  if (rel === "/") rel = "/studio/studio.html";
  const full = safePath(rel);
  if (!full) { res.writeHead(400); return res.end("Bad path"); }
  serveFile(res, full);
});

server.listen(PORT, "127.0.0.1", () => {
  const address = "http://localhost:" + PORT + "/";
  console.log("");
  console.log("  Aurora Studio is running.");
  console.log("");
  console.log("     Editor:  " + address);
  console.log("    Website:  " + address + "index.html");
  console.log("    Checker:  " + address + "check.html");
  console.log("");
  console.log("  Leave this window open while you work.");
  console.log("  Close it when you are done.");
  console.log("");
  const open = process.platform === "win32" ? ["cmd", ["/c", "start", "", address]]
             : process.platform === "darwin" ? ["open", [address]]
             : ["xdg-open", [address]];
  execFile(open[0], open[1], { windowsHide: true }, () => {});
});

server.on("error", err => {
  if (err.code === "EADDRINUSE") {
    console.log("\n  Aurora Studio is already running.");
    console.log("  Open http://localhost:" + PORT + "/ in your browser.\n");
  } else {
    console.log("\n  Could not start: " + err.message + "\n");
  }
});
