const express = require("express");
const userController = require("../controllers/loginController");
const router = express.Router();

router.post("/", userController.login);

router.get("/", (req, res) => {
	var toast = {};
	req.session.toast ? (toast = req.session.toast) : (toast = {});
	req.session.toast = {};

	res.render("login", {toast});
});

module.exports = router;
