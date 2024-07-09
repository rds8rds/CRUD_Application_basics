const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact");

// Get
router.get("/", contactController.getAllContacts);

// post
router.post("/", contactController.postContact);

// variable route ":" to make dynamic
router.get("/:id", contactController.getContctById);

// put
router.put("/:id", contactController.updateContactById);

//delete
router.delete("/:id", contactController.deleteContactById);

module.exports = router;
