// importing express into express variable alternative to import command
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contacts-db");
const db = mongoose.connection;

// Handle connection errors
db.on("error", (err) => {
  console.error("Connection error:", err);
});

// Handle successful connection
db.once("open", () => {
  console.log("Database Connection Established");
});

const demoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Demo = mongoose.model("Demo", demoSchema);

// enables us to pass routing request to subfiles
const contactRoute = require("./api/routes/contact");

// console.log(express);
const app = express(); // create app vaible containg exprss intializer
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000; // setting ports

// app.use((req, res, next) => {
//   console.log("I'm a middleware function");
//   next();
// });

app.use("/api/contacts", contactRoute);

// setting route command for '/' address; get takes two perametes {address, callback func}, callback func takes two perameters {req, res}, we set the response to be hello world!
app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.get("/demo", (req, res) => {
  const demo = new Demo({
    name: "HM Nayem",
    phone: "01789222222",
  });

  demo
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => console.log(err));
});

app.get("/get", (req, res) => {
  Demo.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => res.send("<h1>I'm a post page </h1>"));

// app.get("/api/contacts", (req, res) => {
//   res.json(contacts); // sending json file
// });

// app.post("/api/contacts", (req, res) =>
//   res.json({
//     message: `I am post method`,
//   })
// );

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
