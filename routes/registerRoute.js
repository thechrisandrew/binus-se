const express = require("express");
const registerController = require("./../controllers/registerController");
const router = express.Router();

router.post("/register", registerController.create_account);

module.exports = router;
