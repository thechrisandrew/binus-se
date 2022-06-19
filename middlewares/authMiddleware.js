const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
	const token = req.headers.token;

	// console.log(token);

	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
			if (err) {
				console.log("invalid token or expired");
				console.log(err);
				res.status("401").send({ message: "invalid" });
			} else {
				// console.log(decodedToken);
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		console.log("request done without token");
		res.status("401").send({ message: "invalid" });
		// res.redirect("/auth/login");
	}
};

module.exports = { requireAuth };
