const user = require('./../models/user')

const initialSetupOnly = async (req,res,next) => {

    const queryResult = await user.checkUserExists();

    if (queryResult == "") {
        next();
	} else {

        req.session.errors = ['Admin user is already registered']

		res.redirect("/auth/login");
	}
}

module.exports = { initialSetupOnly };