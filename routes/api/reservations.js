const { response } = require('express');
const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose =require("mongoose")
const Reservation = require('../../src/Models/Reservation');
const User = require('../../src/Models/User');
const Flight = require('../../src/Models/Flight');
const FlightSeat = require('../../src/Models/FlightSeat');

// create a new reservation
router.post('/', async(req,res)=>{
    const body = req.body;
    var query = {};
    var departure_flight_update = {};
    var departure_flight_update = {};

    var departure_flight;
    var return_flight;
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
            departure_flight = await Flight.findById(body.departure_flight);
            if(departure_flight)
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
            return_flight = await Flight.findById(body.return_flight);
            if(return_flight)
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
            if(departure_flight.economy_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the departure flight'});
                return;
            }

            if(return_flight.economy_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the return flight'});
                return;
            }
            
            query['price'] = departure_flight.economy_seats.price *body.number_of_passengers+ return_flight.economy_seats.price*body.number_of_passengers;
            departure_flight_update['economy_seats.available'] = departure_flight.economy_seats.available - body.number_of_passengers;
            return_flight_update['economy_seats.available'] = return_flight.economy_seats.available - body.number_of_passengers;
        }
        else if(body.cabin_type === 'business')
        {
            if(departure_flight.business_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the departure flight'});
                return;
            }

            if(return_flight.business_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the return flight'});
                return;
            }
            query['price'] = departure_flight.business_seats.price *body.number_of_passengers+ return_flight.business_seats.price*body.number_of_passengers;
        }

        else if(body.cabin_type === 'first')
        {
            if(departure_flight.first_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the departure flight'});
                return;
            }

            if(return_flight.first_seats.available < body.number_of_passengers)
            {
                res.status(400).json({msg : 'the number of passengers must be less than the available seats in the chosen cabin in the return flight'});
                return;
            }
            query['price'] = departure_flight.first_seats.price *body.number_of_passengers+ return_flight.first_seats.price*body.number_of_passengers;
        }

        else
        {
            res.status(400).json({msg : 'the cabin type is incorrect. please choose between economy, business, and first'});
            return;
        }
        query['cabin_type'] = body.cabin_type


    }
    else
    {
        res.status(400).json({msg : 'you need to specify the cabin type'});
    }

    // departure seats
    if(body.departure_seats)
    {
        if(body.departure_seats.length!==body.number_of_passengers)
        {
            res.status(400).json({msg : 'the number of chosen seats in the departure flight should be equal to the number of passengers'});
            return;
        }
        
        for(var i=0;i<body.departure_seats.length;i++)
        {
            if(!mongoose.isValidObjectId(body.departure_seats[i]))
            {
                res.status(400).json({msg : `${body.departure_seats[i]} is not a valid id`});
                return;
            }
            const seat = await FlightSeat.findOne({'_id':body.departure_seats[i], 'flight_id' : body.departure_flight});
            if(!seat)
            {
                res.status(400).json({msg : `the seat with id ${body.departure_seats[i]} does not exist in the departure flight`});
                return;
            }
            if(seat.reservation_id)
            {
                res.status(400).json({msg : `the seat with id ${body.departure_seats[i]} is already reserved`});
                return;
            }
        }

       
    }
    else
    {
        res.status(400).json({msg : 'you should specify the departure flight seats'});
        return;
    }

    // return flight seats

    if(body.return_seats)
    {
        if(body.return_seats.length!==body.number_of_passengers)
        {
            res.status(400).json({msg : 'the number of chosen seats in the return flight should be equal to the number of passengers'});
            return;
        }
        
        for(var i=0;i<body.return_seats.length;i++)
        {
            if(!mongoose.isValidObjectId(body.return_seats[i]))
            {
                res.status(400).json({msg : `${body.return_seats[i]} is not a valid id`});
                return;
            }
            const seat = await FlightSeat.findOne({'_id':body.return_seats[i], 'flight_id' : body.return_flight});
            if(!seat)
            {
                res.status(400).json({msg : `the seat with id ${body.return_seats[i]} does not exist in the return flight`});
                return;
            }
            if(seat.reservation_id)
            {
                res.status(400).json({msg : `the seat with id ${body.return_seats[i]} is already reserved`});
                return;
            }
        }
    }
    else
    {
        res.status(400).json({msg : 'you should specify the return flight seats'});
        return;
    }

    

    const new_reservation = new Reservation(query);
    
    new_reservation.save().then(async(reservation) =>{
        
        var seat_update = {'reservation_id' : reservation._id};

        
        
        body.departure_seats.map(async seat_id => {

            await FlightSeat.findByIdAndUpdate(seat_id, seat_update);
        })

        body.return_seats.map(async seat_id => {
             await FlightSeat.findByIdAndUpdate(seat_id, seat_update);
        })
        res.json({msg : 'reservation created successfully'});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg : 'the server has encountered a problem. sorry for disturbance'});
    })
    

});


module.exports = router;