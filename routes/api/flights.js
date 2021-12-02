const express = require('express')
const moment = require('moment');
const { Query } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation');
const FlightSeat = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/User');

// APIs here

//Get all flights

router.get("/", async (req, res) => {
    if(await checkAdmin()){
    Flight.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    else
    {
        res.json({msg: 'you are not authorized to view this content'})
    }
})

//Create Flight

router.post("/", async(req,res)=>{
    if(await checkAdmin())
    {
        var query = {};
        const body = req.body;
        
        if(isNaN(body.flight_number))
        {
            res.status(400).json({msg:'flight number must be an integer'});
            return;
        }
        else
            query['flight_number'] = body.flight_number;

        if(!body.from)
        {
            res.status(400).json({msg:'the origin airport is a required field'});
            return;
        }
        else
            query['from'] = body.from;

        
        if(isNaN(body.departure_terminal))
        {
            res.status(400).json({msg:'the origin airport terminal is not valid'});
            return;
        }
        else
            query['departure_terminal'] = body.departure_terminal;

        if(!body.to)
        {
            res.status(400).json({msg:'the destination airport is a required field'});
            return;
        }
        else
            query['to'] = body.to;

       
        if(isNaN(body.arrival_terminal))
        {
            res.status(400).json({msg:'the destination airport terminal is not valid'});
            return;
        }
        else
            query['arrival_terminal'] = body.arrival_terminal;

        

        // economy seats
        if(isNaN(body.economy_seats.max_seats) || body.economy_seats.max_seats<0)
        {
            res.status(400).json({msg:'the number of economy seats must be an integer'});
            return;
        }
        else
        {
            query['economy_seats.max_seats'] = body.economy_seats.max_seats;
            query['economy_seats.available'] = body.economy_seats.max_seats;
        }

        
        if(isNaN(body.economy_seats.price) || body.economy_seats.price<0)
        {
            res.status(400).json({msg:'the price of economy seats must be a valid decimal'});
            return;
        }
        else
            query['economy_seats.price'] = body.economy_seats.price
        
        if(isNaN(body.economy_seats.baggage_allowance) || body.economy_seats.baggage_allowance<0)
        {
            res.status(400).json({msg:'the ammount of baggage allowed for economy class must be a valid decimal'});
            return;
        }
        else
            query['economy_seats.baggage_allowance'] = body.economy_seats.baggage_allowance;


        

        // business class seats
        if(isNaN(body.business_seats.max_seats) || body.business_seats.max_seats<0)
        {
            res.status(400).json({msg:'the number of business seats must be an integer'});
            return;
        }
        else
        {
            query['business_seats.max_seats'] = body.business_seats.max_seats;
            query['business_seats.available'] = body.business_seats.max_seats;
        }

        if(isNaN(body.business_seats.price) || body.business_seats.price<0)
        {
            res.status(400).json({msg:'the price of business seats must be a valid decimal'});
            return;
        }
        else
            query['business_seats.price'] = body.business_seats.price;
        
        if(isNaN(body.business_seats.baggage_allowance) || body.business_seats.baggage_allowance<0)
        {
            res.status(400).json({msg:'the ammount of baggage allowed for business class must be a valid decimal'});
            return;
        }
        else
            query['business_seats.baggage_allowance'] = body.business_seats.baggage_allowance;



        // first class seats
        
        if(isNaN(body.first_seats.max_seats) || body.first_seats.max_seats<0)
        {
            res.status(400).json({msg:'the number of first class seats must be an integer'});
            return;
        }
        else
        {
            query['first_seats.max_seats'] = body.first_seats.max_seats
            query['first_seats.available'] = body.first_seats.max_seats
        }

        if(isNaN(body.first_seats.price) || body.first_seats.price<0)
        {
            res.status(400).json({msg:'the price of first class seats must be a valid decimal'});
            return;
        }
        else
            query['first_seats.price'] = body.first_seats.price;

        
        if(isNaN(body.first_seats.baggage_allowance) || body.first_seats.baggage_allowance<0)
        {
            res.status(400).json({msg:'the ammount of baggage allowed for first class must be a valid decimal'});
            return;
        }
        else
            query['first_seats.baggage_allowance'] = body.first_seats.baggage_allowance;



        //departure time

        if(!body.departure_time)
        {
            res.status(400).json({msg:'the departure date and time is a required field'});
            return;
        }
        else
        {
            const d1 = new Date(body.departure_time)
            if(isNaN(d1))
            {
                res.status(400).json({msg:'the departure time is not a valid date time'});
                return;
            }
            else
                query['departure_time'] = d1;
        }

        // arrival time

        if(!body.arrival_time)
        {
            res.status(400).json({msg:'the arrival date and time is a required field'});
            return;
        }
        else
        {
            const d1 = new Date(body.arrival_time)
            if(isNaN(d1))
            {
                res.status(400).json({msg:'the arrival time is not a valid date time'});
                return;
            }
            else
                query['arrival_time'] = d1;
        }


        //checking if there is an already created flight with the same attributes
        const flights = await Flight.find(query, 'flight_number');
        if(flights.length>0)
        {
            res.status(400).json({msg : 'flight aready exists'});
        }
        else
        {
            //creating a new flight
            const newFlight = new Flight(query);
            newFlight.save().then((flight)=>{
                res.status(201).json({msg : 'flight created successfully'});
                // initializing all seats for that flight
                create_seats(flight._id, 'economy', body.economy_seats.price, body.economy_seats.baggage_allowance, body.economy_seats.max_seats);
                create_seats(flight._id, 'business', body.business_seats.price, body.business_seats.baggage_allowance, body.business_seats.max_seats);
                create_seats(flight._id, 'first', body.first_seats.price, body.first_seats.baggage_allowance,body.first_seats.max_seats);
            }).catch(err=>{
                console.log(err)
                res.status(500).json('the server has encountered an internal error sorry for disturbance');
            })
            
        }

    }
    else
    {
        res.status(403).json({msg: "you are not authorized to add a new flight"});
    }
});

function create_seats(flight_id, cabin_type, seat_price, seat_baggage_allowance, max_seats)
{
    var query = {}
    query['flight_id'] = flight_id;
    query['reseration_id'] = null;
    query['seat_type'] = cabin_type;
    query['price'] = seat_price;
    query['baggage_allowance'] = seat_baggage_allowance;
    for(var i=0;i<max_seats;i++)
        {
            const new_seat = new FlightSeat(query);
            new_seat.save().catch(err=>{
                console.log(err)
            })
        }
}



//Update Flight details

router.put('/:_id',async (req, res) =>{
 
    if(await checkAdmin()){
    const body = req.body;
    
    var query = {}
    
    if(!isNaN(body.flight_number) && body.flight_number>0)
    {
        query['flight_number'] = body.flight_number;
    } 
    
    
        
    if(body.from)
    {
        query['from'] = body.from;
    }

    
    if(!isNaN(body.departure_terminal) && body.departure_terminal>0)
        query['departure_terminal'] = body.departure_terminal
   
    

    if(body.to)
    {
        query['to'] = body.to;
    }

    if(!isNaN(body.arrival_terminal) && body.arrival_terminal>0)
        query['arrival_terminal'] = body.arrival_terminal
    

    if(body.departure_time)
    {
        
        const d1 = new Date(body.departure_time);
        if(isNaN(d1))
        {
            res.status(400).json({msg:'departure time is not a valid date time'});
            return;
        }
        else
        {
            
            query['departure_time'] = d1;
        }
    }

    
    if(body.arrival_time)
    {
        const d1 = new Date(body.arrival_time);
        if(isNaN(d1))
        {
            res.status(400).json({msg:'arrival time is not a valid date time'});
            return;
        }
        else
        {
           
            query['arrival_time'] = d1
        }
    }


    //economy seats
    if(!isNaN(body.economy_seats)){
        console.log(body.economy_seats);
    if(!isNaN(body.economy_seats.max_seats) && body.economy_seats.max_seats>0)
    {
        query['economy_seats.max_seats'] = body.economy_seats.max_seats;
    } 
    

    if(!isNaN(body.economy_seats.price) && body.economy_seats.price>0)
    {
        query['economy_seats.price'] = body.economy_seats.price;
    } 
    

    if(!isNaN(body.economy_seats.baggage_allowance) && body.economy_seats.baggage_allowance>0)
    {
        query['economy_seats.baggage_allowance'] = body.economy_seats.baggage_allowance;
    } 
}
     
    
    

    //business seats
    if(!isNaN(body.business_seats)){
    if(!isNaN(body.business_seats.max_seats) && body.business_seats.max_seats>0)
    {
        query['business_seats.max_seats'] = body.business_seats.max_seats;
    } 
    

    if(!isNaN(body.business_seats.price) && body.business_seats.price>0)
    {
        query['business_seats.price'] = body.business_seats.price;
    } 
    

    if(!isNaN(body.business_seats.baggage_allowance) && body.business_seats.baggage_allowance>0)
    {
        query['business_seats.baggage_allowance'] = body.business_seats.baggage_allowance;
    } 
}
    
    
    
    //first seats
    if(!isNaN(body.first_seats)){
    if(!isNaN(body.first_seats.max_seats) && body.first_seats.max_seats>0)
    {
        query['first_seats.max_seats'] = body.first_seats.max_seats;
    } 
    

    if(!isNaN(body.first_seats.price) && body.first_seats.price>0)
    {
        query['first_seats.price'] = body.first_seats.price;
    } 
    

    if(!isNaN(body.first_seats.baggage_allowance) && body.first_seats.baggage_allowance>0)
    {
        query['first_seats.baggage_allowance'] = body.first_seats.baggage_allowance;
    } 
    else{
        res.status(400).json({msg:'the allowed baggage of first class seats should be a valid double'});
        return;
    }
}
    
        
    
    
        
    Flight.findByIdAndUpdate(req.params._id, query).then(async (result)=>{
        const row = await Flight.find({'_id': req.params._id});
        res.json(row);
        
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).json({msg:"there is not flight with such id"})
    
    }
    );
    }
    else
    {
        res.status(403).json({msg:'you are not authorized to update any flights'});
    }

});


