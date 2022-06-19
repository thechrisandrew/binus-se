const express = require("express");
const staffController = require("../controllers/staffController");
const router = express.Router();

const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/create", requireAuth, staffController.createStaff);
router.post("/update", requireAuth, staffController.updateStaff);
router.post("/delete/:id", requireAuth, staffController.deleteStaff);
router.get("/user", requireAuth, staffController.selectOneUser);
router.get("/", requireAuth, staffController.selectStaff);

module.exports = router;
