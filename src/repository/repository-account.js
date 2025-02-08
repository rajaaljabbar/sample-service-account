const { Pool } = require("pg");
const moment = require("moment");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "postgres",
  password: process.env.PG_PASSWORD || "password",
  port: process.env.PG_PORT || 5432,
});

// ✅ Tambahkan Fungsi untuk Mendapatkan Akun berdasarkan Email
const getAccountByEmail = async (email) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT id, email, customer_id, account_id, username, password, balance FROM accounts WHERE email = $1;`,
      [email]
    );
    return result.rows[0]; // Ambil user pertama jika ada
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release(); // Pastikan koneksi dilepas
  }
};

// ✅ Perbaiki `pool.connect()` dengan `finally` agar koneksi selalu dilepas
const checkAccountData = async (id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT id, customer_id, account_id, username, password, balance FROM accounts WHERE id = $1;`,
      [id]
    );
    return result.rows;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release();
  }
};

// ✅ Tambahkan release() pada insertAccountData
const insertAccountData = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  let client;
  try {
    client = await pool.connect();
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    await client.query(
      `INSERT INTO accounts (id, customer_id, account_id, username, password, balance, created_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [id, customer_id, account_id, username, password, balance, currentDate]
    );

    return true;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release();
  }
};

// ✅ Tambahkan release() pada getAllAccounts
const getAllAccounts = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT id, customer_id, account_id, username, password, balance FROM accounts;`
    );
    return result.rows;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release();
  }
};

// ✅ Tambahkan release() pada deleteAccountData
const deleteAccountData = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query(`DELETE FROM accounts WHERE id = $1;`, [id]);
    return true;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release();
  }
};

// ✅ Tambahkan release() pada updateAccountData
const updateAccountData = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  let client;
  try {
    client = await pool.connect();
    await client.query(
      `UPDATE accounts SET customer_id = $2, account_id = $3, username = $4, password = $5, balance = $6 
       WHERE id = $1;`,
      [id, customer_id, account_id, username, password, balance]
    );
    return true;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  checkAccountData,
  insertAccountData,
  getAllAccounts,
  deleteAccountData,
  updateAccountData,
  getAccountByEmail, // ✅ Tambahkan fungsi baru ini agar `authenticate` di flow-account.js bisa bekerja
};
