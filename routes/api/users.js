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
    const reservation = await Reservation.find({'_id':reservation_id, 'user_id':user_id});
    if(reservation.length>0)
    {
        await FlightSeat.updateMany({'reservation_id' : reservation_id}, {'reservation_id':null});
        await Reservation.findByIdAndDelete(reservation_id);
        res.json({msg:"deleted successfully"});

    }
    else
        res.status(404).json({msg: 'no such reservations for this specific user'});
    
})






module.exports = router