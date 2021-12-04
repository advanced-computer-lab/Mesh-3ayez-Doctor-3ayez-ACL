const { response } = require('express');
const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose =require("mongoose")
const Reservation = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/User');
const Flight = require('../../src/Models/Flight');

// create a new reservation
router.post('/', async(req,res)=>{
    const body = req.body;
    var query = {};

    var departure_flight;
    var rerturn_flight;
    var number_of_passengers;
    var cabin_type;

    //user id
    if(body.user_id)
    {
        if(mongoose.isValidObjectId(body.user_id))
        {
            const user = await User.findById(body.user_id);
            if(user)
                query['user_id'] = body.user_id;
            else
            {
                res.status(400).json({msg : "there is no such user with this id"});
                return;
            }
        }
        else
        {
            res.status(400).json({msg : "this user id is not a valid id"});
            return;
        }
    }
    else
    {
        res.status(400).json({msg : "you need to specify the user id"});
        return;
    }


    // departure flight
    if(body.departure_flight)
    {
        if(mongoose.isValidObjectId(body.departure_flight))
        {
            const departure_flight = await Flight.findById(body.departure_flight);
            if(flight)
                query['departure_flight'] = body.departure_flight;
            else
            {
                res.status(400).json({msg : "there is no such departure flight with this id"});
                return;
            }
        }
        else
        {
            res.status(400).json({msg : "this departure flight id is not a valid id"});
            return;
        }
    }
    else
    {
        res.status(400).json({msg : "you need to specify the departure flight id"});
        return;
    }


    //return flight
    if(body.return_flight)
    {
        if(mongoose.isValidObjectId(body.return_flight))
        {
            const return_flight = await Flight.findById(body.return_flight);
            if(flight)
                query['return_flight'] = body.return_flight;
            else
            {
                res.status(400).json({msg : "there is no such return flight with this id"});
                return;
            }
        }
        else
        {
            res.status(400).json({msg : "this return flight id is not a valid id"});
            return;
        }
    }
    else
    {
        res.status(400).json({msg : "you need to specify the return flight id"});
        return;
    }

    if(body.number_of_passengers)
    {
        if(!isNaN(body.number_of_passengers))
            query['number_of_passengers'] = body.number_of_passengers;
        else
        {
            res.status(400).json({msg : 'the number of passengers should be a valid integer'});
            return;
        }
    }
    else
    {
        res.status(400).json({msg : 'you need to specify the number of passengers'});
        return;
    }

    if(body.cabin_type)
    {
        if(body.cabin_type === 'economy')
        {
            
        }
    }
    else
    {
        res.status(400).json({msg : 'you need to specify the cabin type'});
    }
    



});

module.exports = router;