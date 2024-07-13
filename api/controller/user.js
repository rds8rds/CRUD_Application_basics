const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errHandler = (err, res) => {
  console.log(err);
  res.status(500).json({
    message: "error encountered!",
    err,
  });
};

const loginController = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          // uses callback function;
          console.log(result);
          if (err) {
            errHandler(err, res);
          } else {
            if (result) {
              // give token to the user
              // do not use var;
              let token = jwt.sign(
                {
                  email: user.email,
                  _id: user._id,
                },
                "SECRET",
                { expiresIn: "2h" }
              );

              res.json({
                message: "login success!",
                token,
              });
            } else {
              res.json({
                message: "login Failed!",
              });
            }
          }
        });
      } else {
        res.json({
          message: "user  not found! sorry",
        });
      }
    })
    .catch(errHandler);
};

const signupController = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
        .save()
        .then((savedUser) =>
          res.json({
            message: "user saved!",
          })
        )
        .catch(errHandler);
    }
  });
};

const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "all users",
        data: users,
      });
    })
    .catch(errHandler);
};

module.exports = {
  signupController,
  getAllUsers,
  loginController,
};
