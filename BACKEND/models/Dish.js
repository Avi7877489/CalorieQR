const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Dish", dishSchema);
