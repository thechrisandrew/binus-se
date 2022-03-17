const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const data = {
				email: email,
				password: password,
			};

			if (!email || !password) {
				return res.status(400).render("login");
			}

			const queryResult = await user.auth(data);

			if (queryResult == "") {
				res.send("Email or Password is incorrect!");
			} else {
				if (!(await bcrypt.compare(data.password, queryResult[0].password))) {
					res.status(401).render("login");
				} else {
					const id = queryResult[0].id;
					const token = jwt.sign({ id }, process.env.JWT_KEY, {
						expiresIn: process.env.JWT_EXPIRES_IN,
					});

					const cookieOptions = {
						expires: new Date(
							Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
						),
						httpOnly: true,
					};
					res.cookie("jwt", token, cookieOptions);
					res.status(200).redirect("/");
				}
			}
		} catch (err) {
			console.log(err);
		}
	},
};
