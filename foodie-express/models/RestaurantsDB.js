"use strict";

var db = require("../db-connection");

class RestaurantsDB {
  getAllRestaurants(callback) {
    var sql = `SELECT restaurants.idRestaurant, restaurants.name, restaurants.description, 
        GROUP_CONCAT(DISTINCT image) AS images, 
        ROUND(AVG(rating), 1) AS ratio, 
        COUNT(rating) AS reviewers 
        FROM restaurants 
        RIGHT JOIN images 
            ON restaurants.idRestaurant = images.idRestaurant 
        LEFT JOIN reviews 
            ON restaurants.idRestaurant = reviews.idRestaurant 
        GROUP BY idRestaurant 
        ORDER BY idRestaurant`;
    db.query(sql, callback);
  }

  // getting individual restaurant
  getRestaurantById(id, callback) {
    var sql = `SELECT restaurants.idRestaurant, name, description, idAccount, menu,
        DATE_FORMAT(date, "%d %M %Y")
            AS date, 
        GROUP_CONCAT(image)
            AS images 
        FROM restaurants 
        CROSS JOIN images 
            ON restaurants.idRestaurant = images.idRestaurant 
        WHERE restaurants.idRestaurant = TRIM(?)`;
    db.query(sql, [id], callback);
  }

  getRestaurantCategories(id, callback) {
    var sql =
      "SELECT DISTINCT(category) FROM categories WHERE idRestaurant = TRIM(?)";
    db.query(sql, [id], callback);
  }

  getRestaurantBranches(id, callback) {
    var sql = `SELECT idRestaurant, branch, 
        GROUP_CONCAT(title) AS titles, 
        GROUP_CONCAT(content) AS contents 
        FROM branches 
        LEFT JOIN branch_details 
            ON branches.idBranch = branch_details.idBranch 
        WHERE idRestaurant = TRIM(?)
        GROUP BY branch 
        ORDER BY title`;
    db.query(sql, [id], callback);
  }

  // search with filter and sort
  getRestaurantBySearch(search, category, sort, callback) {
    var sql = `
        SELECT restaurants.idRestaurant, name, description, 
        GROUP_CONCAT(DISTINCT image) AS images, 
        ROUND(AVG(rating), 1) AS ratio, COUNT(rating) AS reviewers,
        GROUP_CONCAT(DISTINCT category) AS categories
        FROM restaurants 
            LEFT JOIN categories 
                ON restaurants.idRestaurant = categories.idRestaurant 
            LEFT JOIN reviews 
                ON restaurants.idRestaurant = reviews.idRestaurant 
            RIGHT JOIN images 
                ON restaurants.idRestaurant = images.idRestaurant
        WHERE (restaurants.name 
        LIKE CONCAT('%', TRIM(?), '%') 
            OR SOUNDEX(?) 
            LIKE SOUNDEX(restaurants.name))
        AND (categories.category LIKE CONCAT('%',TRIM(?),'%'))
        GROUP BY idRestaurant 
        ORDER BY ${sort}
        `;
    db.query(sql, [search, search, category, sort], callback);
  }
  //sort: Default = restaurants.idRestaurant, random = RAND, rating = AVG(rating) desc, RECENT = restaurants.date, popular = COUNT(reviews.idRestaurant), A-Z = restaurants.name

  logSearch(idAccount, search, callback) {
    var sql = `INSERT INTO searches (idAccount, searchQuery, datetime)
    VALUES (
        IF(TRIM(?) != '', TRIM(?), NULL), 
        IF(TRIM(?) != '', TRIM(?), NULL), 
        ?
    )`;
    db.query(
      sql,
      [
        idAccount,
        idAccount,
        search,
        search,
        new Date().toJSON().slice(0, 19).replace("T", " "),
      ],
      callback
    ); // get current datetime from server, not client
  }

  // cooldown search logging
  getSearchLog(idAccount, search, callback) {
    var sql = `SELECT COUNT(*) AS count 
        FROM searches 
        WHERE idAccount = TRIM(?) 
            AND searchQuery LIKE CONCAT(TRIM(?), "%") 
            AND DATE_FORMAT(datetime, "%Y-%m-%d %h:%i") = ?`;
    db.query(
      sql,
      [idAccount, search, new Date().toJSON().slice(0, 16).replace("T", " ")],
      callback
    ); // if a similar search was made within 1 minute by same user, it will return 1
  }

  // CUD methods for Restaurant Owner ONLY

