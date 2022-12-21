//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { CreateProduct, ProductById, GetProduct, ReleatedProducts, GetCategories, GetProducts, SearchProducts, DeleteProduct, UpdateProduct } = require("../controllers/productController");
const { RequireSignin, IsAuth, IsAdmin } = require("../controllers/authController");
const { UserById } = require("../controllers/userController");


//---Route---//
// Parameters
router.param("userId", UserById); // Any time there is parameter userId execute UserById function from userController
router.param("productId", ProductById); // Any time there is parameter userId execute productById function from productController


//---Routes---//
// initialize
router.get("/products", GetProducts);

router.get("/products/categories/", GetCategories);

router.get("/product/:productId", GetProduct);  // ":productId" router parameter

router.post("/products/by/search", SearchProducts);

router.get("/products/releated/:productId", ReleatedProducts);  // ":productId" router parameter, required to excluded current product

router.post('/product/create/:userId', RequireSignin, IsAuth, IsAdmin, CreateProduct); // ":userID" router parameter, required for admin authorization

router.delete("/product/:productId/:userId", RequireSignin, IsAuth, IsAdmin, DeleteProduct); // ":productId" router parameter, required to specify product
                                                                                             // ":userID" router parameter, required for admin authorization
                                                                                             
router.put("/product/:productId/:userId", RequireSignin, IsAuth, IsAdmin, UpdateProduct); // ":productId" router parameter, required to specify product
                                                                                          // ":userID" router parameter, required for admin authorization


//---Routes---//
// export to server.js
module.exports = router;