const mongoose = require('mongoose');
const FlightSchema= new mongoose.Schema({
    From:{type:String,
    required:true
    },
    To:{type:String,
    required:true
    },
    Flight_Date:{
        type: Date,
        required:true
    },
    Cabin:{
        type:String,
        required:true
    },
    Available_Seats:{
        type:Number,
        required:true
    }
});


const Flight = mongoose.model('Flight',FlightSchema);
module.exports = Flight;