router.post('/search', async (req, res) => {

    if(await checkAdmin()){
    const body = req.body;
    var query = {}
    
    if(body.flight_number || body.flight_number===0)
    {
        console.log(body.flight_number.length);
        if(!isNaN(body.flight_number)){
        console.log("here");
        console.log(body.flight_number)
        query['flight_number'] = body.flight_number;
        }
    }
    
        
    if(body.from)
    {
        const regex = new RegExp(body.from, 'i')
        query['from'] = { $regex: regex };
    }


    if(!isNaN(body.departure_terminal))
        query['departure_terminal'] = body.departure_terminal
    


    if (body.to) {
        const regex = new RegExp(body.to, 'i')
        query['to'] = { $regex: regex };
    }

    
    if(!isNaN(body.arrival_terminal))
        query['arrival_terminal'] = body.arrival_terminal
    


    if(body.departure_time)
    {
        
        const d1 = new Date(body.departure_time);
        if(isNaN(d1))
        {
            res.status(400).json({msg:'departure time is not a valid date time'});
            return;
        }
        else
        {
            //d1.setHours(d1.getHours()+2);
            const d2 = new Date(body.departure_time);
            //d2.setHours(d2.getHours()+2);
            d2.setMinutes(d2.getMinutes()+1);
            query['departure_time'] = {$gte: d1 , $lt: d2};
        }
    }

    
    if(body.arrival_time)
    {
        const d1 = new Date(body.arrival_time);
        if(isNaN(d1))
        {
            res.status(400).json({msg:'arrival time is not a valid date time'});
            return;
        }
        else
        {
            //d1.setHours(d1.getHours()+2);
            const d2 = new Date(body.arrival_time);
            //d2.setHours(d2.getHours()+2);
            d2.setMinutes(d2.getMinutes()+1);
            query['arrival_time'] = {$gte: d1 , $lt: d2};
        }
    }




    const ans = await Flight.find(query);
    res.status(201).json(ans)
}
else{
    res.status(403).json({msg: 'you are not authorized to search for flights'});
}
});


