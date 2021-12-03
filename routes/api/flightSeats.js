const express = require('express')
const moment = require('moment');
const { Query } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation');
const FlightSeat = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/User');

router.get('/:seat_id',async (req,res)=>{
    const seat_id = req.params.seat_id;
    if(!mongoose.isValidObjectId(seat_id))
    {
        res.status(400).json({msg : 'the seat id is not a valid id'});
        return;
    }
    const seat = await FlightSeat.findById(seat_id);
    if(seat)
        res.json(seat);
    else
        res.status(404).json({msg: 'there is no such seat'});
})

module.exports=router;