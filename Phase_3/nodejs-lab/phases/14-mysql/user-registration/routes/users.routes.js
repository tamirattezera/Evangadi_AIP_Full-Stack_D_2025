import { Router } from "express";
import connection from "../database/connection.js";

const router = Router();

// ==========================================
// CREATE USER
// POST /api/users
// ==========================================
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validate incoming data
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required.",
      });
    }

    // Insert the user into MySQL
    const [result] = await connection.execute(
      `
        INSERT INTO users (name, email)
        VALUES (?, ?)
      `,
      [name, email],
    );

    // Send a successful response
    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    console.error("Failed to create user:", error.message);

    res.status(500).json({
      message: "Failed to create user.",
    });
  }
});

// ==========================================
// GET ALL USERS
// GET /api/users
// ==========================================
router.get("/", async (req, res) => {
  try {
    const [users] = await connection.execute(`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY id DESC
    `);

    res.status(200).json({
      message: "Users retrieved successfully.",
      users,
    });
  } catch (error) {
    console.error("Failed to retrieve users:", error.message);

    res.status(500).json({
      message: "Failed to retrieve users.",
    });
  }
});

export default router;
