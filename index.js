const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = process.env.PG_PORT || 8080;
const apiRouter = require("./src/controller/controller-account");
require("dotenv").config();

// Tambahan dari ChatGPT
app.use(express.json()); // Pastikan ini ada
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "postgres",
  password: process.env.PG_PASSWORD || "postgres123",
  port: process.env.PG_PORT || 5432,
});

// Middleware to use the pool in requests
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", apiRouter);

/* Error handler */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`API listening at http://localhost:${port}/api/accounts`);
});

module.exports = pool;
