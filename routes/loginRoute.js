const express = require("express");
const userController = require("../controllers/loginController");
const router = express.Router();

router.post("/", userController.login);

router.get("/", (req, res) => {
    res.render("login");
});

module.exports = router;
