const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.get("/", transactionController.transactionHistory);

module.exports = router;