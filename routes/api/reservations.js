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
    var return_flight_update = {};

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
            departure_flight_update['business_seats.available'] = departure_flight.business_seats.available - body.number_of_passengers;
            return_flight_update['business_seats.available'] = return_flight.business_seats.available - body.number_of_passengers;
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
            departure_flight_update['first_seats.available'] = departure_flight.first_seats.available - body.number_of_passengers;
            return_flight_update['first_seats.available'] = return_flight.first_seats.available - body.number_of_passengers;
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

        // updating the flights' available seats after reservation
        await Flight.findByIdAndUpdate(body.departure_flight, departure_flight_update);
        await Flight.findByIdAndUpdate(body.return_flight, return_flight_update);

        
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

router.put('/change_seats/:reservation_id/:user_id/:flight_id', async(req,res)=>{
    const reservation_id = req.params.reservation_id;
    const user_id = req.params.user_id;
    const flight_id = req.params.flight_id;

    //check all ids
    if(!mongoose.isValidObjectId(reservation_id))
    {
        res.status(400).json({msg : 'the reservation id is not a valid id'});
        return;
    }
    if(!mongoose.isValidObjectId(user_id))
    {
        res.status(400).json({msg : 'the user id is not a valid id'});
        return;
    }
    if(!mongoose.isValidObjectId(flight_id))
    {
        res.status(400).json({msg : 'the flight id is not a valid id'});
        return;
    }
    const seats_ids = req.body.seats;

    for(var i=0; i<seats_ids.length;i++){
        if(!mongoose.isValidObjectId(seats_ids[i]))
        {
            res.status(400).json({msg : `${seats_ids[i]} is not a valid seat id`});
            return;
        }
    }

    //checking if the user id belongs to an existing user
    
    const user = await User.findById(user_id);
    
    if(!user)
    {
        res.status(400).json({msg : 'there is no such user with the passed id'});
        return;
    }
    

    // checking if there is a reservation for that specific user
    const reservation = await Reservation.findOne({'_id':reservation_id, 'user_id':user_id});
    if(!reservation)
    {
        res.status(400).json({msg : 'there is no such reservation for this user'});
        return;
    }

    //checking if the the passed flight is in the reservation departure or return flights
    if(reservation.departure_flight != flight_id && reservation.return_flight != flight_id)
    {
        res.status(400).json({msg : 'this user has no reserved flight with this flight id'});
        return;
    }
    //checking if the number of seats is equal to the number of seats in the reservation
    if(reservation.number_of_passengers != seats_ids.length)
    {
        res.status(400).json({msg : 'the number of seats to be reserved should be equal to the number of seats for this reservation'});
        return;
    }
    //checking if the passed seats are not already reserved by other passengers and they are of the same cabin type
    for(var i=0;i<seats_ids.length;i++)
    {
        const seat = await FlightSeat.findById(seats_ids[i]);
        //checking if there is a seat with such id
        if(!seat)
        {
            res.status(400).json({msg : `there is no seat with id ${seats_ids[i]}`});
            return;
        }
        // checking if the seat belongs to the same flight
        if(seat.flight_id != flight_id)
        {
            res.status(400).json({msg: 'one of the passed seats dos not belong to this flight'});
            return;
        }
        //checking if the seat is of the same cabin type
        if(seat.seat_type != reservation.cabin_type)
        {
            res.status(400).json({msg: 'all seats must have the same cabin type as the reservation cabin type'});
            return;
        }
        //checking if the seat is not reserved by another passenger

        if(seat.reservation_id && seat.reservation_id!= reservation_id)
        {
            res.status(400).json({msg: 'one of the seats is already reserved by another passenger'});
            return;
        }
    }

    //deleting reservations for the seats reserved with the reservation id for that flight
    const query = {'flight_id':flight_id, 'reservation_id':reservation_id}
    for(var i=0;i<reservation.number_of_passengers;i++)
    {
        await FlightSeat.findOneAndUpdate(query, {'reservation_id':null});
    }
    
    //reserving the new seats
    for(var i=0;i<seats_ids.length;i++)
    {
        await FlightSeat.findByIdAndUpdate(seats_ids[i], {'reservation_id':reservation_id});
    }
    res.status(200).json({msg: 'reservation updated successfully'});
}
);


module.exports = router;