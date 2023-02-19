"use strict";

const UpvotesDB = require("../models/UpvotesDB");

var upvotesDB = new UpvotesDB();

async function viewUpvotesByRestaurant(req, res) {
  const { idRestaurant } = req.params;

  upvotesDB.getUpvotesByRestaurant(idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function addUpvote(req, res) {
  const { idRestaurant } = req.params;
  const { idAccount } = req.body;
  const { vote } = req.body;
  const { userId } = req;

  if (userId === idAccount) {
    return res.json({ message: "You can't vote for your own Review" });
  }

  upvotesDB.addUpvote(idRestaurant, idAccount, userId, vote, function (err) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        if (err.sql.slice(-3, -2) === vote) {
          upvotesDB.deleteUpvote(
            idRestaurant,
            idAccount,
            userId,

            function (err) {
              if (err) {
                return res.json(err);
              } else {
                return res.json({ message: "Vote removed" });
              }
            }
          );
        } else {
          upvotesDB.editUpvote(
            idRestaurant,
            idAccount,
            userId,
            vote,
            function (err) {
              if (err) {
                return res.json(err);
              } else {
                return res.json({ message: "Vote changed" });
              }
            }
          );
        }
      }
    } else {
      return res.json({ message: "Vote added" });
    }
  });
}

async function myUpvotes(req, res) {
  const { username } = req.params;

  upvotesDB.getMyUpvotes(username, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

module.exports = {
  viewUpvotesByRestaurant,
  addUpvote,
  myUpvotes,
};
