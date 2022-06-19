const checkout = require("../models/checkout");
const product = require("../models/product");
const jwt = require("jsonwebtoken");

module.exports = {
	listProduct: async (req, res) => {
		try {
			const result = await product.listProduct();
			res.status(200).send(result);
		} catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong!");
		}
	},

	createCheckout: async (req, res) => {
		let id = req.decodedToken.id;

		try {
			const headerResult = await checkout.createCheckoutHeader(id);
			// console.log(headerResult.insertId);
			let detailResult = undefined;
			req.body.data.map((data) => {
				console.log(data.productId);
				detailResult = checkout.createCheckoutDetail(data, headerResult.insertId);
			});
			res.status(200).send("Checkout successfully created");
		} catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong!");
		}
	},
};
