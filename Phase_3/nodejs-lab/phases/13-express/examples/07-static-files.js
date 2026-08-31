import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDirectory = path.resolve(__dirname, "..", "apple-bootstrap");

app.use(express.static(staticDirectory));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "apple-bootstrap",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Resource ${req.method} ${req.url} does not exist`,
  });
});

app.use((err, req, res, next) => {
  console.error("Static server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("==============================================");
  console.log("Express Static File Server");
  console.log("==============================================");
  console.log(`Website: http://localhost:${PORT}`);
  console.log(`API:     http://localhost:${PORT}/api/health`);
  console.log("==============================================");
  console.log(`Static directory: ${staticDirectory}`);
  console.log("==============================================");
});
