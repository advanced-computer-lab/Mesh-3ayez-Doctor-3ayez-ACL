const express = require('express')
const mongoose = require('mongoose');
const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation')
const FlightSeat = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/User');
const nodemailer = require('nodemailer');
const auth =require("./middleware/auth.js");
require('dotenv').config({path : __dirname+'/../../config/.env'});
const router = express.Router()

// user cancel a reservation

router.delete('/reservation/:user_id/:reservation_id', auth, async(req,res)=>{
    
    const user_id = req.params.user_id;
    const reservation_id = req.params.reservation_id;
    
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
    
    const user = await User.findById(user_id);
    console.log("now I'm here");
    if(!user)
    {
        res.status(404).json({msg : 'this user is not found'});
        return; 
    }
    
    const reservation = await Reservation.findOne({'_id':reservation_id, 'user_id':user_id});
    if(reservation)
    {
        
        var update_departure = {};
        var update_return = {};
        console.log("I found a reservation with such attributes");
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

        // increase the number of available seats in both departure and return seats
        await Flight.findByIdAndUpdate(reservation.departure_flight, update_departure);
        await Flight.findByIdAndUpdate(reservation.return_flight, update_return);

        // deleting the reservation_id for all the reserved seats 
        await FlightSeat.updateMany({'reservation_id' : reservation_id}, {'reservation_id':null});

        

        await Reservation.findByIdAndDelete(reservation_id);

        // sending email to the user
        await send_cancellation_mail(user, reservation.price, reservation, departure_flight.from, departure_flight.to);
        console.log('mail sent');
        res.json({msg:"deleted successfully"});

    }
    else
        res.status(404).json({msg: 'no such reservations for this specific user'});
    
});

async function send_cancellation_mail(user, refund, reservation, from, to)
{
    const text = `
    Dear Mr/Mrs ${user.first_name},
    We hope you are doing well, we are sending this mail to confirm that your reservation with id ${reservation._id} that was going from ${from} to ${to} was cancelled and you will get refunded with an amount of ${refund}.
     
     Regards,
     Acl Team`;

     

     let transporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
            user : process.env.USER,
            pass : process.env.PASSWORD
      }
    });

    let info = await transporter.sendMail({
        from: `${process.env.USER}`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "cancellation confirmation", // Subject line
        text: text, // plain text body
        
      });
      
}

// get itinerary of a reservation

router.get('/itinerary/:user_id/:reservation_id', auth, async(req,res)=>{
    const user_id = req.params.user_id;
    console.log(user_id);
    const reservation_id = req.params.reservation_id;
    const reservation = await Reservation.findOne({'_id':reservation_id, 'user_id' : user_id});
    if(reservation)
    {
        var response = {};
        const departure_flight = await Flight.findById(reservation.departure_flight);
            //'flight_number from to departure_terminal arrival_terminal departure_time');
        const return_flight = await Flight.findById(reservation.return_flight);
            //'flight_number from to departure_terminal arrival_terminal departure_time');
        const departure_seats = await FlightSeat.find({'flight_id':reservation.departure_flight, 'reservation_id':reservation_id});//, 'seat_number');
        const return_seats = await FlightSeat.find({'flight_id':reservation.return_flight, 'reservation_id':reservation_id});// 'seat_number');
        response['departure_flight'] = departure_flight;
        response['return_flight'] = return_flight;
        response['reservation_number'] = reservation_id;
        response['departure_seats'] = departure_seats;
        response['return_seats'] = return_seats;
        response['cabin_type'] = reservation.cabin_type;
        response['total_price'] = reservation.price;
        response['amount_paid'] = reservation.paid;
        res.json(response);
    }
    else
    {
        res.status(404).json({msg:'no such reservation for this specific user'});
    }
});

// edit user info
router.put('/:user_id', auth, async(req,res)=>{
    const body = req.body;
    const user_id = req.params.user_id;
    if(!mongoose.isValidObjectId(user_id))
    {
        res.status(400).json({msg : 'the id you have sent is not a valid id'});
        return;
    }
    const user = User.findById(user_id);
    if(!user)
    {
        res.status(404).json({msg : 'no such user'});
        return;
    }

    var query = {};
    if(body.first_name)
    {
        query['first_name'] = body.first_name;
    }
    if(body.last_name)
        query['last_name'] = body.last_name;
    if(body.passport)
    {
        if(!isNaN(body.passport))
            query['passport'] = body.passport;
        else
        {
            res.status(400).json({msg : 'the passport you have entered is not valid'});
            return;
        }
    }
    if(body.email)
    {
        if(validateEmail(body.email))
            query['email'] = body.email;
        else
        {
            res.status(400).json({msg : 'the email you have entered is not valid'});
            return;
        }
    }

    User.findByIdAndUpdate(user_id,query).then(async result =>{
        const new_user = await User.findById(user_id);
        res.json(new_user);
    }).catch(err=>{
        console.log(err);
        res.status(500).json('the server has encountered an error sorry for disturbance');
    })
});

function validateEmail (email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };






module.exports = router