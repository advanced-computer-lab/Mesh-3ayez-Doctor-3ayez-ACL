const express = require('express')
const moment = require('moment');
const { Query } = require('mongoose');
const mongoose = require('mongoose');
const Flight = require('../../src/Models/Flight');
const User = require('../../src/Models/User');
const Reservation = require('../../src/Models/Reservation')
const FlightSeat = require('../../src/Models/FlightSeat');

const router = express.Router()

// user cancel a reservation

router.delete('/reservation/:user_id/:reservation_id', async(req,res)=>{
    
    const user_id = req.params.user_id;
    const reservation_id = req.params.reservation_id
    const reservation = await Reservation.findOne({'_id':reservation_id, 'user_id':user_id});
    if(reservation)
    {
        
        var update_departure = {};
        var update_return = {};
        const departure_flight = await Flight.findOne({'_id' : reservation.departure_flight});
        const return_flight = await Flight.findOne({'_id':reservation.return_flight});
        if(reservation.cabin_type=='economy')
        {
            update_departure['economy_seats.available'] = reservation.number_of_passengers + departure_flight.economy_seats.available;
            update_return['economy_seats.available'] = reservation.number_of_passengers + return_flight.economy_seats.available;
        }
        else if(reservation.cabin_type == 'business')   
        {
            update_departure['business_seats.available'] = reservation.number_of_passengers + departure_flight.business_seats.available;
            update_return['business_seats.available'] = reservation.number_of_passengers + return_flight.business_seats.available;   
        }
        else   
        {
            update_departure['first_seats.available'] = reservation.number_of_passengers + departure_flight.first_seats.available;
            update_return['first_seats.available'] = reservation.number_of_passengers + return_flight.first_seats.available;
        }
        await Flight.findByIdAndUpdate(reservation.departure_flight, update_departure);
        await Flight.findByIdAndUpdate(reservation.return_flight, update_return);
        await FlightSeat.updateMany({'reservation_id' : reservation_id}, {'reservation_id':null});
        await Reservation.findByIdAndDelete(reservation_id);
        res.json({msg:"deleted successfully"});

    }
    else
        res.status(404).json({msg: 'no such reservations for this specific user'});
    
})






module.exports = router