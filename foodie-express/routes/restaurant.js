const express = require("express");
const router = express.Router();

var restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(['/log'], authMiddleware);
router.use(['/edit'], authMiddleware);

router.get("/",         restaurantController.viewAllRestaurants);

router.post("/search",  restaurantController.searchRestaurant);
router.post("/log",     restaurantController.logSearch);
router.get("/log",      restaurantController.viewRecommendations);

router.get("/edit",                               restaurantController.getMyRestaurants);
router.post("/edit",                              restaurantController.createRestaurant);
router.put("/edit/:idRestaurant",                 restaurantController.updateRestaurant);

router.put("/edit/:idRestaurant/image",           restaurantController.addImage);
router.put("/edit/:idRestaurant/branch",          restaurantController.addBranch);
router.put("/edit/:idRestaurant/branchDetail",    restaurantController.addBranchDetail);
router.put("/edit/:idRestaurant/category",        restaurantController.addCategory);

router.delete("/edit/:idRestaurant/image",        restaurantController.deleteImage);
router.delete("/edit/:idRestaurant/branch",       restaurantController.deleteBranch);
router.delete("/edit/:idRestaurant/branchDetail", restaurantController.deleteBranchDetail);
router.delete("/edit/:idRestaurant/category",     restaurantController.deleteCategory);
router.delete("/edit/:idRestaurant",              restaurantController.deleteRestaurant);

router.get("/:idRestaurant", restaurantController.viewRestaurant);

module.exports = router