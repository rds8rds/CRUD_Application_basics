const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: false,
    validate: {
      validator: (v) => {
        return validator.isEmail(v);
      },
      message: `{VALUE} is not an email`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
