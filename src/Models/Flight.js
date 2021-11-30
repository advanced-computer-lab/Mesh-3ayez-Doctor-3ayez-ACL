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
        max_seats:{
        type:Number,
        required:true
        },
        available:{
            type:Number,
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
    },
    business_seats:{
        max_seats:{
            type:Number,
            required:true
            },
            available:{
                type:Number,
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
    },
    
    first_seats:{
        max_seats:{
            type:Number,
            required:true
            },
            available:{
                type:Number,
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