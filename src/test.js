const mongoose = require('mongoose');

const MongoURI = require("../config/keys").MongoURI ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));
const FlightSeat = require('./Models/FlightSeat');
const seat=new FlightSeat({"flight_id":"6187afbe02f9745a7b0111bf","seat_id":"6187afbe02f9745a7b0111bf","reservation_id":"6187afbe02f9745a7b0111bf","seat_type":"Economy","price":"123.55","baggage_allowance":"32.5"});
seat.save().then(
        console.log("saved")
).catch(
    (err)=>{
        console.log(err);
    }
);

// const Flight=require("./Models/Flight");
// const f=new Flight({
//     "flight_number": "155",
//     "from": "N",
//     "to":"d",
//     "economy_seats": "30",
//     "business_seats": "30",
//     "first_seats": "15",
//     "departure_time": "2000-12-06T17:40:00.000+00:00",
//     "arrival_time": "2000-12-06T17:40:00.000+00:00"
// });
// f.save().then(()=>console.log("done")).catch((err=>{console.log(err)}));