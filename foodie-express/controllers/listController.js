"use strict";

const ListsDB = require("../models/ListsDB");
var listsDB = new ListsDB();

async function viewBookmarks(req, res) {
  const { userId } = req;

  listsDB.viewBookmarks(userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function addBookmark(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.body;

  listsDB.addBookmark(userId, idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json({
        message: "Restaurant added to Bookmarks",
      });
    }
  });
}

async function removeBookmark(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.body;

  listsDB.deleteBookmark(userId, idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json({
        message: "Restaurant removed from Bookmarks",
      });
    }
  });
}

async function viewFavourites(req, res) {
  const { userId } = req;

  listsDB.viewFavourites(userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function addFavourite(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.body;

  listsDB.addFavourite(userId, idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json({
        message: "Restaurant added to Favourites",
      });
    }
  });
}

async function removeFavourite(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.body;

  listsDB.deleteFavourite(userId, idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else if (value.affectedRows > 0) {
      res.json({
        message: "Restaurant removed from Favourites",
      });
    } else {
      res.json({
        message: "Restaurant already removed",
      });
    }
  });
}

module.exports = {
  viewBookmarks,
  addBookmark,
  removeBookmark,
  viewFavourites,
  addFavourite,
  removeFavourite,
};
