const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  quantity: { type: Number, required: true }, // Ensure quantity is required
  totalCalories: { type: Number },
});

const foodSchema = new mongoose.Schema({
  barcode_id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  calories: { type: Number, default: 0 }, // Total calories for the food
  nutrients: {
    protein: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
  },
  ingredients: [ingredientSchema], // Embedded ingredients
});

// Calculate total calories based on ingredients
foodSchema.methods.calculateCalories = function () {
  let totalCalories = 0;
  this.ingredients.forEach((ingredient) => {
    totalCalories += ingredient.calories;
  });
  this.calories = totalCalories;
};

module.exports = mongoose.model("Food", foodSchema);
