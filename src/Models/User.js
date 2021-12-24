const mongoose = require('mongoose');
mongoose.set('debug', true);

const UserSchema= new mongoose.Schema({
    username:{type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    first_name:{type:String,
    required:true
    },
    
    last_name:{type:String,
        required:true
    },
    
    email:{type:String,
        required:true
    },

    passport:{
        type:Number,
        required:true
    },
    
    home_address:{
        type:String,
        required:true
    },

    country_code:{
        type:Number,
        required:true
    },
    mobile_number:{
        type:Number,
        required:true
    },
});


const User = mongoose.model('User',UserSchema, 'User');
module.exports = User;