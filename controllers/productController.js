const product = require("../models/product");

module.exports = {
    // ini kita buat function buat di panggil di route
    listProduct: async (req, res) => {
        try {
            const result = await product.listProduct(); // ini nama function di model
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },

    createProduct: async (req, res) => {
        try {
            const data = {
                id: req.body.id,
                productName: req.body.productName,
                quantity: req.body.quantity,
                price: req.body.price,
            };
            const result = await product.createProduct(data);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },

    updateProduct: async (req, res) => {
        try {
            const data = {
                id: req.params.id,
                key: req.body.key,
                value: req.body.value,
            };
            const result = await product.updateProduct(data);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const data = {
                id: req.params.id,
            };
            const result = await product.deleteProduct(data);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },
};
