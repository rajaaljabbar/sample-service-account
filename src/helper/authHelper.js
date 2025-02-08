const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🔵 Konfigurasi untuk enkripsi AES
const algorithm = process.env.ENCRYPTION_ALGORITHM || "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // Pastikan key ada di .env
const ivLength = 16; // IV harus 16 byte untuk AES

// 🔵 Fungsi Enkripsi AES
const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`; // Gabungkan IV dan data terenkripsi
};

// 🔵 Fungsi Dekripsi AES
const decrypt = (encryptedText) => {
  const parts = encryptedText.split(":");
  if (parts.length !== 2) {
    throw new Error("Format token terenkripsi salah");
  }

  const iv = Buffer.from(parts[0], "hex");
  const encryptedData = parts[1];

  if (iv.length !== ivLength) {
    throw new Error("IV tidak valid");
  }

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// 🔵 Fungsi Membuat JWT
const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }); // 7 hari lebih aman
};

// 🔵 Fungsi Verifikasi JWT
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// 🔵 Ekspos Fungsi
module.exports = {
  encrypt,
  decrypt,
  createJWT,
  verifyJWT,
};
