const express = require("express");
const userController = require("../controllers/loginController");
const router = express.Router();

router.post("/", userController.login);

router.get("/", (req, res) => {
    var errors = [];
    req.session.errors ? (errors = req.session.errors) : (errors = []);
    req.session.errors = [];

    res.render("login", {errors});
});

module.exports = router;
