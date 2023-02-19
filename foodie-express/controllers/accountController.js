"use strict";
// using const as much as possible to prevent reassignment from Hackers
const AccountsDB = require("../models/AccountsDB");
const Account = require("../models/Account");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../models/NodeMailer");

var accountsDB = new AccountsDB();

// expect userId from authMiddleware
async function viewAccount(req, res) {
  const { userId } = req;

  if (userId === 0) {
    const user = null;
    return res
      .json({
        success: false,
        user,
      })
      .status(401);
  }

  accountsDB.getAccountById(userId, function (err, value) {
    const user = value[0];

    res.json({
      success: true,
      user,
    });
  });
}

async function addAccount(req, res) {
  const { username, password, email, phone } = req.body;
  var passLen = password.length;

  // check input to prevent nonsensical data from being stored in the database
  if (
    username === "" ||
    password === "" ||
    phone === "" ||
    email === "" ||
    phone === null
  ) {
    // return to break/stop function
    return res
      .json({
        success: false,
        message: "Please fill in all fields",
      })
      .status(400);
  } else if (username.length < 3) {
    return res
      .json({
        success: false,
        message: "Username must be at least 3 characters",
      })
      .status(400);
  } else if (!username.match(/^[a-zA-Z0-9]+$/g)) {
    // reject special characters and spaces in username
    return res
      .json({
        success: false,
        message: "Username cannot contain special characters",
      })
      .status(400);
  } else if (passLen > 72) {
    // bcrypt cannot hash longer than 72 characters
    return res
      .json({
        success: false,
        message: "Password too long",
      })
      .status(400);
  } else if (passLen < 8) {
    return res
      .json({
        success: false,
        message: "Password cannot be shorter than 8 characters",
      })
      .status(400);
  } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    // regex to check for valid email address
    return res
      .json({
        success: false,
        message: "Please enter a valid email address",
      })
      .status(400);
  } else {
    var hashedPassword = await bcrypt.hash(password, 10);
    var account = new Account(null, username, hashedPassword, email, phone);
  }

  accountsDB.createAccount(account, function (err) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // database designed to prevent duplicate usernames
        return res
          .json({ success: false, message: "Username is taken!" })
          .status(400);
      }
      return res.json(err);
    }

    accountsDB.getAccountByUsername(username, async function (err, value) {
      const user = value[0];
      const token = jwt.sign(
        { sub: user.idAccount, iat: Date.now() },
        process.env.JWT_SECRET,
        { algorithm: "HS512" }
      );

      res.json({
        success: true,
        message: "Account registration success!",
        token: token,
      });
    });
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  // santize input to prevent SQL injection
  if (username === "" || password === "") {
    return res
      .json({
        success: false,
        message: "Please fill in all fields",
      })
      .status(400);
  }

  if (username.match(/^[a-zA-Z0-9]+$/g) === null) {
    return res
      .json({
        success: false,
        message: "Invalid Username",
      })
      .status(400);
  }

  accountsDB.getAccountByUsername(username, async function (err, value) {
    if (value.length === 0) {
      return res
        .json({
          success: false,
          message: "Username does not exist",
        })
        .status(400);
    }

    const user = value[0];
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .json({
          success: false,
          message: "Incorrect password",
        })
        .status(401);
    }

    const token = jwt.sign(
      { sub: user.idAccount, iat: Date.now() },
      process.env.JWT_SECRET,
      { algorithm: "HS512" }
    );

    res.json({
      success: true,
      message: "Login successful",
      type: "Bearer",
      token,
      user,
    });
  });
}

