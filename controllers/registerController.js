const Joi = require("joi");
const bcrypt = require("bcrypt");
const user = require("../models/user");

module.exports = {
	create_account: async (req, res) => {
		const schema = Joi.object({
			email: Joi.string().email(),
			password: Joi.string().min(8),
			confirmPassword: Joi.any()
				.valid(Joi.ref("password"))
				.required()
				.options({ messages: { "string.confirmPassword": "password does not match" } }),
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			roleId: Joi.number().required(),
		});

		const validate = schema.validate({
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			roleId: 1,
		});

		const validData = validate["value"];
		const errorData = validate["error"];
		const hashedPassword = await bcrypt.hash(validData.password, 10);

		const data = {
			email: validData.email,
			password: hashedPassword,
			firstName: validData.firstName,
			lastName: validData.lastName,
			roleId: 1,
		};

		const checkRedudancyEmail = (await user.checkEmail(data)) != "";

        var toast = {
            messages: []
        };

		if (errorData || checkRedudancyEmail) {
			// Biar mengikuti hasil dari joi
			const message = {
				error: {
					details: [
						{
							message: "Email must be unique!",
						},
					],
				},
			};
			res.status(400);
			res.send(checkRedudancyEmail ? message : validate);
		} else {

			try {
				const result = await user.create(data);
                req.session.toast = toast;
				res.status(200);
                res.send({message : "Successfully registered user!"});
			} catch (err) {
				console.log("ERROR : " + err);
				res.status(500);
				res.send({message : err});
			}
		}
	},
};
