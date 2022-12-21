//---Schema---//
// import
const Cabin = require("../schema/cabinSchema")
const CabinList = require("../schema/cabinListSchema");
const { response } = require("express");
const ObjectId = require('mongodb').ObjectId;

// Create Cabin from req.body
exports.CreateCabin = (req, res) => {
  const cabin = new Cabin(req.body)
  Cabin.findOne({ name: cabin.name }).exec((error, data) => {
    if (error) {
      return res.json(error);
    }
    else {
      if (data)
        return res.json({ error: "Cabin with this name already exists" });
      else {
        // Updates cabinList array in the database when cabin is added
        CabinList.findByIdAndUpdate({ _id: cabin.listId }, { $push: { cabins: cabin } }, (error, success) => {
          if (error) {
            //console.log(error);
            res.json({ error: error });
          }
          else {
            cabin.save()
            //console.log(success);
            res.json({ success: success });
          }
        });
      }
    }
  })
}

// Update Cabin Status from req.body
exports.UpdateCabinStatus = (req, res) => {
  //console.log(req);
  const bulkOps = req.body.map(update => ({
    updateOne: {
      filter: { _id: update._id },
      // Where field is the field you want to update
      update: { status: 3 },
      upsert: true,
    }
  }))
  // where Model is the name of your model
  Cabin.bulkWrite(bulkOps)
    .then(data => res.json(data))
    .catch(error => res.json(error));
}

// Update Cabin from req.body
exports.UpdateCabin = (req, res) => {

  const cabin = new Cabin(req.body)
  Cabin.findByIdAndUpdate({ _id: cabin._id }, cabin, { new: true })
    .then(response => res.json(response))
    .catch(error => res.json(error));
}

// Get Cabins by their ids
exports.GetCabinsById = (req, res) => {
  var ids = req.cabinList.cabins;
  var cabinIds = ids.map(function (id) { return ObjectId(id); });
  Cabin.find({ _id: { $in: cabinIds } })
    .then(data => res.json(data))
    .catch(error => res.json(error));
};

// Get Cabin by id
exports.GetCabinById = (req, res) => {
  console.log(req.params.cabinId)
  Cabin.findOne({ _id: req.params.cabinId })
    .then(data => res.json(data))
    .catch(error => res.json(error));
};

exports.GetAllCabins = (req, res) => {
  Cabin.find()
    .then(data => res.json(data))
    .catch(error => res.status(400).json({ error }));
}

// Delete category by categoryId
exports.DeleteCabin = (req, res,) => {
  Promise.all([
    CabinList.updateOne({ _id: req.body.listId }, { $pull: { cabins: { _id: req.body._id } } }, { safe: true, multi: false }),
    Cabin.findByIdAndRemove({ _id: req.body._id })
  ])
    .then(data => res.json(data))
    .catch(error => res.status(400).json({ error }));
};