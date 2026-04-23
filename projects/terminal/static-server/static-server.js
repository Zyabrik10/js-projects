// /* import dependencies */
// const http = require("node:http");
// const path = require("node:path");
// const fs = require("node:fs");

// /* conf variables */
// const PORT = 3000;
// const HOST = "http://localhost/";
// const METHODS_COLORS = {
//   get: "green",
//   post: "blue",
//   update: "yellow",
//   put: "magenta",
//   patch: "cyan",
//   delete: "red",
// };
// const MIME_TYPES = {
//   ".html": "text/html; charset=utf-8",
//   ".js": "application/javascript; charset=utf-8",
//   ".css": "text/css; charset=utf-8",
//   ".json": "application/json; charset=utf-8",
//   ".png": "image/png",
//   ".jpg": "image/jpeg",
//   ".svg": "image/svg+xml",
//   ".txt": "text/plain",
//   ".ico": "image/x-icon",
// };

// const IGNORES = [".well-known", "devtools"];
// const MAX_CACHE_AGE = 31536000;

// const staticServer = http.createServer(function server(req, res) {
//   try {
//     if (IGNORES.some((ignore) => req.url.includes(ignore))) {
//       return;
//     }

//     const reqData = getReqData(req);
//     const url = new URL(req.url, reqData.fullUrl);

//     // logger(reqData);

//     const sourcePath = path.normalize(
//       path.join(__dirname, url.pathname === "/" ? "index.html" : url.pathname),
//     );
//     const sourceExt = path.extname(sourcePath);

//     if (!filePath.startsWith(root)) {
//       res.writeHead(403);
//       return res.end("Forbidden");
//     }

//     if (fs.existsSync(sourcePath)) {
//       res.writeHead(200, {
//         "content-type": MIME_TYPES[sourceExt],
//         "cache-control": `public, max-age=${MAX_CACHE_AGE}, immutable`,
//         vary: "Accept-Encoding",
//       });
//       fs.createReadStream(sourcePath).pipe(res);
//     } else {
//       const gzipSourcePath = sourcePath + ".gz";

//       if (fs.existsSync(gzipSourcePath)) {
//         res.writeHead(200, {
//           "content-type": MIME_TYPES[sourceExt],
//           "content-encoding": "gzip",
//         });
//         fs.createReadStream(gzipSourcePath).pipe(res);
//         return;
//       }

//       res.writeHead(404, {
//         "content-type": "text/plain",
//       });
//       res.end("Resource not found");
//     }
//   } catch (e) {
//     res.writeHead(500, {
//       "content-type": "text/plain",
//     });
//     res.end(e.message);
//   }
// });

// staticServer.listen(PORT, HOST, (err) => {
//   if (err) {
//     throw err;
//   }

//   //   console.log(`Static server is running on ${HOST}${PORT}`);
// });

// function getReqData(req) {
//   const reqData = {
//     protocol: req.socket.encrypted ? "https" : "http",
//     method: req.method.toLowerCase(),
//   };
//   reqData["fullUrl"] = `${reqData.protocol}://${req.headers.host}${req.url}`;

//   return reqData;
// }

// function logger(reqData) {
//   const date = new Date();

//   const methodColor = METHODS_COLORS[reqData.method] ?? "white";

//   console.log(
//     `${String(date.getHours()).padEnd(2, "0")}:${String(date.getMinutes()).padEnd(2, "0")}:${String(date.getSeconds()).padEnd(2, "0")}`,
//     reqData.fullUrl,
//     color(reqData.method.toUpperCase(), methodColor),
//     reqData.protocol.toUpperCase(),
//   );
// }

// function color(txt, color) {
//   switch (color) {
//     case "red":
//       return `\x1b[31m${txt}\x1b[0m`;
//     case "green":
//       return `\x1b[32m${txt}\x1b[0m`;
//     case "yellow":
//       return `\x1b[33m${txt}\x1b[0m`;
//     case "blue":
//       return `\x1b[34m${txt}\x1b[0m`;
//     case "magenta":
//       return `\x1b[35m${txt}\x1b[0m`;
//     case "cyan":
//       return `\x1b[36m${txt}\x1b[0m`;
//     case "white":
//       return `\x1b[37m${txt}\x1b[0m`;
//   }
// }

/* import dependencies */
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

/* config */
const PORT = 3000;
const HOST = "localhost";

const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
};

const COMPRESSIBLE = new Set([".js", ".css", ".html", ".json"]);
const MAX_CACHE_AGE = 31536000;

/* server */
const staticServer = http.createServer((req, res) => {
  try {
    let url = req.url.split("?")[0];
    let file = url === "/" ? "/index.html" : url;

    let sourcePath = path.normalize(path.join(ROOT, file));

    // 🔒 path traversal protection
    if (!sourcePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    const ext = path.extname(sourcePath);
    const acceptEncoding = req.headers["accept-encoding"] || "";

    let toServePath = sourcePath;
    let headers = {};

    // ✅ gzip priority
    if (COMPRESSIBLE.has(ext)) {
      const gzPath = sourcePath + ".gz";

      if (fs.existsSync(gzPath) && acceptEncoding.includes("gzip")) {
        toServePath = gzPath;
        headers["Content-Encoding"] = "gzip";
      }
    }

    // ❌ file not found → fallback index.html
    if (!fs.existsSync(toServePath)) {
      if (ext === "" || ext === ".html") {
        const indexPath = path.join(ROOT, "index.html");

        if (!fs.existsSync(indexPath)) {
          res.writeHead(404);
          return res.end("Not found");
        }

        const stat = fs.statSync(indexPath);

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Length": stat.size,
        });

        return fs.createReadStream(indexPath).pipe(res);
      }

      res.writeHead(404);
      return res.end("Not found");
    }

    const stat = fs.statSync(toServePath);

    res.writeHead(200, {
      ...headers,
      "Content-Type": MIME_TYPES[ext] || "text/plain",
      "Content-Length": stat.size,
      "Cache-Control": `public, max-age=${MAX_CACHE_AGE}, immutable`,
      Vary: "Accept-Encoding",
    });

    fs.createReadStream(toServePath).pipe(res);
  } catch (e) {
    res.writeHead(500);
    res.end("Server error");
  }
});

/* start */
staticServer.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});