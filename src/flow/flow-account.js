const Boom = require("@hapi/boom");
const RepositoryAccount = require("../repository/repository-account");

const getAccount = async (id) => {
  try {
    if (id) {
      const data = await RepositoryAccount.checkAccountData(id);
      return Promise.resolve(data);
    } else {
      return Promise.reject(
        Boom.badRequest("Invalid input: Account ID is required.")
      );
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const getAllAccounts = async () => {
  try {
    const allData = await RepositoryAccount.getAllAccounts();
    return Promise.resolve(allData);
  } catch (error) {
    console.log(error);
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
    if (id) {
      const result = await RepositoryAccount.insertAccountData(
        id,
        customer_id,
        account_id,
        username,
        password,
        balance
      );
      return Promise.resolve(result);
    } else {
      return Promise.reject(
        Boom.badRequest("Invalid input: (id field are required.")
      );
    }
  } catch (error) {
    console.log(error);
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
    if (id) {
      const result = await RepositoryAccount.updateAccountData(
        id,
        customer_id,
        account_id,
        username,
        password,
        balance
      );
      return Promise.resolve(result);
    } else {
      return Promise.reject(
        Boom.badRequest("Invalid input: (id field are required.")
      );
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(Boom.internal(error.message));
  }
};

const deleteAccount = async (id) => {
  try {
    if (id) {
      const result = await RepositoryAccount.deleteAccountData(id);
      return Promise.resolve(result);
    } else {
      return Promise.reject(
        Boom.badRequest("Invalid input: Account ID is required.")
      );
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(Boom.internal(error.message));
  }
};

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
};
