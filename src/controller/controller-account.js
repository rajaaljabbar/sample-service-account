const express = require("express");
const router = express.Router();
const UsecaseAccounts = require("../flow/flow-accounts");
const { createJWT, verifyJWT } = require("../helper/authHelper");
require("dotenv").config();

const superuser = process.env.SUPER_USER || "rajaaljabbar03@gmail.com";

// 🟢 Login: Pastikan token menyimpan `email`
const login = async (req, res) => {
  try {
    console.log("DEBUG: Incoming Request Body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password harus diisi" });
    }

    // Autentikasi user
    const user = await UsecaseAccounts.authenticate(email, password);
    console.log("DEBUG: Data user dari DB:", user); // Cek apakah email ada di sini

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // 🟢 Pastikan JWT menyimpan `email`
    const payload = { id: user.id, email: user.email }; // Tambahkan `email`
    const token = createJWT(payload);

    console.log("DEBUG: JWT Created:", token);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// 🔵 Middleware: Pastikan JWT berisi `email`
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  console.log("DEBUG: Received Token:", token);

  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  try {
    const user = verifyJWT(token);
    console.log("DEBUG: Decoded Token after JWT verification:", user); // Pastikan email masih ada

    console.log("DEBUG: Decoded Token:", user);

    // 🔵 Cek apakah email ada dalam token
    if (!user.email) {
      console.error("ERROR: Token tidak memiliki email", user);
      return res.status(403).json({ message: "Email tidak ada dalam token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

// Get Accounts
const getAccounts = async (req, res) => {
  try {
    console.log("DEBUG: User from Token:", req.user);
    const tokenEmail = req.user.email;
    const { id } = req.query;

    if (!id && tokenEmail !== superuser) {
      let accounts = await UsecaseAccounts.getAccountByEmail(tokenEmail);
      return res.json(accounts);
    } else if (!id && tokenEmail === superuser) {
      let allaccounts = await UsecaseAccounts.getAllAccounts();
      return res.json(allaccounts);
    } else if (id && tokenEmail === superuser) {
      let accounts = await UsecaseAccounts.getAccounts(id);
      return res.json(accounts);
    }
  } catch (error) {
    console.error("Error in getAccounts:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Define Routes
router.post("/accounts/login", login);
router.get("/accounts", authenticateJWT, getAccounts);

module.exports = router;
