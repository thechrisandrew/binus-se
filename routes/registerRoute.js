const express = require("express");

const registerController = require("./../controllers/registerController");
const router = express.Router();

router.post("/", registerController.create_account);

router.get("/", (req, res) => {
    console.log(req.session);

    var error;
    req.session.error ? (error = req.session.error) : (error = null);
    req.session.error = "";

    res.render("registration", { error });
});

module.exports = router;
