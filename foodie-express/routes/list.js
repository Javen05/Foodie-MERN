const express = require("express");
const router = express.Router();

var listController = require("../controllers/listController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(["/"], authMiddleware);

router.get("/bookmarks",    listController.viewBookmarks);
router.post("/bookmarks",   listController.addBookmark);
router.delete("/bookmarks", listController.removeBookmark);

router.get("/favourites",    listController.viewFavourites);
router.post("/favourites",   listController.addFavourite);
router.delete("/favourites", listController.removeFavourite);

module.exports = router;