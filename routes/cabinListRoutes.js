//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { CreateCabinList, GetCabinLists, CabinListCheck, CabinListById } = require("../controllers/cabinListController");


//---Route---//
// Parameters
router.param("cabinListId", CabinListById); // Any time there is parameter cabinListId execute CabinListById function from userController


//---Routes---//
// initialize
router.post("/cabinlist", CreateCabinList);

router.get("/cabinlists", GetCabinLists);

router.get("/cabinlist/:cabinListId", CabinListCheck);



//---Routes---//
// export to server.js
module.exports = router;