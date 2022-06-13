const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.listProduct);
router.post("/", productController.createProduct);
router.post("/update/:id", productController.updateProduct);
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
