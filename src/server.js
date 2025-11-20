const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.APP_PORT || 3004;

async function start() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  app.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT NOW() as now");
      res.json({ status: "ok", dbTime: rows[0].now });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start();
