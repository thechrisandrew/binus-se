const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("registration");
});

module.exports = router;