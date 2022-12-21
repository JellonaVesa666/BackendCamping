//---Schema---//
// import
const CabinList = require("../schema/cabinListSchema")
const ObjectId = require('mongodb').ObjectId;


exports.CabinListById = (req, res, next, listId) => {
  CabinList.findById(listId).exec((error, data) => {
    if (error) {
      res.status(400).json({ error: "Cabinlist not found" });
    }
    req.cabinList = data;
    next();
  })
};

// Create CabinList from req.body
exports.CreateCabinList = (req, res) => {
  const cabinList = new CabinList(req.body);
  cabinList.save((error, data) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.json(data);
  })
}

// Get all CabinLists
exports.GetCabinLists = (req, res) => {
  CabinList.find({}, { _id: 1, name: 1 }).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }
    return res.json(data);
  })
}

// Check that selected CabinList exists
exports.CabinListCheck = (req, res) => {
  CabinList.findById({ "_id": ObjectId(req.cabinList._id) }).exec((error, data) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (data.cabins.length != null) {
      return res.json(data);
    }
  });
};