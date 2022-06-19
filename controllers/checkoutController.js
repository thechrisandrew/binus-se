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
			var checkProductStock = await Promise.all(req.body.data.map(async (data) => {
				// console.log(data.quantity);
				let result = await product.getProductStock(data);
				
				
				if(result[0].productStock < data.quantity){
					return true;
				}
				
			}, false));
			if(checkProductStock.includes(true)){
				res.status(400).send("Product stock is not enough!");
			}else{
				const headerResult = await checkout.createCheckoutHeader(id);
				// console.log(headerResult.insertId);
				req.body.data.map((data) => {
					console.log(data.productId);
					checkout.createCheckoutDetail(data, headerResult.insertId);
					product.updateStockProduct(data);
				});
				res.status(200).send("Checkout successfully created");
			}
		} catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong!");
		}
	},
};
