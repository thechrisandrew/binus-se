const express = require("express");
const checkoutController = require("../controllers/checkoutController");
const productController = require("../controllers/productController");
const router = express.Router();

const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", requireAuth, productController.listProduct);
router.post("/", requireAuth, checkoutController.createCheckout);

module.exports = router;
