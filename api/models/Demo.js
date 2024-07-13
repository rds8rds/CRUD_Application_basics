const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemoSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Demo = mongoose.model("Demo", DemoSchema);
module.exports = Demo;
