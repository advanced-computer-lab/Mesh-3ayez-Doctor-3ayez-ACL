
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User= require('../../src/Models/User');
var bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
router.post("/", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      console.log(req.body);
      const { username,first_name, last_name, email, password, passport } = req.body;
  
      // Validate user input
      if (!(username && email && password && first_name && last_name)) {
        return res.status(400).json({msgSrc:"missing input",msg:"All input is required"});
      }else{
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(400).json({msgSrc:"taken",msg:"User already exists. Please Login"});
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        username: username, // sanitize: convert email to lowercase
        password: encryptedPassword,
        passport: passport,
      });
  
      // Create token

      const token = await jwt.sign(
        { user_id: user._id, email },
        "secretKey"
      );
      // save user token

      // return new user
      res.status(200).json({token:token,user:user});
      }
    } catch (err) {
      console.log(err);
    }
  
    // Our register logic ends here
  });

module.exports = router;