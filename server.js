// NASA's facilities file doesn't send CORS headers, so the browser can't fetch it directly.
// This serves the page and passes NASA's live response through at /api/facilities.
// Run with: node server.js   then open http://localhost:3000
// only uses Node's built-in modules, nothing to npm install (needs Node 18+ for fetch)
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const NASA_FACILITIES_URL = "https://data.nasa.gov/docs/legacy/gvk9-iz74.json";
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
};

const server = http.createServer(function (req, res) {
  if (req.url === "/api/facilities") {
    sendFacilities(res);
  } else {
    serveFile(req, res);
  }
});

async function sendFacilities(res) {
  // NASA's server drops the connection now and then, so one retry before giving up
  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`[Server] Fetching NASA facilities (attempt ${attempt}):`, NASA_FACILITIES_URL);
    try {
      // NASA redirects to a file on S3, fetch follows that on its own
      const response = await fetch(NASA_FACILITIES_URL);
      console.log(`[Server] NASA response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`NASA responded with status ${response.status}`);
      }

      const body = await response.text();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(body);
      return;
    } catch (error) {
      // node's "fetch failed" hides the real reason (timeout, reset...) in error.cause
      const reason = error.cause ? `${error.message} (${error.cause.code || error.cause.message})` : error.message;
      console.error(`[Server] NASA request failed on attempt ${attempt}:`, reason);

      if (attempt === 2) {
        // 502 so the page knows it was NASA that failed, not the local server
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Couldn't get facilities from NASA: ${reason}` }));
      }
    }
  }
}

function serveFile(req, res) {
  const urlPath = req.url.split("?")[0];
  const filePath = path.join(__dirname, urlPath === "/" ? "index.html" : urlPath);

  // keeps requests like /../../something from reading files outside this folder
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

server.listen(PORT, function () {
  console.log(`[Server] Running at http://localhost:${PORT}`);
});
