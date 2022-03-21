const express = require("express");

const registerController = require("./../controllers/registerController");
const router = express.Router();

const { initialSetupOnly } = require("./../middlewares/initialSetupMiddleware");

router.post("/", registerController.create_account);

router.get("/", initialSetupOnly, (req, res) => {
    var errors = [];
    req.session.errors ? (errors = req.session.errors) : (errors = []);
    req.session.errors = [];

    res.render("registration", { errors });
});

module.exports = router;
