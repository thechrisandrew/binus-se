const user = require('./../models/user')

const initialSetupOnly = async (req,res,next) => {

    const queryResult = await user.checkUserExists();

    if (queryResult == "") {
        next();
	} else {
        req.session.toast = {
            messages: [{content: 'Admin user is already registered', type: "error"}],
        }
		res.redirect("/auth/login");
	}
}

module.exports = { initialSetupOnly };