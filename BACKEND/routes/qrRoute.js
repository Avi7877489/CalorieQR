const express = require("express");
const router = express.Router();
const { getDishCalories,updateFoodByBarcode } = require('../controllers/qrController');

router.get("/:barcode_id", getDishCalories);
router.get("/:barcode_id", updateFoodByBarcode);


module.exports = router;
