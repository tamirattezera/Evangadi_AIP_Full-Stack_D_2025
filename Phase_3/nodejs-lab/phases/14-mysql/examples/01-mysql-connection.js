import mysql from "mysql2/promise";
import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Up and running...");
});

try {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "node_mysql_learning",
  });

  console.log("Connected to MySQL successfully.");

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Failed to connect to MySQL:", error.message);
  process.exit(1);
}
