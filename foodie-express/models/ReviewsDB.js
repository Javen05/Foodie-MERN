"use strict";

var db = require("../db-connection");

class ReviewsDB {
  // get all reviews for a restaurant
  getReviewsByRestaurant(id, callback) {
    var sql = `SELECT R.idRestaurant, R.idAccount, R.rating, R.review,
        DATE_FORMAT(R.date, "%d/%m/%Y") AS date, 
        R.edited,
        A.username 
        FROM reviews AS R 
        JOIN accounts AS A 
            ON A.idAccount = R.idAccount
        WHERE idRestaurant = TRIM(?) 
        ORDER BY R.date DESC`;
    db.query(sql, [id], callback);
  }

  getReviewsByUser(id, callback) {
    var sql = `SELECT name AS restaurants FROM reviews AS rev LEFT JOIN restaurants AS res
        ON rev.idRestaurant = res.idRestaurant
        WHERE rev.idAccount = TRIM(?)`;
    db.query(sql, [id], callback);
  }

  // add a review
  addReview(idAccount, idRestaurant, rating, review, callback) {
    var sql =
      "INSERT INTO reviews (idAccount, idRestaurant, rating, review, date) VALUES (TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?))";
    db.query(
      sql,
      [
        idAccount,
        idRestaurant,
        rating,
        review,
        new Date().toJSON().slice(0, 10),
      ],
      callback
    );
  }

  // edit a review
  editReview(idAccount, idRestaurant, rating, review, callback) {
    var sql = `UPDATE reviews
            SET rating = TRIM(?), review = TRIM(?), date = TRIM(?), edited = "T"
            WHERE idAccount = TRIM(?) 
                AND idRestaurant = TRIM(?)
            `;
    db.query(
      sql,
      [
        rating,
        review,
        new Date().toJSON().slice(0, 10),
        idAccount,
        idRestaurant,
      ],
      callback
    );
  }

  // delete a review
  deleteReview(idRestaurant, idAccount, callback) {
    var sql =
      "DELETE FROM reviews WHERE idRestaurant = TRIM(?) AND idAccount = TRIM(?)";
    db.query(sql, [idRestaurant, idAccount], callback);
  }
}

module.exports = ReviewsDB;
