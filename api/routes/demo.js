const express = require("express");
const router = express.Router();
const demoController = require("../controller/demo");

router.get("/", demoController.getDemo);
router.post("/", demoController.postDemo);
router.get("/:id", demoController.getDemoById);
router.delete("/:id", demoController.deleteDemoById);

module.exports = router;
