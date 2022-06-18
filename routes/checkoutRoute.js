const express = require("express");
const checkoutController = require("../controllers/checkoutController");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.listProduct);
router.post("/", checkoutController.createCheckout);

module.exports = router;
