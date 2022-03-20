const Joi = require("joi");
const bcrypt = require("bcrypt");
const user = require("../models/user");


module.exports = {
    create_account : async (req, res) => {
        
        const schema = Joi.object({
            email           : Joi.string().email(),
            password        : Joi.string().min(8),
            confirmPassword : Joi.any().valid(Joi.ref('password')).required().options({ messages: { 'string.confirmPassword': 'password does not match'} }),
            firstName       : Joi.string().required(),
            lastName        : Joi.string().required(),
            roleId          : Joi.number().required(),
        });

        const validate = schema.validate({
            email           : req.body.email,
            password        : req.body.password,
            confirmPassword : req.body.confirmPassword,
            firstName       : req.body.firstName,
            lastName        : req.body.lastName,
            roleId          : 1,
        });

        const validData = validate["value"];
        const errorData = validate["error"];
        const hashedPassword = await bcrypt.hash(validData.password, 10);
        
        const data = {
            email           : validData.email,
            password        : hashedPassword,
            firstName       : validData.firstName,
            lastName        : validData.lastName,
            roleId          : 1,
        };

        const checkRedudancyEmail = await user.checkEmail(data) != "";
        if(errorData || checkRedudancyEmail){
            // Biar mengikuti hasil dari joi
            const message = {
                "error" : {
                    "details" : [
                        {
                            "message" : "Email must be unique!"
                        }
                    ]
                } 
            }
            
            // res.send(checkRedudancyEmail ? message["error"]["details"][0]["message"] : validate["error"]["details"][0]["message"]);
            req.session.error = checkRedudancyEmail ? message["error"]["details"][0]["message"] : validate["error"]["details"][0]["message"]
            res.redirect('/auth/register')
        }else{
            try{
                const result = await user.create(data);
                // res.send(result);
                // res.send("Test");
                res.redirect('/auth/login')
            }catch(err){
                console.log("ERROR : " + err);
                // res.send("Something went wrong!" + err);
                req.session.error = "Something went wrong"
                res.redirect('/auth/register')
            }    
        }
    }
};