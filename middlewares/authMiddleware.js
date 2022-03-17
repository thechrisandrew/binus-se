const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.redirect("/auth/login");
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect("/auth/login");
	}
};

module.exports = { requireAuth };
