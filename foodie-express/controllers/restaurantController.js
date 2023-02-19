"use strict";

const RestaurantsDB = require("../models/RestaurantsDB");

var restaurantsDB = new RestaurantsDB();

async function viewAllRestaurants(req, res) {
  restaurantsDB.getAllRestaurants(function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function viewRecommendations(req, res) {
  const { userId } = req; // userId from authMiddleware

  restaurantsDB.getRecommendations(userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

async function viewRestaurant(req, res) {
  const { idRestaurant } = req.params;

  restaurantsDB.getRestaurantById(idRestaurant, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      const restaurant = value;

      // proceeed to get branches of Restaurant if successfully loaded Restaurant
      restaurantsDB.getRestaurantBranches(idRestaurant, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          const branches = value;

          // get categories of Restaurant
          restaurantsDB.getRestaurantCategories(
            idRestaurant,
            function (err, value) {
              if (err) {
                return res.json(err);
              } else {
                res.json({
                  restaurant,
                  categories: value,
                  branches,
                });
              }
            }
          );
        }
      });
    }
  });
}

async function searchRestaurant(req, res) {
  var { search, category, sort } = req.body;

  if (sort === "") {
    sort = "restaurants.idRestaurant";
  }

  restaurantsDB.getRestaurantBySearch(
    search,
    category,
    sort,
    function (err, value) {
      if (err) {
        return res.json(err);
      } else {
        res.json(value);
      }
    }
  );
}

async function logSearch(req, res) {
  var { search } = req.body;
  const { userId } = req; // userId from authMiddleware

  restaurantsDB.getSearchLog(userId, search, function (err, value) {
    if (value[0].count != 0) {
      return res.json({ message: "Too fast" });
    } else if (err) {
      return res.json(err);
    } else {
      restaurantsDB.logSearch(userId, search, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          return res.json({ message: "Search Logged" });
        }
      });
    }
  });
}

// Create a new restaurant
async function createRestaurant(req, res) {
  var { name, description, image, menu, category } = req.body;
  const { userId } = req; // userId from authMiddleware

  if (menu == "") {
    menu = null;
  } // save SQL storage space - prevent storing empty string

  restaurantsDB.createRestaurant(
    name,
    description,
    menu,
    userId,
    function (err, value) {
      if (err) {
        return res.json(err);
      } else {
        const restaurant = {
          idRestaurant: value.insertId,
          name: name,
          description: description,
          menu: menu,
        };

        restaurantsDB.createImage(image, function (err, value) {
          if (err) {
            return res.json(err);
          } else {
            restaurantsDB.addCategory(
              restaurant.idRestaurant,
              category,
              function (err, value) {
                if (err) {
                  return res.json(err);
                } else {
                  const ROLE = "O";

                  restaurantsDB.updateRole(userId, ROLE, function (err, value) {
                    if (err) {
                      return res.json(err);
                    } else {
                      res.json({
                        restaurant,
                        category,

                        message: "Restaurant created successfully",
                      });
                    }
                  });
                }
              }
            );
          }
        });
      }
    }
  );
}

// Add a new image
async function addImage(req, res) {
  var { image } = req.body;
  const { userId } = req;
  const { idRestaurant } = req.params;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    // if id of Restaurant being edited is not in the list of user's restaurants, value will be 0
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.addImage(idRestaurant, image, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          if (value.affectedRows == 0) {
            return res.json({ message: "An Error Occurred" });
          } else {
            res.json({
              message: "Image added successfully",
            });
          }
        }
      });
    }
  });
}

// Create a new branch
async function addBranch(req, res) {
  const { idRestaurant } = req.params;
  const { userId } = req;
  var { branch } = req.body;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.addBranch(idRestaurant, branch, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          if (value.affectedRows == 0) {
            return res.json({ message: "An Error Occurred" });
          } else {
            res.json({
              message: "Branch added successfully",
            });
          }
        }
      });
    }
  });
}

// add details to a branch
async function addBranchDetail(req, res) {
  const { idRestaurant } = req.params;
  var { idBranch, title, content } = req.body;
  const { userId } = req;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this Restaurant" });
    } else {
      restaurantsDB.addBranchDetail(
        idBranch,
        title,
        content,
        function (err, value) {
          if (err) {
            return res.json(err);
          } else {
            if (value.affectedRows == 0) {
              return res.json({ message: "An Error Occurred" });
            } else {
              res.json({
                message: "Branch detail added successfully",
              });
            }
          }
        }
      );
    }
  });
}

