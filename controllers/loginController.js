const user = require("../models/user");
var flash = require("express-flash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO : 
// - benerin error handling
// - benerin bcrypt
// - benerin console.log

module.exports = {
    login: async (req, res) => {
        try {
            console.log(req.body);
            const {email, password} = req.body;
            const data = {
                email: email,
                password: password,
            };

            if (!email || !password) {
                flash("danger", "Email or Password cannot empty !");
                return res.status(400).render("login");
            }
            const queryResult = await user.auth(data);
            if (
                !queryResult ||
                !(await bcrypt.compare(data.password, queryResult[0].password))
            ) {
                flash("danger", "Email or Password is incorrect");
                res.status(401).render("login");
            } else {
                const id = queryResult[0].id;
                const token = jwt.sign({id}, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() +
                            process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true,
                };
                res.cookie("jwt", token, cookieOptions);
                flash("success", "You logged in successfully");
                res.status(200).redirect("/");
            }
        } catch (err) {
            console.log(err);
        }
    },
};
