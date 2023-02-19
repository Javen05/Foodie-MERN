"use strict";

var db = require("../db-connection");

class ListsDB {
  viewBookmarks(idAccount, callback) {
    var sql = `SELECT list.*, DATE_FORMAT(list.datetime, '%d/%m/%Y %H:%i:%s') AS date, GROUP_CONCAT(image) AS images, name, description 
        FROM list 
            LEFT JOIN restaurants ON list.idRestaurant = restaurants.idRestaurant 
            RIGHT JOIN images ON images.idRestaurant = list.idRestaurant 
        WHERE list.idAccount = TRIM(?) AND type = 'B' 
        GROUP BY list.idRestaurant`;
    db.query(sql, [idAccount], callback);
  }

  addBookmark(idAccount, idRestaurant, callback) {
    var sql =
      "INSERT INTO list (idAccount, idRestaurant, type, datetime) VALUES (TRIM(?), TRIM(?), 'B', NOW())"; // date and time for list can use User's local time
    db.query(sql, [idAccount, idRestaurant], callback); //  since it is only for User's own use
  }

  deleteBookmark(idAccount, idRestaurant, callback) {
    var sql =
      "DELETE FROM list WHERE idAccount = TRIM(?) AND idRestaurant = TRIM(?) AND type = 'B'";
    db.query(sql, [idAccount, idRestaurant], callback);
  }

  viewFavourites(idAccount, callback) {
    var sql = `SELECT list.*, DATE_FORMAT(list.datetime, '%d/%m/%Y %H:%i:%s') AS date, GROUP_CONCAT(image) AS images, name, description 
        FROM list 
            LEFT JOIN restaurants ON list.idRestaurant = restaurants.idRestaurant 
            RIGHT JOIN images ON images.idRestaurant = list.idRestaurant 
        WHERE list.idAccount = TRIM(?) AND type = 'F' 
        GROUP BY list.idRestaurant`;
    db.query(sql, [idAccount], callback);
  }

  addFavourite(idAccount, idRestaurant, callback) {
    var sql =
      "INSERT INTO list (idAccount, idRestaurant, type, datetime) VALUES (TRIM(?), TRIM(?), 'F', NOW())";
    db.query(sql, [idAccount, idRestaurant], callback);
  }

  deleteFavourite(idAccount, idRestaurant, callback) {
    var sql =
      "DELETE FROM list WHERE idAccount = TRIM(?) AND idRestaurant = TRIM(?) AND type = 'F'";
    db.query(sql, [idAccount, idRestaurant], callback);
  }
}

module.exports = ListsDB;
