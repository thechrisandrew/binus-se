const Joi = require("joi");
const bcrypt = require("bcrypt");
const user = require("../models/user");

module.exports = {
    createStaff: async function (req, res){
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
			roleId: 2,
		});

        const validData = validate["value"];
		const errorData = validate["error"];
		const hashedPassword = await bcrypt.hash(validData.password, 10);

		const data = {
			email: validData.email,
			password: hashedPassword,
			firstName: validData.firstName,
			lastName: validData.lastName,
			roleId: 2,
		};

		const checkRedudancyEmail = (await user.checkEmail(data)) != "";

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
			res.status(400).send(checkRedudancyEmail ? message : validate);
		} else {

			try {
				await user.create(data);
				res.status(200).send({message : "Successfully registered staff!"});
			} catch (err) {
				// console.log("ERROR : " + err);
				res.status(500).send({message : err});
			}
		}
    },

    selectStaff: async function (_, res) {
        try{
            const result = await user.selectStaffOnly();
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send({message : err});
        }
    },

    updateStaff: async function (req, res) {
        const data = {
            id      : req.params.id,
            key     : req.body.key,
            value   : req.body.value
        };
        try{
            await user.updateStaff(data);
            res.status(200).send({message : "Successfully updated staff!"});
        } catch (err) {
            res.status(500).send({message : err});
        }
    },

    deleteStaff: async function(req, res) {
        const id = req.params.id;
        try{
            await user.delete(id);
            res.status(200).send({message : "Successfully deleted staff!"});
        } catch (err) {
            res.status(500).send({message : err});
        }
    }
};