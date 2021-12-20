
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../../src/Models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
router.post("/", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email )) {
      res.status(400).json({msgSrc:"email",msg:"Email is required"});
    }else if(!password)
    {
      res.status(400).json({msgSrc:"password",msg:"Password is required"});

    }
     else {
      // Validate if user exist in our database
      const user = await User.findOne({ email });
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
          { user_id: user._id, email },
          "secretKey"

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