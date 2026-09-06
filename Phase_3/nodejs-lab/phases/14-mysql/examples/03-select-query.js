import mysql from "mysql2/promise";

let connection;

try {
  // 1. Connect to MySQL
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "node_mysql_learning",
  });

  console.log("Connected to MySQL successfully.");

  // 2. Execute SELECT query
  const [rows] = await connection.execute(`
    SELECT * FROM users
  `);

  // 3. Inspect the returned rows
  console.log("Users:");
  console.table(rows);
} catch (error) {
  console.error("Failed to select users:", error.message);
} finally {
  // 4. Always close the connection
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
}
