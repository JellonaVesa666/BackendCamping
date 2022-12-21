const mongoose = require("mongoose");

const CabinSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  name: {
    type: String,
    trim: true,
    maxlenght: 32,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  startDate: {
    type: Date,
    trim: true,
    maxlenght: 32,
  },
  endDate: {
    type: Date,
    trim: true,
    maxlenght: 32,
  },
  occupant: {
    type: String,
    trim: true,
    maxlenght: 32,
  },
  slots: [
    {
      userName: String,
      slotId: Number,
      userId: Number,
      locked: Boolean,
    }
  ],
})

module.exports = mongoose.model("Cabin", CabinSchema)