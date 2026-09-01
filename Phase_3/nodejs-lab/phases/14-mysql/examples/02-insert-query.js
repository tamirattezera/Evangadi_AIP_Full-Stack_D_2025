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

  // 2. Define the user data
  const name = "Abel";
  const email = "abel@example.com";

  // 3. Insert the user
  const [result] = await connection.execute(
    `
      INSERT INTO users (name, email)
      VALUES (?, ?)
    `,
    [name, email],
  );

  // 4. Inspect the result
  console.log("User inserted successfully.");
  console.log("Inserted ID:", result.insertId);
  console.log("Affected rows:", result.affectedRows);
} catch (error) {
  console.error("Failed to insert user:", error.message);
} finally {
  // 5. Close the connection
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
}
