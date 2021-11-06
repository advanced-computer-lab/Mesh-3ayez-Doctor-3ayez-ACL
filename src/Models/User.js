const mongoose = require('mongoose');
mongoose.set('debug', true);

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{type:String,
    required:true
    },
    type:{type:String,
    required:true
    },
    
    
});


const User = mongoose.model('User',UserSchema, 'User');
module.exports = User;