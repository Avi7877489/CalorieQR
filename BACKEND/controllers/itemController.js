const Item = require("../models/Item");

// Controller to create an item
const createItem = async (req, res) => {
  try {
    const { name, calories } = req.body;

    // Validate input
    if (!name || !calories) {
      return res.status(400).json({ message: "Name and calories are required" });
    }

    // Create and save item
    const newItem = await Item.create({ name, calories });
    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to update an item by ID
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, calories } = req.body;

    // Check if item exists
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item fields
    item.name = name || item.name;
    item.calories = calories || item.calories;

    // Save updated item
    const updatedItem = await item.save();
    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete an item by ID
const deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Use findByIdAndDelete instead of remove
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
module.exports = { createItem, getItems, updateItem, deleteItem };
