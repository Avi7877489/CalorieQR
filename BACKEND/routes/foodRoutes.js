const express = require("express");

const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
  addIngredient,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/", createFood);
router.get("/", getFoods);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);
router.post("/:id/ingredients", addIngredient);

module.exports = router;



