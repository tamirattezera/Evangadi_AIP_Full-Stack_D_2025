import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import usersRouter from "./routes/users.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
