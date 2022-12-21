const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 32
  }
}, { timestamps: true })


module.exports = mongoose.model("Category", CategorySchema)