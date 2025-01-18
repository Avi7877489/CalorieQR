const Food = require("../models/Food"); // Assuming this is your food model

// Controller function to handle fetching the food by barcode_id
const getDishCalories = async (req, res) => {
  try {
    // Get the barcode_id from the request parameters
    const { barcode_id } = req.params;

    // Search for the food item by barcode_id
    const foodItem = await Food.findOne({ barcode_id });

    if (!foodItem) {
      // If food item not found, send a 404 response
      return res.status(404).json({ message: "Food item not found" });
    }

    // If food item is found, return the food details along with calories
    return res.status(200).json({
      name: foodItem.name,
      calories: foodItem.calories,
      nutrients: foodItem.nutrients,
    });
  } catch (error) {
    // If an error occurs, send a 500 response
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateFoodByBarcode = async (req, res) => {
    try {
      const { barcode_id } = req.params;
      const { name, calories, nutrients } = req.body;
  
      // Find and update food item by barcode_id
      const food = await Food.findOneAndUpdate(
        { barcode_id },
        { name, calories, nutrients },
        { new: true, upsert: true } // `upsert: true` will create a new document if not found
      );
  
      if (!food) {
        return res.status(404).json({ message: "Food item not found" });
      }
  
      res.status(200).json({ message: "Food updated successfully", food });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
module.exports = { getDishCalories,updateFoodByBarcode };
