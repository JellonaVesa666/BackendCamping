const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 32
  },
  email: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 32
  },
  phoneNumber: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    trim: true,
    maxlenght: 32
  },
  
  postalCode: {
    type: String,
    trim: true,
    maxlenght: 32
  },
  city: {
    type: String,
    trim: true,
    maxlenght: 32
  },
  bankAccNumber: {
    type: String,
    trim: true,
    maxlenght: 32
  },
  about: {
    type: String,
    trim: true,
  },
  salt: {
    type: String
  },
  history: {
    type: Array,
    default: []
  }
}, { timestamps: true })


module.exports = mongoose.model("User", UserSchema)