async function updateAccount(req, res) {
  const { email } = req.body;
  var { username, newUsername, password, newPassword, phone } = req.body;
  var passLen = newPassword.length;

  if (
    newUsername === "" ||
    newPassword === "" ||
    phone === null ||
    email === ""
  ) {
    return res
      .json({
        success: false,
        message: "Please fill in all fields",
      })
      .status(400);
  } else if (newUsername.length < 3) {
    return res
      .json({
        success: false,
        message: "Username must be at least 3 characters",
      })
      .status(400);
  } else if (!newUsername.match(/^[a-zA-Z0-9]+$/g)) {
    return res
      .json({
        success: false,
        message: "Username cannot contain special characters",
      })
      .status(400);
  } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    return res
      .json({
        success: false,
        message: "Please enter a valid email address",
      })
      .status(400);
  } else if (passLen > 72) {
    // password cannot be longer than 72 characters - bcrypt limitations
    return res
      .json({
        success: false,
        message: "Password too long",
      })
      .status(400);
  } else if (passLen < 8) {
    return res
      .json({
        success: false,
        message: "Password cannot be shorter than 8 characters",
      })
      .status(400);
  }

  accountsDB.getAccountByUsername(username, async function (err, value) {
    // check if user exists - prevent crashing when invalid user is entered
    if (value.length == 0) {
      return res
        .json({
          success: false,
          message: "Invalid User",
        })
        .status(400);
    }
    const user = value[0];

    // check if password is correct before proceeding
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res
        .json({
          success: false,
          message: "Incorrect password",
        })
        .status(401);
    }

    // change username if Username is not empty and not the same as the current username
    if (newUsername !== "" && newUsername !== username) {
      // check if new username acceptable
      if (newUsername < 3) {
        return res
          .json({
            success: false,
            message: "Username must be at least 3 characters",
          })
          .status(400);
      }

      username = newUsername;
    }

    // likewise for password
    if (newPassword !== "" && newPassword !== password) {
      password = newPassword;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // update account details if any fields are not empty
    if (username !== "" || password !== "" || phone !== "" || email !== "") {
      const account = new Account(
        user.idAccount,
        username,
        hashedPassword,
        email,
        phone
      );

      try {
        accountsDB.updateAccount(account, function (err, value) {
          if (err) {
            res.json({
              success: false,
              message: "Error updating account",
              error: err.sqlMessage, // provide details Users to debug. Restrict details to prevent malicious attacks.
            });
          }

          res.json({
            success: true,
            message: "Account details updated",
            updated: account,
          });
        });
      } catch (err) {
        res.json({
          success: false,
          message: "Error updating account",
          error: err,
        });
      }
    } else {
      res.json({
        success: false,
        message: "No fields updated",
      });
    }
  });
}

async function deleteAccount(req, res) {
  const { username, password } = req.body;
  const { userId } = req;

  accountsDB.getAccountByUsername(username, async function (err, value) {
    // check if user exists
    if (value.length === 0) {
      return res
        .json({
          success: false,
          message: "Invalid User",
        })
        .status(400);
    }

    const user = value[0];

    if (user.idAccount !== userId) {
      return res
        .json({
          success: false,
          message: "This Account isn't yours.",
        })
        .status(401);
    }

    // check if password is correct before proceeding
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .json({
          success: false,
          message: "Incorrect password",
        })
        .status(401);
    }

    accountsDB.deleteAccount(userId, function (err, value) {
      if (err) {
        return res.json({
          success: false,
          message: "Error deleting account",
        });
      }

      res.json({
        success: true,
        message: "Account deleted",
      });
    });
  });
}

async function editProfilePicture(req, res) {
  const { userId } = req;
  const { picture } = req.body;

  accountsDB.uploadProfilePicture(picture, userId, function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Error updating profile picture",
        error: err.sqlMessage,
      });
    }

    res.json({
      success: true,
      message: "Profile picture updated",
    });
  });
}

async function userCount(req, res) {
  accountsDB.userCount(function (err, value) {
    if (err) {
      return res.json({
        success: false,
        message: "Error getting user count",
      });
    }

    res.json({
      count: value[0].count,
    });
  });
}

async function resetPassword1(req, res) {
  const { username, phone, email } = req.body;

  accountsDB.resetPassword1(username, phone, email, function (err, value) {
    if (value.length === 0) {
      return res.json({
        success: false,
        status: "info",
        message: "Invalid Credentials",
      });
    } else if (value.length === 1) {
      nodemailer.sendMail(
        value[0].email,
        `http://localhost:8080/Reset-Password/${value[0].username}/${value[0].password}/0`
      );

      return res.json({
        success: true,
        status: "success",
        message: "Reset password link sent to email",
        otp: `http://localhost:8080/Reset-Password/${value[0].username}/${value[0].password}/0`,
      });
    }
  });
}

async function resetPassword2(req, res) {
  const { username, token, password } = req.body;

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  var hashedPassword = await bcrypt.hash(password, 10);

  accountsDB.resetPassword2(
    hashedPassword,
    username,
    token,
    function (err, value) {
      if (value.affectedRows === 1) {
        return res.json({
          success: true,
          message: "Password has been reset!",
        });
      } else {
        return res.json({
          success: false,
          message: "Password reset failed",
        });
      }
    }
  );
}

module.exports = {
  addAccount,
  login,
  viewAccount,
  updateAccount,
  deleteAccount,
  editProfilePicture,
  userCount,
  resetPassword1,
  resetPassword2,
};
