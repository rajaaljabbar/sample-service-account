const Boom = require("@hapi/boom");
const RepositoryAccount = require("../repository/repository-account");

const getAccount = async (id) => {
  try {
    if (!id) {
      return Promise.reject(
        Boom.badRequest("Invalid input: Account ID is required.")
      );
    }
    const data = await RepositoryAccount.checkAccountData(id);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error in getAccount:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const getAllAccounts = async () => {
  try {
    const allData = await RepositoryAccount.getAllAccounts();
    return Promise.resolve(allData);
  } catch (error) {
    console.error("Error in getAllAccounts:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const addAccount = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  try {
    if (!id || !customer_id || !account_id || !username || !password) {
      return Promise.reject(
        Boom.badRequest("Invalid input: All fields are required.")
      );
    }

    const result = await RepositoryAccount.insertAccountData(
      id,
      customer_id,
      account_id,
      username,
      password, // Simpan password tanpa hashing
      balance
    );
    return Promise.resolve(result);
  } catch (error) {
    console.error("Error in addAccount:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const updateAccount = async (
  id,
  customer_id,
  account_id,
  username,
  password,
  balance
) => {
  try {
    if (!id) {
      return Promise.reject(
        Boom.badRequest("Invalid input: ID field is required.")
      );
    }

    const result = await RepositoryAccount.updateAccountData(
      id,
      customer_id,
      account_id,
      username,
      password, // Simpan password tanpa hashing
      balance
    );
    return Promise.resolve(result);
  } catch (error) {
    console.error("Error in updateAccount:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const deleteAccount = async (id) => {
  try {
    if (!id) {
      return Promise.reject(
        Boom.badRequest("Invalid input: Account ID is required.")
      );
    }
    const result = await RepositoryAccount.deleteAccountData(id);
    return Promise.resolve(result);
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

// 🔹 Fungsi untuk mengambil akun berdasarkan email
const getAccountByEmail = async (email) => {
  try {
    if (!email) {
      return Promise.reject(Boom.badRequest("Email harus diisi."));
    }

    const user = await RepositoryAccount.getAccountByEmail(email);
    if (!user) {
      return Promise.reject(
        Boom.notFound("Akun dengan email ini tidak ditemukan.")
      );
    }

    return Promise.resolve(user);
  } catch (error) {
    console.error("Error in getAccountByEmail:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

// 🔹 Fungsi autentikasi (login) tanpa bcrypt
const authenticate = async (email, password) => {
  try {
    if (!email || !password) {
      return Promise.reject(Boom.badRequest("Email dan password harus diisi."));
    }

    // Ambil data akun berdasarkan email
    const user = await getAccountByEmail(email);
    console.log("DEBUG: Data user dari DB:", user);

    if (!user) {
      return Promise.reject(Boom.unauthorized("Akun tidak ditemukan."));
    }

    // Periksa apakah password cocok (tanpa hashing)
    if (user.password !== password) {
      return Promise.reject(Boom.unauthorized("Password salah."));
    }

    return Promise.resolve(user);
  } catch (error) {
    console.error("Error in authenticate:", error);
    return Promise.reject(Boom.internal(error.message));
  }
};

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
  authenticate,
  getAccountByEmail,
};
