const mongoose = require('mongoose');
mongoose.set('debug', true);

const ExistUserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    FirstName:{type:String,
    required:true
    },
    
    LastName:{type:String,
        required:true
    },
    
    email:{type:String,
        required:true
    },

    Passport:{type:Number,required:true}
    
    
});


const ExistUser = mongoose.model('ExistUser',UserSchema, 'ExistUser');
module.exports = ExistUser;