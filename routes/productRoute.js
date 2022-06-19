const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/:productId", requireAuth, productController.describeProduct);
router.get("/", requireAuth, productController.listProduct);
router.post("/", requireAuth, productController.createProduct);
router.post("/update/:productId", requireAuth, productController.updateProduct);
router.post("/delete/:productId", requireAuth, productController.deleteProduct);

module.exports = router;
