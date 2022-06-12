const express = require("express");

const registerController = require("./../controllers/registerController");
const router = express.Router();

const { initialSetupOnly } = require("./../middlewares/initialSetupMiddleware");

router.post("/", registerController.create_account);

router.get("/", initialSetupOnly, (req, res) => {
	var toast = {};
	req.session.toast ? (toast = req.session.toast) : (toast = {});
	req.session.toast = {};

	res.render("registration", {toast});
});

module.exports = router;
