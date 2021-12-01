const { response } = require('express');
const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose =require("mongoose")
const FlightSeat = require('../../../src/Models/FlightSeat');
var MyObjectId = require('mongoose').Types.ObjectId;
router.get("/:id/:cabin",(req,res)=>{
    console.log(req.params.id);
    FlightSeat.find({"flight_id":req.params.id ,"reservation_id":null,"seat_type":req.params.cabin}).then(
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
