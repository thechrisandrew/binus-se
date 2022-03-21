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

			var toast = {
                messages: []
            }

			if (!email || !password) {
				toast.messages.push({content: "Email/Password can't be empty", type: "error"})
				req.session.toast = toast
				res.status(400).redirect("/auth/login");
			}

			const queryResult = await user.auth(data);

			if (queryResult == "") {
				toast.messages.push({content: "Email/Password incorrect" , type: "error"})
				req.session.toast = toast
				res.status(400).redirect("/auth/login");
			} else {
				if (!(await bcrypt.compare(data.password, queryResult[0].password))) {
					toast.messages.push({content: "Email/Password incorrect" , type: "error"})
					req.session.toast = toast
					res.status(400).redirect("/auth/login");
				} else {
					const id = queryResult[0].id;

					const jwtexp = parseInt(process.env.JWT_EXPIRES);

					const token = jwt.sign(
						{
							id: id,
							exp: Math.floor(Date.now() / 1000) + jwtexp,
						},
						process.env.JWT_KEY
					);

					const cookieOptions = {
						expires: new Date(Date.now() + jwtexp * 24 * 60 * 60 * 1000),
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
