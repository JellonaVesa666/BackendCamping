//---Express---//
// import
const express = require('express');
const router = express.Router();


//---Functions---//
// import
const { RequireSignin, IsAuth, IsAdmin } = require("../controllers/authController");
const { UserById, GetUser, UpdateUser, GetAllUsers, DeleteUser, GetFilteredUsers } = require("../controllers/userController");


//---Route---//
// Parameters
router.param("userId", UserById); // Any time there is parameter userId execute UserById function from userController


//---Routes---//
// initialize
router.get('/token/:userId', RequireSignin, IsAuth, IsAdmin, (req, res) => { // ":userID" router parameter, required for admin authorization
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", RequireSignin, IsAuth, IsAdmin, GetUser) // ":userID" router parameter, required for admin authorization

router.put("/user/update", UpdateUser) // ":userID" router parameter, required for admin authorization

router.get("/users", GetAllUsers)

router.delete("/user/delete", DeleteUser)

router.get("/filteredusers", GetFilteredUsers)


//---Routes---//
// export to server.js
module.exports = router;