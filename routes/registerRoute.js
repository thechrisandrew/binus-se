const express = require("express");

const registerController = require("./../controllers/registerController");
const router = express.Router();

const { initialSetupOnly } = require("./../middlewares/initialSetupMiddleware");

router.post("/", registerController.create_account);

module.exports = router;
