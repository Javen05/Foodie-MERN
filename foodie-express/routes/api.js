const express = require("express");
const router = express.Router();

// import routers
router.use("/account",    require("./account"));
router.use("/restaurant", require("./restaurant"));
router.use("/review",     require("./review"));
router.use("/list",       require("./list"));
router.use("/upvote",     require("./upvote"));

router.get("/*", (req, res) => {
  res.json({
    success: false,
    message: "Route not found",
  });
});

module.exports = router;
