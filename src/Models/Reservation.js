const mongoose = require('mongoose');
mongoose.set('debug', true);

const ReservationSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.ObjectId,
        required:true
    },
    
    
});


const Reservation = mongoose.model('Reservation',ReservationSchema, 'Reservation');
module.exports = Reservation;