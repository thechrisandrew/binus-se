const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/", userController.login);

router.get("/", (req, res) => {
    res.render("login");
});

module.exports = router;
