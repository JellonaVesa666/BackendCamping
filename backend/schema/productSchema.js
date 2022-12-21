const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 32
  },
  description: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 2000
  },
  price: {
    type: Number,
    trim: true,
    require: true,
    maxlenght: 32
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  shipping: {
    require: false,
    type: Boolean
  }
}, { timestamps: true })


module.exports = mongoose.model("Product", ProductSchema)