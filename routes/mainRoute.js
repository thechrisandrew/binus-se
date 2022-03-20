const express = require("express");
const router = express.Router();

const { requireAuth } = require("./../middlewares/authMiddleware");

router.get("/", requireAuth, (req, res) => {
	res.render("dashboard");
});

module.exports = router;
