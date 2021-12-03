const mongoose = require('mongoose');
mongoose.set('debug', true);

const AdminSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{type:String,
    required:true
    },
    
    
    
});


const Admin = mongoose.model('Admin',AdminSchema, 'Admin');
module.exports = Admin;