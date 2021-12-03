const mongoose = require('mongoose');
mongoose.set('debug', true);

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
    seat_number:{
        type:Number,
        required:true
    }
    
    
});


const FlightSeat = mongoose.model('FlightSeat',FlightSeatSchema, 'FlightSeat');
module.exports = FlightSeat;