// delete flight
router.delete('/:_id', async(req, res) => {
    if(await checkAdmin()){
    Flight.findByIdAndRemove(req.params._id, req.body).then(flight => res.json({ msg: 'flight entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a flight' }))
}
else{
    res.status(403).json({msg: 'you are not authorized to delete any flights'});
}
})


async function checkAdmin(){
    const res = await User.find({type:'admin'});
    
    return res.length>0;
}

//Get All Reserved Flights by a user

router.get("/user/:id", async (req, res) => {
    var rsvids = []
    await Reservation.find({'user_id': req.params.id}).exec().then(function(stuff){
        stuff.forEach(function(stuffling){
                rsvids.push(mongoose.Types.ObjectId(stuffling._id))
        })
    })
    var flightids = []
    await FlightSeat.find().where('reservation_id').in(rsvids).exec().then(function(stuff){
        stuff.forEach(function(stuffling){
                flightids.push(mongoose.Types.ObjectId(stuffling.flight_id))
        })
    }).catch(err =>{console.log(err)})
    Flight.find().where('_id').in(flightids).exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });

    
})

// a user search for departure and return flights

router.post('/user_search_flights', async(req,res)=>{

    const body = req.body;
    var departure_query = {};
    var return_query = {};

    if(body.from)
    {
        departure_query['from'] = body.from;
        return_query['to'] = body.from
    }
    else
    {
        res.status(400).json({msg: 'you need to specify the origin airport'});
        return;
    }
    if(body.to)
    {
        departure_query['to'] = body.to;
        return_query['from'] = body.to;
    }
    else
    {
        res.status(400).json({msg: 'you need to specify the destination airport'});
        return;
    }

    if(body.departure_date)
    {
        const d1 = new Date(body.departure_date);
        if(isNaN(d1))
        {
            res.status(400).json({msg: 'the departure date is not a valid date'});
            return;
        }
        const d2 = new Date(body.departure_date);
        d2.setDate(d2.getDate()+1);
        departure_query['departure_time']= {$gte:d1, $lt:d2};
    }
    else
    {
        res.status(400).json({msg: 'you need to specify the date of your departure'});
        return;
    }

    if(body.return_date )
    {
        const d1 = new Date(body.return_date);
        if(isNaN(d1))
        {
            res.status(400).json({msg: 'the return date is not a valid date'});
            return;
        }
        const d2 = new Date(body.return_date);
        d2.setDate(d2.getDate()+1);
        return_query['departure_time']= {$gte:d1, $lt:d2};
    }
    else
    {
        res.status(400).json({msg: 'you need to specify the date of your return'});
        return;
    }

    if(!body.cabin_type)
    {
        res.status(400).json({msg: 'you need to specify the cabin type'});
        return;
    }
    else if(isNaN(body.number_of_passengers))
    {
        res.status(400).json({msg: 'you need to specify the number of passengers'});
        return;
    }
    else if(body.number_of_passengers<=0)
    {
        res.status(400).json({msg: 'the number of passengers must be a valid integer'});
        return;
    }
    else
    {
        
        if(body.cabin_type == 'economy')
        {
            departure_query['economy_seats.available'] = {$gte : body.number_of_passengers};
            return_query['economy_seats.available'] = {$gte : body.number_of_passengers};
        }
        else if(body.cabin_type == 'business')
        {
            departure_query['business_seats.available'] = {$gte : body.number_of_passengers};
            return_query['business_seats.available'] = {$gte : body.number_of_passengers};
        }
        else if(body.cabin_type == 'first')
        {
            departure_query['first_seats.available'] = {$gte : body.number_of_passengers};
            return_query['first_seats.available'] = {$gte : body.number_of_passengers};
        }
        else
        {
            res.status(400).json({msg: 'the cabin type is not valid please choose between (economy, business, first)'});
            return;
        }
    }

    const depart_flights = await Flight.find(departure_query);
    const return_flights = await Flight.find(return_query);
    res.json({'departure_flights' : depart_flights, 'return_flights':return_flights});

});


//Get All Reserved Flights by a user

module.exports = router