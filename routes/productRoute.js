const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/:productId", productController.describeProduct);
router.get("/", productController.listProduct);
router.post("/", productController.createProduct);
router.post("/update/:productId", productController.updateProduct);
router.post("/delete/:productId", productController.deleteProduct);

module.exports = router;