  // INSERT restaurant table and images table in a single query - force Owner to add atleast 1 Restaurant image
  createRestaurant(name, description, menu, idAccount, callback) {
    var sql =
      "INSERT INTO restaurants (name, description, menu, idAccount, date) VALUES (TRIM(?), TRIM(?), TRIM(?), TRIM(?), ?)";
    db.query(
      sql,
      [name, description, menu, idAccount, new Date().toJSON().slice(0, 10)],
      callback
    ); // get current date from server, no need time
  }
  createImage(image, callback) {
    var sql =
      "INSERT INTO images (idRestaurant, image) VALUES (LAST_INSERT_ID(), TRIM(?))";
    db.query(sql, [image], callback);
  }

  addImage(idRestaurant, image, callback) {
    var sql =
      "INSERT INTO images (idRestaurant, image) VALUES (TRIM(?), TRIM(?))";
    db.query(sql, [idRestaurant, image], callback);
  }

  addBranch(idRestaurant, branch, callback) {
    var sql =
      "INSERT INTO branches (idRestaurant, branch) VALUES (TRIM(?), TRIM(?))";
    db.query(sql, [idRestaurant, branch], callback);
  }
  addBranchDetail(idBranch, title, content, callback) {
    var sql =
      "INSERT INTO branch_details (idBranch, title, content) VALUES (TRIM(?), TRIM(?), TRIM(?))";
    db.query(sql, [idBranch, title, content], callback);
  }

  addCategory(idRestaurant, category, callback) {
    var sql =
      "INSERT INTO categories (idRestaurant, category) VALUES (TRIM(?), TRIM(?))";
    db.query(sql, [idRestaurant, category], callback);
  }

  updateRestaurant(idRestaurant, name, description, menu, idAccount, callback) {
    var sql =
      "UPDATE restaurants SET name = TRIM(?), description = TRIM(?), menu = ? WHERE idRestaurant = TRIM(?) AND idAccount = TRIM(?)";
    db.query(sql, [name, description, menu, idRestaurant, idAccount], callback);
  }
  // no need to edit images or branches - just delete and add new ones idRestaurant, name, description, menu, idAccount

  deleteRestaurant(idRestaurant, idAccount, callback) {
    var sql =
      "DELETE FROM restaurants WHERE idRestaurant = TRIM(?) AND idAccount = TRIM(?)";
    db.query(sql, [idRestaurant, idAccount], callback);
  }

  // delete Name, so that all duplicates are deleted
  deleteImage(idRestaurant, image, callback) {
    var sql =
      "DELETE FROM images WHERE idRestaurant = TRIM(?) AND image = TRIM(?)";
    db.query(sql, [idRestaurant, image], callback);
  }
  deleteBranch(branch, callback) {
    var sql = "DELETE FROM branches WHERE branch = TRIM(?)";
    db.query(sql, [branch], callback);
  }
  deleteBranchDetail(title, callback) {
    var sql = "DELETE FROM branch_details WHERE title = TRIM(?)";
    db.query(sql, [title], callback);
  }
  deleteCategory(idRestaurant, category, callback) {
    var sql =
      "DELETE FROM categories WHERE idRestaurant = TRIM(?) AND category = TRIM(?)";
    db.query(sql, [idRestaurant, category], callback);
  }

  // See which restaurants the user owns
  getMyRestaurants(idAccount, callback) {
    var sql = `SELECT restaurants.idRestaurant, restaurants.name, restaurants.description, 
        GROUP_CONCAT(image) 
        FROM restaurants 
        RIGHT JOIN images 
            ON restaurants.idRestaurant = images.idRestaurant 
        WHERE idAccount = TRIM(?) 
        GROUP BY idRestaurant 
        ORDER BY idRestaurant`;
    db.query(sql, [idAccount], callback);
  }

  // change User Role
  updateRole(idAccount, role, callback) {
    var sql = "UPDATE accounts SET role = TRIM(?) WHERE idAccount = TRIM(?)";
    db.query(sql, [role, idAccount], callback);
  }

  // search recommendations algorithm
  getRecommendations(idAccount, callback) {
    var sql = `(SELECT searchQuery, 
            FLOOR( COUNT(
            (restaurants.name LIKE searchQuery) 
            OR (SOUNDEX(searchQuery) = SOUNDEX(restaurants.name))
            OR (searchQuery IN (restaurants.name))
            ) / 9) AS count
            FROM (searches, restaurants)
            GROUP BY searchQuery
            ORDER BY count DESC
            LIMIT 4)
            
            UNION
            
            (SELECT searchQuery, NULL
            FROM searches
            WHERE idAccount = TRIM(?)
            ORDER BY datetime DESC
            LIMIT 1)
            
            LIMIT 5`;
    db.query(sql, [idAccount], callback);
  }
}

module.exports = RestaurantsDB;
