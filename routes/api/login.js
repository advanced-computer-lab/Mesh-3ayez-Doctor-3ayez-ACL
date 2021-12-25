
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../../src/Models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/../../config/.env'});
const key= process.env.SECRETKEY;
router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input

    const { username, password } = req.body;
    

    // Validate user input
    if (!(username )) {
      res.status(400).json({msgSrc:"email",msg:"Username is required"});
    }else if(!password)
    {
      res.status(400).json({msgSrc:"password",msg:"Password is required"});

    }
     else {
      // Validate if user exist in our database
      const user = await User.findOne({ username: username.toLowerCase()});
      console.log(password)
      if(!user)
      {
        res.status(400).json({msgSrc:"username-credentials",msg:"Username does not exist"});

      }else if(!(await bcrypt.compare(password, user.password)))
      {
        res.status(400).json({msgSrc:"password-credentials",msg:"Incorrect password"});
      }
      else {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, username },
          key

        );

        // save user token
        // user
        res.status(200).json({"token":token,"user":user});
      }
    }
  } catch (err) {

    console.log(err);
  }
  // Our register logic ends here
});
module.exports = router;