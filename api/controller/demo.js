const Demo = require("../models/Demo");
const { param } = require("../routes/contact");

const errHandler = (err, res) => {
  console.log(err);
  res.status(500).json({
    message: "error encountered!",
    error,
  });
};

const getDemo = (req, res, next) => {
  Demo.find()
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDemo = (req, res, next) => {
  const newDemo = new Demo({
    name: req.body.name,
    phone: req.body.phone,
  })
    .save()
    .then((savedData) => {
      res.status(200).json({
        message: "saved!",
        data: savedData,
      });
    })
    .catch((err) => errHandler(err, res));
};

const getDemoById = (req, res, next) => {
  const id = req.params.id;
  Demo.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        res.status(204).json({
          message: "not found!",
        });
      }
    })
    .catch(errHandler);
};

const deleteDemoById = (req, res, next) => {
  const id = req.params.id;
  Demo.findByIdAndDelete(id)
    .then((deletedData) => {
      res.status(200).json({
        deletedData,
      });
    })
    .catch(errHandler);
};

module.exports = {
  getDemo,
  postDemo,
  getDemoById,
  deleteDemoById,
};
