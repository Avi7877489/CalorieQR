const Dish = require("../models/Dish");

const addDish = async (req, res) => {
  try {
    const { dishName, barcodeId, items, totalCalories } = req.body;

    const newDish = new Dish({ dishName, barcodeId, items, totalCalories });
    await newDish.save();

    res.status(201).json({ success: true, data: newDish });
  } catch (error) {
    console.error("Error adding dish:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    console.error("Error fetching dishes:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDishesById = async (req, res) => {
    try {
      const dishId = req.params.id;  // Get the 'id' from the URL parameter
      const dish = await Dish.findById(dishId); // Query the database for the dish by ID
      
      // Check if the dish is found
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      
      // Return the dish if found
      res.status(200).json(dish);
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = { addDish, getDishes, getDishesById };
