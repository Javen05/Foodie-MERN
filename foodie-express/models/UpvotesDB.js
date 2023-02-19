"use strict";

var db = require("../db-connection");

class UpvotesDB {
  getUpvotesByRestaurant(idRestaurant, callback) {
    var sql = `
        SELECT t.idRestaurant, t.idAccount, SUM(t.likes) AS likes, SUM(t.dislikes) AS dislikes, SUM(t.likes - t.dislikes) AS ratio
        FROM (
          SELECT upvotes.idRestaurant, upvotes.idAccount, COUNT(vote) AS likes, 0 AS dislikes
          FROM upvotes WHERE vote = "L"
          GROUP BY upvotes.idRestaurant, upvotes.idAccount
          
          UNION ALL
          
          SELECT upvotes.idRestaurant, upvotes.idAccount, 0 AS likes, COUNT(vote) AS dislikes
          FROM upvotes WHERE vote = "D"
          GROUP BY upvotes.idRestaurant, upvotes.idAccount
        ) t
        WHERE t.idRestaurant = ?
        GROUP BY t.idAccount`;

    db.query(sql, [idRestaurant], callback);
  }

  addUpvote(idRestaurant, idAccount, accountId, vote, callback) {
    var sql =
      "INSERT INTO upvotes (idRestaurant, idAccount, accountId, vote) VALUES (?, ?, ?, ?)";
    db.query(sql, [idRestaurant, idAccount, accountId, vote], callback);
  }

  editUpvote(idRestaurant, idAccount, accountId, vote, callback) {
    var sql =
      "UPDATE upvotes SET vote = ? WHERE idRestaurant = ? AND idAccount = ? AND accountId = ?";
    db.query(sql, [vote, idRestaurant, idAccount, accountId], callback);
  }

  deleteUpvote(idRestaurant, idAccount, accountId, callback) {
    var sql =
      "DELETE FROM upvotes WHERE idRestaurant = ? AND idAccount = ? AND accountId = ?";

    db.query(sql, [idRestaurant, idAccount, accountId], callback);
  }

  getMyUpvotes(username, callback) {
    var sql = `
        SELECT a.username, DATE_FORMAT(a.date, "%d/%m/%Y") AS date,
        t.idAccount, SUM(t.likes) AS likes, SUM(t.dislikes) AS dislikes, SUM(t.likes - t.dislikes) AS ratio
        FROM (
          SELECT upvotes.idAccount, COUNT(vote) AS likes, 0 AS dislikes
          FROM upvotes WHERE vote = "L"
          GROUP BY upvotes.idAccount
          
          UNION ALL
          
          SELECT upvotes.idAccount, 0 AS likes, COUNT(vote) AS dislikes
          FROM upvotes WHERE vote = "D"
          GROUP BY upvotes.idAccount
        ) t
        LEFT JOIN accounts AS a 
            ON t.idAccount = a.idAccount
        WHERE a.username = ?`;

    db.query(sql, [username], callback);
  }
}

module.exports = UpvotesDB;
