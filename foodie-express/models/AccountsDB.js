"use strict";

var db = require("../db-connection");

class AccountsDB {
  getAccountByUsername(username, callback) {
    return db.query(
      "SELECT * FROM accounts WHERE username = TRIM(?)",
      [username],
      callback
    );
  } // this method is for validating Account

  getAccountById(idAccount, callback) {
    return db.query(
      `SELECT username, picture, email, phone, role, 
        DATE_FORMAT(acc.date, "%d/%m/%Y") AS date,
        GROUP_CONCAT(review) AS reviews, 
        GROUP_CONCAT(res.name) AS restaurants,
        GROUP_CONCAT(rev.rating) AS ratings
        FROM accounts AS acc LEFT JOIN reviews AS rev 
            ON acc.idAccount = rev.idAccount 
        LEFT JOIN restaurants AS res
            ON res.idRestaurant = rev.idRestaurant
        WHERE acc.idAccount = TRIM(?)
        ORDER BY res.idRestaurant
        `,
      [idAccount],
      callback
    );
  } // this method is for getting Account details

  createAccount(account, callback) {
    // add idAccount = NULL to ensure no existing accounts get overwritten
    var sql =
      "INSERT INTO accounts (idAccount, username, password, phone, email, date) VALUES (NULL, TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?))";
    return db.query(
      sql,
      [
        account.getUsername(),
        account.getPassword(),
        account.getPhone(),
        account.getEmail(),
        new Date().toJSON().slice(0, 10),
      ],
      callback
    );
  }

  login(account, callback) {
    var sql =
      "SELECT * FROM accounts WHERE username = TRIM(?) AND idAccount = TRIM(?)"; // add idAccount for double security
    return db.query(
      sql,
      [account.getUsername(), account.getIdAccount()],
      callback
    );
  }

  updateAccount(account, callback) {
    var sql =
      "UPDATE foodiedb.accounts SET username = TRIM(?), password = TRIM(?), phone = TRIM(?), email = TRIM(?) WHERE idAccount = TRIM(?)";
    return db.query(
      sql,
      [
        account.getUsername(),
        account.getPassword(),
        account.getPhone(),
        account.getEmail(),
        account.getIdAccount(),
      ],
      callback
    );
  }

  deleteAccount(idAccount, callback) {
    var sql = "DELETE FROM accounts WHERE idAccount = TRIM(?)";
    return db.query(sql, [idAccount], callback);
  }

  uploadProfilePicture(picture, idAccount, callback) {
    var sql = "UPDATE accounts SET picture = TRIM(?) WHERE idAccount = TRIM(?)";
    return db.query(sql, [picture, idAccount], callback);
  }

  userCount(callback) {
    var sql = "SELECT COUNT(*) AS count FROM accounts";
    return db.query(sql, callback);
  }

  resetPassword1(username, phone, email, callback) {
    var sql =
      "SELECT * FROM accounts WHERE username = TRIM(?) AND phone = TRIM(?) AND email = TRIM(?)";
    return db.query(sql, [username, phone, email], callback);
  }

  resetPassword2(newPass, username, oldPass, callback) {
    var sql = "UPDATE accounts SET password = TRIM(?) WHERE username = TRIM(?) AND BINARY password = TRIM(?)";
    return db.query(sql, [newPass, username, oldPass], callback);
  }
}

module.exports = AccountsDB;
