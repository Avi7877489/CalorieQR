const Food = require("../models/Food");

// Controller to create a food item
const createFood = async (req, res) => {
  try {
    const { barcode_id, name, calories, nutrients } = req.body;
    if (!barcode_id || !name) {
      return res.status(400).json({ message: "Barcode ID and name are required." });
    }

    const newFood = new Food({
      barcode_id,
      name,
      calories,
      nutrients,
    });

    await newFood.save();
    res.status(201).json({ message: "Food created successfully", newFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all food items
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to update a food item by ID
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { barcode_id, name, calories, nutrients } = req.body;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.barcode_id = barcode_id || food.barcode_id;
    food.name = name || food.name;
    food.calories = calories || food.calories;
    food.nutrients = nutrients || food.nutrients;

    const updatedFood = await food.save();
    res.status(200).json({ message: "Food updated successfully", updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a food item by ID
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function to add an ingredient
const addIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, calories, quantity } = req.body;

    if (!name || calories == null || quantity == null) {
      return res.status(400).json({ message: "Name, calories, and quantity are required." });
    }

    const foodItem = await Food.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }

    const totalCalories = calories * quantity;

    const ingredient = {
      name,
      calories,
      quantity,
      totalCalories,
    };

    foodItem.ingredients.push(ingredient);
    foodItem.calories = foodItem.ingredients.reduce(
      (acc, ing) => acc + ing.totalCalories,
      0
    );

    const updatedFood = await foodItem.save();

    res.status(201).json({
      message: "Ingredient added successfully.",
      updatedFood,
    });
  } catch (error) {
    console.error("Error adding ingredient:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createFood, getFoods, updateFood, deleteFood, addIngredient };
