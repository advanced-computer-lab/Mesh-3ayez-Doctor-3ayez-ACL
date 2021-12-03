const mongoose = require('mongoose');
mongoose.set('debug', true);

const ReservationSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.ObjectId,
        required:true
    },
    departure_flight:{
        type:mongoose.ObjectId,
        required : true
    },
    return_flight:{
        type:mongoose.ObjectId,
        required : true
    },
    cabin_type:{
        type:String,
        required:true
    },
    number_of_passengers:{
        type:Number,
        required:true
    },
    price:{
        type: mongoose.Types.Decimal128,
        required:true
    },
    paid:{
        type:mongoose.Types.Decimal128,
        required:true,
        default:0
    }
    
    
});


const Reservation = mongoose.model('Reservation',ReservationSchema, 'Reservation');
module.exports = Reservation;