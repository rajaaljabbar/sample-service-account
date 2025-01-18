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

// Check Account data
const checkAccountData = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, customer_id, account_id, username, password, balance FROM accounts WHERE id = $1;`,
      [id] // Adjust according to fetched parameter
    );

    return Promise.resolve(result.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Insert Account data
const insertAccountData = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  try {
    const client = await pool.connect();
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    await client.query(
      `INSERT INTO accounts (id, customer_id, account_id, username, password, balance, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [id, customer_id, account_id, username, password, balance, currentDate]
    );

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get all Accounts
const getAllAccounts = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, customer_id, account_id, username, password, balance FROM accounts;`
    );

    return Promise.resolve(result.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete Account data
const deleteAccountData = async (id) => {
  try {
    const client = await pool.connect();

    await client.query(`DELETE FROM accounts WHERE id = $1;`, [id]);

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update Account data
const updateAccountData = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  try {
    const client = await pool.connect();

    await client.query(
      `UPDATE accounts SET id = $1, customer_id = $2, account_id = $3, username = $4, password = $5, balance = $6 WHERE id = $7;`,
      [id, customer_id, account_id, username, password, balance, id] // Assuming the first parameter is the ID to query against
    );

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  checkAccountData,
  insertAccountData,
  getAllAccounts,
  deleteAccountData,
  updateAccountData,
};
