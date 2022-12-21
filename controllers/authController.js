//---Token system---//
// import
const jwt = require("jsonwebtoken"); // Generate signin token
var { expressjwt: expressJwt } = require("express-jwt");


//---Error system---//
// import
const { errorHandler } = require("../helpers/dbErrorHandler");


//---UUID system---//
// import
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');


//---Schema---//
// import
const User = require("../schema/userSchema");
/* const { Console } = require("console"); */


//---Functions---//
// export

exports.Register = async (req, res) => {
  await User.findOne({ email: req.body.email }) // Checks if user email already exists in the database
    .then((userExists) => {
      if (userExists) {
        console.log("Email already exists");
        return res.status(422).json({
          error: "Email already exists"
        });
      }
      const SetUserData = () => {
        let salt = uuidv1(); // Creates salt encryption key
        const user = new User({ // Initialize new user
          fullName: req.body.fullName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: crypto.createHmac("sha1", salt).update(req.body.password).digest("hex"), //Ecnrypts req.body.password with generated salt
          role: req.body.role,
          address: req.body.address,
          postalCode: req.body.postalCode,
          city: req.body.city,
          bankAccNumber: req.body.bankAccNumber,
          salt: salt
        });
        return user;
      }
      
      const user = SetUserData(); // Creates user by calling SetUserData function 
      user.save(async (error, user) => { // Saves new user to database
        if (error) {
          return res.status(400).json({
            error: errorHandler(error)
          });
        }
        res.json({
          user
        })
      })
    })

  
}

exports.Login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User does not exist"
      });
    }
    // If user found match password and email
    // create authentication
    console.log(user.password);
    console.log(crypto.createHmac("sha1", user.salt).update(password).digest("hex"))
    if (user.password === crypto.createHmac("sha1", user.salt).update(password).digest("hex") &&
      user.email == email) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) // generate a signed token with user id and jwt_secret
      res.cookie("t", token, { expire: new Date() + 9999 });  // save the token as "t" in cookie with expiry date
      const { _id, email, role } = user;  // return response with user and token to frontend client§
      return res.json({ token, user: { _id, email, role } })
    }
  })
}

exports.Logout = (req, res) => {

  res.clearCookie("t");
  res.json({ message: "Signout successful" })
}

exports.RequireSignin = expressJwt({ // Adds req.Auth to request
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
})

//
exports.IsAuth = (req, res, next) => {
/*   console.log(`
  req.profile: ${req.profile} \n
  req.auth: ${req.auth} \n
  req.profile._id: ${req.profile._id} \n
  req.auth._id: ${req.auth._id} \n
  `) */
  let user = req.profile && req.auth && req.profile._id == req.auth._id;  // req.profile is retrieved by userController.js, UserById function
  if (!user) {                                                            // req.auth is retrieved by RequireSignin function
    return res.status(403).json({                                         // and compare profile._id and auth_id ids 
      error: "Access denied"
    });
  }
  next();
}

// Check that req profile is admin
exports.IsAdmin = (req, res, next) => {
  if (req.profile.role != 0) { // If role is something else than admin
    return res.status(403).json({
      error: "Admin access denied, insufficient permissions"
    });
  }
  next();
}
