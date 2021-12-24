
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User= require('../../src/Models/User');
var bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/../../config/.env'});

const key= process.env.secretKey;

router.post("/", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      console.log(req.body);
      const { username,first_name, last_name, email, password, passport, home_address, country_code, mobile_number } = req.body;
  
      // Validate user input
      if (!(username&& email&& password&& first_name&& last_name&& passport&& home_address&& country_code&& mobile_number)) {
        return res.status(400).json({msgSrc:"missing input",msg:"All input is required"});
      }else{
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ username });
  
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
        username: username.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        passport: passport,
        home_address: home_address,
        country_code: country_code,
        mobile_number: mobile_number
      });
  
      // Create token

      const token = await jwt.sign(
        { user_id: user._id, username },
        key
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