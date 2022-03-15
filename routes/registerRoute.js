const express = require("express");

const registerController = require("./../controllers/registerController");
const router = express.Router();

router.post("/", registerController.create_account);


router.get("/", (req, res) => {
	res.render("registration");
});


module.exports = router;
