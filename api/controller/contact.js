const { deleteModel } = require("mongoose");
const Contact = require("../models/Contact");

const errorCatcher = (error, res) => {
  console.log(error);
  res.status(500).json({
    error,
    message: "error encountered!",
  });
};

const getAllContacts = (req, res, next) => {
  Contact.find()
    .then((contacts) => {
      res.status(200).json({
        message: "all contacts",
        contacts,
      });
    })
    .catch((error) => errorCatcher(error, res));
};

const postContact = (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  contact
    .save()
    .then((data) => {
      res.status(201).json({
        message: "data saved",
        cotact: data,
      });
    })
    .catch((error) => errorCatcher(error, res));
};

const getContctById = (req, res, next) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "found",
          data,
        });
      } else {
        res.status(204).json({
          message: "No data",
        });
      }
    })
    .catch((error) => errorCatcher(error, res));
};

const updateContactById = (req, res, next) => {
  const id = req.params.id;
  //   console.log(req.body);
  const updates = req.body;
  Contact.findById(id)
    .then((data) => {
      if (data) {
        Object.assign(data, updates);
        data.save();
        res.status(200).json({ message: "updated!", contact: data });
      } else {
        res.status(204).json({ message: "no data" });
      }
    })
    .catch((error) => errorCatcher(error, res));
};

const deleteContactById = (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;
  Contact.findByIdAndDelete(id)
    .then((deletedContact) => {
      if (deletedContact) {
        res.status(200).json({
          message: "contact deleted successfully",
          contact: deletedContact,
        });
      } else {
        res.status(204).json({
          messge: "no contact by given id ",
        });
      }
    })
    .catch((error) => errorCatcher(error, res));
};

//   .then(data)
//       } else {
//         res.status(404).json({
//           message: "contact not found!",
//         });
//       }
//     })
//     .catch((error) => errorCatcher(error, res));

module.exports = {
  getAllContacts,
  postContact,
  getContctById,
  updateContactById,
  deleteContactById,
};
