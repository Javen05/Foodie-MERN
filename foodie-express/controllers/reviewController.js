"use strict";

const ReviewsDB = require("../models/ReviewsDB");

var reviewsDB = new ReviewsDB();

async function viewReviewsByRestaurant(req, res) {
  const { idRestaurant } = req.params;

  reviewsDB.getReviewsByRestaurant(idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function viewReviewsByUser(req, res) {
  const { userId } = req;

  reviewsDB.getReviewsByUser(userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function editReview(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.params;
  const { rating } = req.body;
  const { review } = req.body;

  if (review === "" || rating === 0) {
    return res.json({
      status: "error",
      message: "Incomplete review",
    });
  }

  reviewsDB.editReview(
    userId,
    idRestaurant,
    rating,
    review,
    function (err, value) {
      if (value.affectedRows > 0) {
        return res.json({
          status: "success",
          message: "Edit successful",
        });
      } else {
        return res.json({
          status: "error",
          message: "An error occurred",
        });
      }
    }
  );
}

async function addReview(req, res) {
  const { idRestaurant } = req.params;
  const { userId } = req;
  const { rating } = req.body;
  const { review } = req.body;

  if (review === "" || rating === 0) {
    return res.json({
      status: "error",
      message: "Incomplete review",
    });
  }

  reviewsDB.addReview(
    userId,
    idRestaurant,
    rating,
    review,
    function (err, value) {
      if (err) {
        return res.json(err);
      } else {
        res.json({
          status: "success",
          message: "Review added successfully",
        });
      }
    }
  );
}

async function deleteReview(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.params;

  reviewsDB.deleteReview(idRestaurant, userId, function (err, value) {
    if (value.affectedRows > 0) {
      return res.json({
        status: "success",
        message: "Delete successful",
      });
    } else {
      return res.json({
        status: "error",
        message: "An error occurred",
      });
    }
  });
}

module.exports = {
  viewReviewsByRestaurant,
  viewReviewsByUser,
  addReview,
  deleteReview,
  editReview,
};
