const express = require("express");
const staffController = require("../controllers/staffController");
const router = express.Router();

router.post("/create", staffController.createStaff);
router.post("/update/:id", staffController.updateStaff);
router.post("/delete/:id", staffController.deleteStaff);
router.get("/", staffController.selectStaff);

module.exports = router;