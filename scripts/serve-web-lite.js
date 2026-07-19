const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "web-lite");
const port = Number(process.env.PORT || 4173);
const pidFile = path.join(__dirname, "..", ".english1000-web-lite.pid");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  if (url.pathname === "/__health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-cache" });
    res.end("ok");
    return;
  }
  const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(root, safePath);
  if (url.pathname === "/" || !path.extname(filePath)) {
    filePath = path.join(root, "index.html");
  }
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "content-type": types[path.extname(filePath)] || "application/octet-stream",
      "cache-control": "no-cache"
    });
    res.end(data);
  });
});

server.listen(port, "0.0.0.0", () => {
  try {
    fs.writeFileSync(pidFile, String(process.pid), "utf8");
  } catch {
    // The server can still run if the PID file cannot be written.
  }
  console.log(`English1000 Life Web running at http://localhost:${port}`);
  console.log("Keep this window open while testing locally.");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`English1000 Life Web is already running at http://localhost:${port}`);
    process.exit(0);
  }
  throw error;
});

function cleanup() {
  try {
    if (fs.existsSync(pidFile) && fs.readFileSync(pidFile, "utf8").trim() === String(process.pid)) {
      fs.unlinkSync(pidFile);
    }
  } catch {
    // Best effort cleanup.
  }
}

process.on("exit", cleanup);
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
