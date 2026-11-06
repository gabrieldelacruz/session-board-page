// Local preview of the page. Serves this folder, and maps /board.json to the
// private data clone beside it, so http://localhost:8765/?source=local shows
// the board without a GitHub token. The published page reads the GitHub API.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dataFile = join(root, "..", "session-board", "board.json");
const port = Number(process.env.PORT || 8765);
const types = { ".html": "text/html; charset=utf-8", ".json": "application/json", ".mjs": "text/javascript" };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const file = path === "/board.json" ? dataFile : join(root, path === "/" ? "index.html" : path);
  if (file !== dataFile && !file.startsWith(root)) { res.writeHead(403); return res.end(); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end();
  }
}).listen(port, "127.0.0.1", () => console.log(`session board at http://localhost:${port}/?source=local`));
