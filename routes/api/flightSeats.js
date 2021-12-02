const express = require('express')
const moment = require('moment');
const { Query } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation');
const FlightSeat = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/User');

router.get(`/:id`,(req,res)=>{
    console.log("gego");
    console.log(req.params.id);
    FlightSeat.find({"flight_id":req.params.id}).then(
         (result)=>{
             res.json(result);
         }
     ).catch(
         (err)=>{
            console.log(err);
         }
     )
});

module.exports=router;