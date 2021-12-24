const { response } = require('express');
const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose =require("mongoose")
const Reservation = require('../../src/Models/Reservation');
const User = require('../../src/Models/User');
const Flight = require('../../src/Models/Flight');
const FlightSeat = require('../../src/Models/FlightSeat');
const authorization = require('../../config/mail');
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
const stripe = require('stripe')("sk_test_51KACNtHLa29h6dWHwGOwi5arQZZ2Q9pK2rPitvLf5fxmIgtaumnuXuyU3rc7S6YabHJoNuj67rM1RXv4bu7a86t900VLBUWoJ6");

// create a new reservation
router.post('/', async(req,res)=>{
    const body = req.body;
    var query = {};
    var departure_flight_update = {};
    var return_flight_update = {};
    var user;
    var departure_flight;
    var return_flight;
    var number_of_passengers;
    var cabin_type;
    var departure_seats = [];
    var return_seats = []

    //user id
    if(body.user_id)
    {
        if(mongoose.isValidObjectId(body.user_id))
        {
            user = await User.findById(body.user_id);
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
            if(seat.seat_type != body.cabin_type)
            {
                res.status(400).json({msg : `all seats must have the same cabin type`});
                return;
            }
            departure_seats.push(seat.seat_name);

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
            if(seat.seat_type!= body.cabin_type)
            {
                res.status(400).json({msg : `all seats must have the same cabin type`});
                return; 
            }
            return_seats.push(seat.seat_name);
        }
    }
    else
    {
        res.status(400).json({msg : 'you should specify the return flight seats'});
        return;
    }

    const token = body.stripeToken;
    const idKey = uuidv4();
    const customer = await stripe.customers.create({
        email: token.email,
        source : token.id
    })
    if(!customer)
    {
        res.json({msg : "customer error"});
        return;
    }
    const payment= await stripe.charges.create({
            amount: query['price']*100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: idKey
          })
    if(!payment)
    {
        res.json({msg: 'payment error'});
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
        // we have to send a mail once the reservation is created successfully
        await sendItinerary(user, reservation, departure_flight, return_flight, departure_seats, return_seats);
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

router.put('/changeFlight/:reservation_id/:user_id/:flight_id', async(req,res)=>{
    const old_flight_id = req.params.flight_id;
    const reservation_id = req.params.reservation_id;
    const user_id = req.params.user_id;

    //checking if all ids are valid ids
    if(!mongoose.isValidObjectId(old_flight_id))
    {
        res.status(400).json({msg:"the old flight id is not a valid id"});
        return;
    }
    if(!mongoose.isValidObjectId(reservation_id))
    {
        res.status(400).json({msg:"the reservation id is not a valid id"});
        return;
    }
    if(!mongoose.isValidObjectId(user_id))
    {
        res.status(400).json({msg:"the user id is not a valid id"});
        return;
    }

    //checking if the user aready exists
    const user = await User.findById(user_id);
    if(!user)
    {
        res.status(404).json({msg:"the user does not exist"});
        return;   
    }

    // checking if there is a reservation with this id belongs to this user
    const reservation = await Reservation.findById(reservation_id);
    if(!reservation)
    {
        res.status(404).json({msg:"there is no reservation with such id"});
        return;
    }
    if(reservation.user_id != user_id)
    {
        res.status(401).json({msg:"this reservation does not belong to this user"});
        return;
    }

    // check if the sent flight is departure or return
    var dep;
    
    if(reservation.departure_flight == old_flight_id)
    {
        dep = true;
    }
    else if(reservation.return_flight == old_flight_id)
        dep = false;
    else
    {
        res.status(400).json({msg:"the old flight does not belong to this reservation"});
        return;
    }
    
    //checking if the new flight id and the new seats exists in the body
    const body = req.body;
    const new_flight_id = body.new_flight_id;
    const new_seats = req.body.seats;
    if(!new_flight_id)
    {
        res.status(400).json({msg:"the new flight id was not provided"});
        return;
    }
    if(!new_seats)
    {
        res.status(400).json({msg:"the new seats were not provided"});
        return;
    }
    if(new_seats.length != reservation.number_of_passengers)
    {
        res.status(400).json({msg:"the number of seats should be equal to the number of passengers"});
        return;
    }


    //checking if the seats ids are valid and they belong to the new flight with the same cabin type
    for(var i=0;i<new_seats.length;i++)
    {
        var seat_id = new_seats[i];
        //checking if the seat id is a valid id
        if(!mongoose.isValidObjectId(seat_id))
        {
            res.status(400).json({msg:"one of the seats id is not a valid id"});
            return;
        }
        var seat = await FlightSeat.findById(seat_id);
        //checking if the seat id exists in the database
        if(!seat)
        {
            res.status(404).json({msg : "on of the new seats does not exist"});
            return;
        }
        //checking if the seat belongs to the new passed flight
        if(seat.flight_id != new_flight_id)
        {
            res.status(400).json({msg : "on of the new seats does not belong to the new flight"});
            return;   
        }
        //checking if the seat has the same cabin type
        if(seat.seat_type != reservation.cabin_type)
        {
            res.status(400).json({msg: "one of the new seats has a different cabin type"});
            return;
        }
        // checking if the seat is not reserved
        if(seat.reservation_id)
        {
            res.status(400).json({msg : "on of the new seats is already reserved"});
            return;   
        }
    }

    //deleting the reservation for the old seats
    for(var i=0;i<reservation.number_of_passengers;i++)
    {
        FlightSeat.findOneAndUpdate({'reservation_id':reservation_id, 'flight_id':old_flight_id}, {'reservation_id':null});
    }

    //changing the number of available seats in the old and new flight
    const old_flight = await Flight.findById(old_flight_id);
    const new_flight = await Flight.findById(new_flight_id);
    var old_query = {};
    var new_query = {};
    var new_price;
    if(reservation.cabin_type=='economy')
       {
            old_query['economy_seats.available'] = old_flight.economy_seats.available + reservation.number_of_passengers;
            new_query['economy_seats.available'] = new_flight.economy_seats.available - reservation.number_of_passengers;
            new_price = reservation.price*1 + (new_flight.economy_seats.price - old_flight.economy_seats.price)*reservation.number_of_passengers
       } 
    else if(reservation.cabin_type == 'business')
        {
            old_query['business_seats.available'] = old_flight.business_seats.available + reservation.number_of_passengers;
            new_query['business_seats.available'] = new_flight.business_seats.available - reservation.number_of_passengers;
            new_price = reservation.price*1 + (new_flight.business_seats.price - old_flight.business_seats.price)*reservation.number_of_passengers;
        }
    else
        {
            old_query['first_seats.available'] = old_flight.first_seats.available + reservation.number_of_passengers;
            new_query['first_seats.available'] = new_flight.first_seats.available - reservation.number_of_passengers;
            new_price = reservation.price*1 + (new_flight.first_seats.price - old_flight.first_seats.price)*reservation.number_of_passengers
        }
        console.log(new_price);

    await Flight.findByIdAndUpdate(old_flight_id, old_query);
    await Flight.findByIdAndUpdate(new_flight_id, new_query);

    //reserving the new seats
    for(var i=0;i<new_seats.length;i++)
    {
        await FlightSeat.findByIdAndUpdate(new_seats[i], {'reservation_id':reservation_id});
    }
    // updating the price and the flight id of the reservation
    var reservation_query={'price' : new_price};
    if(dep)
        reservation_query['departure_flight'] = new_flight_id;
    else
        reservation_query['return_flight'] = new_flight_id;

    console.log(reservation_query);
    await Reservation.findByIdAndUpdate(reservation_id, reservation_query);

    res.json({msg : "the reservation was updated successfully"});
    

});
// getting all flights with to replace a reservation flight with the price difference

router.get('/all_possible_flights/:reservation_id/:src', async(req,res)=>{
    console.log("I'm here");

    const reservation_id = req.params.reservation_id;
    const body = req.body;
    // check if reservation id is a valid id
    
    if(!mongoose.isValidObjectId(reservation_id))
    {
        res.status(400).json({msg : 'the reservation id is not a valid id'});
        return;
    }
    // checking if the reservation id belongs to an actual reservation
    const reservation = await Reservation.findById(reservation_id);
    if(!reservation)
    {
        res.status(404).json({msg : "the reservation does not exist"});
        return; 
    }
    //building the query
    var query = {};
    const src=req.params.src;
    if(!src)
    {
        console.log(body.source)
        res.status(400).json({msg : 'you need to specify if you are coming from the source or the destination'});
        return;
    }
    const departure_flight = await Flight.findById(reservation.departure_flight);
    const return_flight = await Flight.findById(reservation.return_flight);
    // if we want to replace the departure flight
    if(src ==='editDep')
    {
        //check if the departure flight did not take off yet
        if(new Date() >= departure_flight.departure_time)
        {
            res.status(400).json({msg : 'you can not change the departure flight after its departure time'});
            return;
        }
        query['_id'] = {$ne : departure_flight._id};
        query['from'] = departure_flight.from;
        query['to'] = departure_flight.to;
        query['departure_time'] = {$gt : new Date(), $lt : return_flight.departure_time};

    }
    // if we want to replace the return flight
    else
    {
        if(new Date() >= return_flight.departure_time)
        {
            res.status(400).json({msg : 'you can not change the departure flight after its departure time'});
            return;
        }
        query['_id'] = {$ne : return_flight._id};
        query['from'] = return_flight.from;
        query['to'] = return_flight.to;
        query['departure_time'] = {$gt : departure_flight.departure_time};

    }
    query[`${reservation.cabin_type}_seats.available`] = {$gte: reservation.number_of_passengers}
    
    const result = await Flight.find(query);
   
    res.json(result);

});

// search for a replacement for a flight in a reservation
router.post('/find_flights/:reservation_id', async(req,res)=>{
    const reservation_id = req.params.reservation_id;
    const body = req.body;
    //check if the reservation id is a valid id
    if(!mongoose.isValidObjectId(reservation_id))
    {
        res.status(400).json({msg:"the reservation id is not a valid id"});
        return;
    }
    // checking if the reservation id belongs to an actual reservation
    const reservation = await Reservation.findById(reservation_id);
    if(!reservation)
    {
        res.status(404).json({msg : "the reservation does not exist"});
        return; 
    }
    // checking for the cabin type errors
    if(!body.cabin_type)
    {
        res.status(400).json({msg : 'please specify the cabin type'});
        return;
    }
    if(body.cabin_type != reservation.cabin_type)
    {
        res.status(404).json({msg : 'no results found'});
        return;
    }
    // see if the flight to be changed is departure flight or return flight
    if(!body.source)
    {
        res.status(400).json({msg:"you need to specify which flight you need to replace"});
        return;
    }
    //check if the passed date is before today
    var date, date2;
    if(body.date)
    {
        date = construct_date(body.date);
        date2 = new Date(date.getTime());
        date2.setDate(date2.getDate()+1);
    }
    else
    {
        res.status(400).json({msg : 'you need to specify the date of the desidred flight'});
        return;
    }
    console.log(date);
    //check if today's date is before today's date
    if(date < new Date() && !checkSameDay(date, new Date()))
    {
        res.status(400).json({msg : 'you can not search for a flight before today\'s date'});
        return;
    }
    var query = {};
    const departure_flight = await Flight.findById(reservation.departure_flight);
    const return_flight = await Flight.findById(reservation.return_flight);
    // if the flight to be replaced is the departure flight
    if(body.source === 'editDep')
    {
        if(date> return_flight.departure_time)
        {
            res.status(400).json({msg : 'you can not search for a departure flight after the return flight'});
            return;
        }
        if(departure_flight.departure_time < new Date())
        {
            res.status(400).json({msg : 'your flight has already taken off'});
            return;   
        }
        query['from'] = departure_flight.from;
        query['to'] = departure_flight.to;
        query['_id'] = {$ne: reservation.departure_flight};
    }
    else
    {
        if(date< departure_flight.departure_time)
        {
            res.status(400).json({msg : 'you can not search for a return flight before the departure flight'});
            return;
        }
        if(return_flight.departure_time < new Date())
        {
            res.status(400).json({msg : 'your flight has already taken off'});
            return;   
        }
        query['from'] = return_flight.from;
        query['to'] = return_flight.to;
        query['_id'] = {$ne: reservation.return_flight};
    }


    query['departure_time'] = {$gte : date, $lt : date2};
    query[`${reservation.cabin_type}_seats.available`] = {$gte : reservation.number_of_passengers};
    const result = await Flight.find(query);


    res.json(result);
});

function construct_date(date)
{
    var day = date.day + "";
    if(date.day<10)
            day = 0+""+date.day;
    var month = date.month + "";
    if(date.month<10)
        month = 0+""+date.month
    console.log(day);
    return new Date(date.year + "-" + month + "-" + day + "T00:00:00.000Z");
}

function checkSameDay(d1, d2)
{
    return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
}

router.post('/send_me_mail/:reservation_id/:user_id', async(req, res)=>{
    const user_id = req.params.user_id;
    const reservation_id = req.params.reservation_id;
    // check if the ids are valid
    if(!mongoose.isValidObjectId(user_id))
    {
        res.status(400).json({msg : 'the user id is not a valid id'});
        return;
    }
    if(!mongoose.isValidObjectId(reservation_id))
    {
        res.status(400).json({msg : 'the reservation id is not a valid id'});
        return;
    }

    //check if the user exists in the database
    const user = await User.findById(user_id);
    if(!user)
    {
        res.status(404).json({msg : 'this user does not exist'});
        return;
    }

    //check if the reservation exists in the database
    const reservation = await Reservation.findById(reservation_id);
    if(!reservation)
    {
        res.status(404).json({msg : 'there is no reservation with this id'});
        return;
    }

    //check if the reservation belongs to this user
    if(reservation.user_id != user_id)
    {
        res.status(401).json({msg : 'you are not authorized to view this reservation'});
        return;
    }

    //getting the departure and return flight
    const departure_flight = await Flight.findById(reservation.departure_flight);
    const return_flight = await Flight.findById(reservation.return_flight);

    // getting all the seat numbers of the departure and return flights
    var departure_seats = await FlightSeat.find({'reservation_id':reservation_id, 'flight_id':reservation.departure_flight}, 'seat_name');
    departure_seats = departure_seats.map(seat => {return seat.seat_name});
    var return_seats = await FlightSeat.find({'reservation_id':reservation_id, 'flight_id':reservation.return_flight}, 'seat_name');
    return_seats = return_seats.map(seat => {return seat.seat_name});
    await sendItinerary(user, reservation, departure_flight, return_flight, departure_seats, return_seats);
    res.json({msg : 'mail sent successfully'});
});


async function sendItinerary(user, reservation, departure_flight, return_flight, departure_seats, return_seats)
{
    const text = `Dear Mr/Mrs ${user.first_name},

We hope you are doing well. This mail is to confirm that you have made a reservation with id ${reservation._id} that is going from ${departure_flight.from} to ${departure_flight.to}.

Departure Flight:
    from: ${departure_flight.from}, departure time: ${getDateAndTime(departure_flight.departure_time)} terminal ${departure_flight.departure_terminal}
    to: ${departure_flight.to}, arrival time: ${getDateAndTime(departure_flight.arrival_time)} terminal ${departure_flight.arrival_terminal}
    Seats: ${departure_seats.toString()}
    Cabin Type: ${reservation.cabin_type} class

Return Flight:
    from: ${return_flight.from}, departure time: ${getDateAndTime(return_flight.departure_time)} terminal ${return_flight.departure_terminal}
    to: ${return_flight.to}, arrival time: ${getDateAndTime(return_flight.arrival_time)} terminal ${return_flight.arrival_terminal}
    Seats: ${return_seats.toString()}
    Cabin Type: ${reservation.cabin_type} class

Price Paid: ${reservation.price}
Booking Number: ${reservation._id}

    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
            user : authorization.user,
            pass : authorization.password
      }
    });

    let info = await transporter.sendMail({
        from: `${authorization.user}`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Your Reservation Itinerary", // Subject line
        text: text, // plain text body
        
      });
}

function getDateAndTime(date)
{
    var month = date.getMonth() +1;
    if(month<10)
        month = "0"+month;
    var day = date.getDate();
    if(day < 10)
        day = "0"+day;
    var hours = date.getHours();
    if(hours<10)
        hours = "0"+hours;
    var minutes = date.getMinutes();
    if(minutes<10)
        minutes = "0"+minutes;
    
    return `${day}/${month}/${date.getFullYear()} at ${hours}:${minutes}`;

}



module.exports = router;