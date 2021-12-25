const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation');
const FlightSeat = require('../../src/Models/FlightSeat');
const User = require('../../src/Models/Admin');
const auth =require("./middleware/auth.js");

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
            if(d1 < new Date())
            {
                res.status(400).json({msg : 'you can not create a flight in the past'});
                return;
            }
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
            if(query['arrival_time'] < query['departure_time'])
            {
                res.status(400).json({msg : 'the arrival time can\'t be before the departure time'});
            }
        }


        //checking if there is an already created flight with the same flight number
        console.log("I'm here in backend");
        const flights = await Flight.find({'flight_number' : body.flight_number}, 'flight_number');
        if(flights.length>0)
        {
            res.status(400).json({msg : 'flight aready exists'});
        }
        else
        {
            //creating a new flight
            const newFlight = new Flight(query);
            newFlight.save().then((flight)=>{
                // initializing all seats for that flight
                create_seats(flight._id, 'economy', body.economy_seats.max_seats);
                create_seats(flight._id, 'business', body.business_seats.max_seats);
                create_seats(flight._id, 'first', body.first_seats.max_seats);
                res.status(201).json({msg : 'flight created successfully'});
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

function create_seats(flight_id, cabin_type, max_seats)
{
    var query = {}
    query['flight_id'] = flight_id;
    query['reservation_id'] = null;
    query['seat_type'] = cabin_type;
 
    for(var i=1;i<=max_seats;i++)
        {
            
            query['seat_name'] = (cabin_type == 'first'?'A':(cabin_type == 'business'?'B':'C'))+i;
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
    
    //check if the flight id is a valid id
    if(!mongoose.isValidObjectId(req.params._id))
    {
        res.status(400).json({msg : 'the flight id is not a valid id'});
        return;
    }
    const flight = await Flight.findById(req.params._id);
    var query = {}

    if(!mongoose.isValidObjectId(req.params._id))
    {
        res.status(400).json({msg : "the passed flight id is not valid"});

        return;
    }
    
    if(body.flight_number)
    {
        if(isNaN(body.flight_number))
        {
            res.status(400).json({msg : "flight number should be a valid integer"});

            return;
        }
        const flight = await Flight.findOne({"flight_number":body.flight_number, "_id":{$ne : req.params._id}});
        if(flight)
        {
            res.status(400).json({msg : "a flight with the same flight number already exists"});
            return;
        }
        query['flight_number'] = body.flight_number;

    } 
    
    
    
        
    if(body.from)
    {
        query['from'] = body.from;
    }

    
    if(body.departure_terminal)
    {
        if(isNaN(body.departure_terminal))
        {
            res.status(400).json({msg : "the departure terminal should be a valid integer"});

            return;
        }
        query['departure_terminal'] = body.departure_terminal;
    }
   
    

    if(body.to)
    {
        query['to'] = body.to;
    }

    if(body.arrival_terminal)
    {
        if(isNaN(body.arrival_terminal))
        {
          res.status(400).json({msg : "the arrival terminal should be a valid integer"});

            return;
        }
        query['arrival_terminal'] = body.arrival_terminal;
    }
        
    

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
        if(d1 < new Date())
        {
            res.status(400).json({msg : 'the departure time can not be in the past'});
            return;
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
        if(query['departure_time'])
        {
            if(d1 < query['departure_time'])
            {
                res.status(400).json({msg : 'the arrival time can not be before the departure time'});
                return;
            }
        }
        else if(d1 < flight.arrival_time)
        {
            res.status(400).json({msg : 'the arrival time can not be before the departure time'});
            return;
        }
        
    }


    //economy seats
    if(body.economy_seats){
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
    if(body.business_seats){
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
    if(body.first_seats){
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
        if(!mongoose.isValidObjectId(req.params._id))
        {
            res.status(400).json({msg : "the flight id you have passed is not valid"});

            return;
        }
        Flight.findByIdAndRemove(req.params._id, req.body).then(async flight => {

            await FlightSeat.deleteMany({'flight_id': req.params._id});
            await Reservation.deleteMany({'departure_flight' : req.params._id});
            await Reservation.deleteMany({'return_flight' : req.params._id});
            res.json({ msg: 'flight entry deleted successfully' });
        })
            .catch(err => res.status(404).json({ error: 'No such a flight' }));

        
        console.log("I got here");
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

router.get("/user/:id", auth, async (req, res) => {
    var rsvids = []
    await Reservation.find({'user_id': req.params.id}).exec().then(//function(stuff){
        /*stuff.forEach(function(stuffling){
                rsvids.push(mongoose.Types.ObjectId(stuffling._id))
        })*/
        result => {
            res.json(result)
        }
    )
    /*var flightids = []
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
        });*/

    
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

    var dep_date;
    if(body.departure_date)
    {
        const departure_date = body.departure_date;
        dep_date = new Date(construct_date(departure_date));
        if(isNaN(dep_date))
        {
            res.status(400).json({msg: 'the departure date is not a valid date'});
            return;
        }
        console.log(departure_date);
        const d2 = new Date(construct_date(departure_date));
        
        d2.setDate(d2.getDate()+1);
        departure_query['departure_time']= {$gte:dep_date, $lt:d2};
    }
    else
    {
        res.status(400).json({msg: 'you need to specify the date of your departure'});
        return;
    }
    var ret_date;
    if(body.return_date)
    {
        const return_date = body.return_date;
        ret_date = new Date(construct_date(return_date));
        
        if(isNaN(ret_date))
        {
            res.status(400).json({msg: 'the return date is not a valid date'});
            return;
        }
        const d2 = new Date(construct_date(return_date));
        d2.setDate(d2.getDate()+1);
        return_query['departure_time']= {$gte:ret_date, $lt:d2};
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
    
    if(dep_date > ret_date)
    {
        res.status(400).json({msg: 'you can\'t specify the retun date before the departure date'});
        return;
    }
    if(dep_date < new Date() && !checkSameDay(dep_date, new Date()))
    {
        res.status(400).json({msg: 'the departure date can\'t be before today\'s date'});
        return;
    }

    
    const depart_flights = await Flight.find(departure_query);
    if(depart_flights.length==0)
    {
        res.status(404).json({msg: 'there are no departure flights with this search criteria'});
        return;
    }

    const return_flights = await Flight.find(return_query);
    if(return_flights.length==0)
    {
        res.status(404).json({msg: 'there are no return flights with this search criteria'});
        return;
    }

    res.json({'departure_flights' : depart_flights, 'return_flights':return_flights});

});

function checkSameDay(d1, d2)
{
    return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
}

// get the details of a flight with its id
router.get('/:flight_id', async(req,res)=>{
    const flight = await Flight.findOne({'_id':req.params.flight_id});
    if(flight)
    {
        res.json(flight);
    }
    else
    {
        res.status(404).json({msg:'flight with this id not found'});
    }
})



// getting all seats of a specific flight
router.get('/all_seats/:flight_id', auth, async (req,res)=>{
    const flight_id = req.params.flight_id;
    if(!mongoose.isValidObjectId(req.params.flight_id))
    {
        res.status(400).json({msg : "the flight id you have passed is not a valid id"});

        return;
    }
    const seats = await FlightSeat.find({'flight_id':flight_id});
    if(seats.length>0)
        res.json({res : seats});
    else
        res.status(404).json({msg : "no such flight"});
})

// get the details of a flight with its id + seat
router.get('/:flight_id/:seat', auth, async(req,res)=>{
    const flight = await FlightSeat.aggregate([
        {$match:{
            _id: mongoose.Types.ObjectId(req.params.seat)
        }},
        {$lookup: {
            from: "Flight",
            localField: "flight_id",
            foreignField: "_id",
            as: "flight_details"
        }
    }])
    if(flight)
    {
        res.json(flight);
    }
    else
    {
        res.status(404).json({msg:'flight with this id not found'});
    }
})


function construct_date(date)
{
    var day = date.day + "";
    if(date.day<10)
            day = 0+""+date.day;
    var month = date.month + "";
    if(date.month<10)
        month = 0+""+date.month
    return new Date(date.year + "-" + month + "-" + day + "T00:00:00.000Z");
}

// get all seats from a flight with the cabin

router.get("/all_seats/:id/:cabin", auth, (req,res)=>{
    console.log(req.params.id);
    if(!mongoose.isValidObjectId(req.params.id))
    {
        res.status(400).json({msg : "the flight id you have passed is not a valid id"});
        return;
    }
    if(req.params.cabin!=='economy' && req.params.cabin!=='business' && req.params.cabin!=='first')
    {
        res.status(400).json({msg : "the cabin type is not valid. please choose between economy, business and first"});
        return;
    }
    FlightSeat.find({"flight_id":req.params.id,"seat_type":req.params.cabin}).then(
         (result)=>{
             res.json(result);
         }
     ).catch(
         (err)=>{
            console.log(err);
         }
     )
});






module.exports = router