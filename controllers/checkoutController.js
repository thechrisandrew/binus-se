const checkout = require("../models/checkout");
const product = require("../models/product");

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
        try {
            const data = {
                id: req.body.id,
                productName: req.body.productName,
                quantity: req.body.quantity,
                price: req.body.price,
            };
            const result = await checkout.createCheckout(data);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
};
