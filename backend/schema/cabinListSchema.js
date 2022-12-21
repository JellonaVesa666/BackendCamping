const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const CabinListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlenght: 32
  },
  cabins: [{
    cabinId: {
      type: { ObjectId },
      ref: 'Cabin'
    },
    title: {
      type: String
    },
    body: {
      type: String
    }
  }]
}, { timestamps: true })


module.exports = mongoose.model("CabinList", CabinListSchema)