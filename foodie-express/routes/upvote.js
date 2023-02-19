const express = require("express");
const router = express.Router();

var upvoteController = require("../controllers/upvoteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(["/edit"], authMiddleware);

router.get("/:idRestaurant", upvoteController.viewUpvotesByRestaurant);

router.post("/edit/:idRestaurant", upvoteController.addUpvote);

router.get("/me/:username", upvoteController.myUpvotes);

module.exports = router;
