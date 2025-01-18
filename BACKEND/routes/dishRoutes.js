const express = require("express");
const { addDish, getDishes, getDishesById} = require("../controllers/dishesController");
const router = express.Router();

router.post("/", addDish);
router.get("/", getDishes);
router.get("/:id", getDishesById);

module.exports = router;
