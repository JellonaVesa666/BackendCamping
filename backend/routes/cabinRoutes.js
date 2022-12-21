//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { CreateCabin, UpdateCabinStatus, UpdateCabin, DeleteCabin, GetCabinById, GetCabinsById, GetAllCabins } = require("../controllers/cabinController");
const { CabinListById } = require("../controllers/cabinListController");


//---Route---//
// Parameters
router.param("cabinListId", CabinListById); // Any time there is parameter cabinListId execute CabinListById function from userController


//---Routes---//
// initialize
router.post("/cabin", CreateCabin);

router.put("/cabin/update/status", UpdateCabinStatus);

router.put("/cabin/update", UpdateCabin);

router.delete("/cabin/delete", DeleteCabin)

router.get("/cabin/:cabinId", GetCabinById);

router.get("/cabins/:cabinListId", GetCabinsById);

router.get("/cabins", GetAllCabins);


//---Routes---//
// export to server.js
module.exports = router;