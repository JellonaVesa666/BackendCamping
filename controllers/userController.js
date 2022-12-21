//---Schema---//
// import
const User = require("../schema/userSchema");

const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');


//---Functions---//
// export
exports.UserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    req.profile = user;
    next();
  });
};

// Get user by using userId
exports.GetUser = (req,res) => {
  //console.log(req.profile);
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

// Update user data from req.body by using userId
exports.UpdateUser = (req,res) => {
  console.log(req.body._id);
  let salt = uuidv1(); // Creates salt encryption key
  User.findByIdAndUpdate
  ({_id: req.body._id},
    { 
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: crypto.createHmac("sha1", salt).update(req.body.password).digest("hex"), //Ecnrypts req.body.password with generated salt
      role: req.body.role,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      bankAccNumber: req.body.bankAccNumber,
      salt,
    },
    {new: true},
    (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "No Authorization"
        })
      }
      res.json(user);
    }
  )
}

exports.GetAllUsers = (req,res) => {
  User.find().sort({"fullName": "1"}).exec((error,data) => {
    if(error) {
      return res.status(400).json({
        error
      });
    }
    // Sets password of all users to empty string so admin can't read hashed or not-hashed passwords in UI.
    data.map((item) => { 
      item.password = "";
    })
    console.log(data)
    return res.json(data);
  })
}

exports.DeleteUser = (req, res)=>{
  User.findByIdAndDelete({_id: req.body._id}, (error, removedUser)=>{
    if(error || removedUser === null){ // ei anna erroria vaikka käyttäjää ei löytyisi vaan palauttaa removedUser = null
      if(error !== null){
        return res.status(400).json({    
          error: error
        })
      }
      return res.status(400).json({
        error: "User doesn't exist"
      });
    }
    return res.json(removedUser);
    
  })
}

exports.GetFilteredUsers = (req, res) => {
  User.find({}, { _id: 1, fullName: 1, role: 1 }).exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    return res.json(data);
  })
}

exports.DeleteUser = (req, res)=>{
  User.findByIdAndDelete({_id: req.body._id}, (error, removedUser)=>{
    if(error || removedUser === null){ // ei anna erroria vaikka käyttäjää ei löytyisi vaan palauttaa removedUser = null
      if(error !== null){
        return res.status(400).json({    
          error: error
        })
      }
      return res.status(400).json({
        error: "User doesn't exist"
      });
    }
    return res.json(removedUser);
    
  })
}