// Create a new category
async function addCategory(req, res) {
  const { idRestaurant } = req.params;
  var { category } = req.body;
  const { userId } = req;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.addCategory(idRestaurant, category, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          if (value.affectedRows == 0) {
            return res.json({ message: "An Error Occurred" });
          } else {
            res.json({
              message: "Category added successfully",
            });
          }
        }
      });
    }
  });
}

// update Restaurant
async function updateRestaurant(req, res) {
  const { idRestaurant } = req.params;
  const { userId } = req;
  var { name, description, menu } = req.body;

  restaurantsDB.updateRestaurant(
    idRestaurant,
    name,
    description,
    menu,
    userId,
    function (err, value) {
      if (err) {
        return res.json(err);
      } else {
        res.json(value);
      }
    }
  );
}

// Delete a restaurant
// All branches, categories, images, and reviews will be deleted as well - FK set to cascade
async function deleteRestaurant(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.params;

  restaurantsDB.deleteRestaurant(idRestaurant, userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else if (value.affectedRows == 0) {
      res.json({
        message:
          "Unsuccessful - Restaurant does not exist or you are not the Owner",
        status: "error",
      });
    } else {
      restaurantsDB.getMyRestaurants(userId, function (err, value) {
        if (err) {
          return res.json(err);
        } else {
          if (value.length == 0) {
            const ROLE = "R";
            restaurantsDB.updateRole(userId, ROLE, function (err, value) {
              return res.json({
                message: "You no longer own any restaurants",
                status: "success",
              });
            });
          } else {
            return res.json({
              message: "Restaurant deleted successfully",
              status: "success",
            });
          }
        }
      });
    }
  });
}

// Delete image
async function deleteImage(req, res) {
  const { userId } = req;
  const { idRestaurant } = req.params;
  var { image } = req.body;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.deleteImage(idRestaurant, image, function (err, value) {
        if (err) {
          return res.json(err);
        } else if (value.affectedRows == 0) {
          res.json({
            message: "Unsuccessful - Image does not exist",
            status: "error",
          });
        } else {
          res.json({
            message: "Image deleted successfully",
            status: "success",
          });
        }
      });
    }
  });
}

// Delete a branch
async function deleteBranch(req, res) {
  var { branch } = req.body;
  const { userId } = req;
  const { idRestaurant } = req.params;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.deleteBranch(branch, function (err, value) {
        if (err) {
          return res.json(err);
        } else if (value.affectedRows == 0) {
          res.json({
            message: "Unsuccessful - Branch does not exist",
            status: "error",
          });
        } else {
          res.json({
            message: "Branch deleted successfully",
            status: "success",
          });
        }
      });
    }
  });
}

// Delete a branch detail
async function deleteBranchDetail(req, res) {
  var { branchDetail } = req.body;
  const { userId } = req;
  const { idRestaurant } = req.params;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.deleteBranchDetail(branchDetail, function (err, value) {
        if (err) {
          return res.json(err);
        } else if (value.affectedRows == 0) {
          res.json({
            message: "Unsuccessful - Branch detail does not exist",
            status: "error",
          });
        } else {
          res.json({
            message: "Branch detail deleted successfully",
          });
        }
      });
    }
  });
}

// view my restaurants
async function getMyRestaurants(req, res) {
  const { userId } = req;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    } else {
      res.json(value);
    }
  });
}

// delete category for a restaurant
async function deleteCategory(req, res) {
  const { idRestaurant } = req.params;
  const { category } = req.body;
  const { userId } = req;

  restaurantsDB.getMyRestaurants(userId, function (err, value) {
    if (err) {
      return res.json(err);
    }

    // check if user is the owner of the restaurant
    value = value.filter(
      (restaurant) => restaurant.idRestaurant == idRestaurant
    );

    if (value.length == 0) {
      return res.json({ message: "You are not the owner of this restaurant" });
    } else {
      restaurantsDB.deleteCategory(
        idRestaurant,
        category,
        function (err, value) {
          if (err) {
            return res.json(err);
          } else {
            if (value.affectedRows == 0) {
              return res.json({
                message: "Unsuccessful - Category does not exist",
              });
            } else {
              res.json({
                message: "Category deleted successfully",
              });
            }
          }
        }
      );
    }
  });
}

module.exports = {
  viewAllRestaurants,
  viewRecommendations,
  deleteBranchDetail,
  viewRestaurant,
  searchRestaurant,
  logSearch,
  createRestaurant,
  addImage,
  addBranch,
  addBranchDetail,
  addCategory,
  updateRestaurant,
  deleteRestaurant,
  deleteImage,
  deleteBranch,
  getMyRestaurants,
  deleteCategory,
};
