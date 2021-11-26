const mongoose = require('mongoose');
mongoose.set('debug', true);

const FlightSeatSchema= new mongoose.Schema({
    flight_id:{
        type: mongoose.ObjectId,
        ref: 'Flight',
        unique:false
    },
    seat_id:{
        type:mongoose.ObjectId,
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
    price:{
        type:mongoose.Decimal128,
        required:true
    },
    
    baggage_allowance:{
        type:mongoose.Decimal128,
        required:true
    },
    
    
});
FlightSeatSchema.index({ flight_id: 1, seat_id: 1}, { unique: true });


const FlightSeat = mongoose.model('FlightSeat',FlightSeatSchema, 'FlightSeat');
module.exports = FlightSeat;