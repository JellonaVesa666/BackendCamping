//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { runValidation, userRegisterValidator } = require('../controllers/validationController');
const { Register, Login, Logout } = require("../controllers/authController");


//---Routes---//
// initialize
router.post("/register", userRegisterValidator, runValidation, Register);
router.post("/login", Login);
router.get("/logout", Logout);


//---Routes---//
// export to server.js
module.exports = router;