const mongoose = require('mongoose');


const FlightSeatSchema= new mongoose.Schema({
    flight_id:{
        type: mongoose.ObjectId,
        required:true,
        unique:false
    },
    reservation_id:{
        type:mongoose.ObjectId,
        default:null
    },
    seat_type:{
        type:String,
        required:true
    },
    seat_name:{
        type:String,
        required:true
    }
    
    
});


const FlightSeat = mongoose.model('FlightSeat',FlightSeatSchema, 'FlightSeat');
module.exports = FlightSeat;