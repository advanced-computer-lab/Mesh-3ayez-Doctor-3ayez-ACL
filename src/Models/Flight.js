const mongoose = require('mongoose');
mongoose.set('debug', true);

const FlightSchema= new mongoose.Schema({
    flight_number:{
        type:Number,
        required:true
    },
    from:{type:String,
    required:true
    },

    departure_terminal:{
        type:Number,
        required:true
    },
    to:{type:String,
    required:true
    },
    arrival_terminal:{
        type:Number,
        required:true
    },
    
    economy_seats:{
        type:Number,
        required:true
    },
    business_seats:{
        type:Number,
        required:true
    },
    
    first_seats:{
        type:Number,
        required:true
    },
    departure_time:{
        type:Date,
        required:true
    },
    arrival_time:{
        type:Date,
        required:true
    }
});


const Flight = mongoose.model('Flight',FlightSchema, 'Flight');
module.exports = Flight;