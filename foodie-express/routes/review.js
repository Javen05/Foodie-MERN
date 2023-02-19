const express = require("express");
const router = express.Router();

var reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(['/edit'], authMiddleware);

router.get("/:idRestaurant",            reviewController.viewReviewsByRestaurant);
router.get("/edit/:idRestaurant",       reviewController.viewReviewsByUser);
router.post("/edit/:idRestaurant",      reviewController.addReview);
router.put("/edit/:idRestaurant",       reviewController.editReview);
router.delete("/edit/:idRestaurant",    reviewController.deleteReview);  // deletes ALL reviews

module.exports = router
