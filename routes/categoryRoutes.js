//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { CreateCategory, CategoryById, GetCategory, GetCategories, DeleteCategory, UpdateCategory } = require("../controllers/categoryController");
const { RequireSignin, IsAuth, IsAdmin } = require("../controllers/authController");
const { UserById } = require("../controllers/userController");


//---Route---//
// Parameters
router.param("userId", UserById); // Any time there is parameter userId execute UserById function from userController
router.param("categoryId", CategoryById); // Any time there is parameter categoryId execute categoryId function from categoryController


//---Routes---//
// initialize
router.get("/categories", GetCategories);

router.get("/category/:categoryId", GetCategory); // ":categoryId" router parameter, needed for finding category from the database

router.post("/category/:userId", RequireSignin, IsAuth, IsAdmin, CreateCategory); // ":userID" router parameter, required for admin authorization

router.put("/category/:categoryId/:userId", RequireSignin, IsAuth, IsAdmin, UpdateCategory); // ":userID" router parameter, required for admin authorization
                                                                                             // ":categoryId" router parameter, needed for finding category from the database

router.delete("/category/:categoryId/:userId", RequireSignin, IsAuth, IsAdmin, DeleteCategory); // ":userID" router parameter, required for admin authorization


//---Routes---//
// export to server.js
module.exports = router;