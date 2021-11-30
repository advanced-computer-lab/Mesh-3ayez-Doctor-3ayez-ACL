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

router.post("/", async(req, res) => {
    if(await checkAdmin()){
    const data = req.body;
    Flight.find(data)
        .then(result => {
            if (result.length == 0) {
                const newFlight = new Flight(data);
                newFlight.save()
                    .then(() => {
                        res.setHeader("Content-Type", "application/json")

                        res.status(200).json({ success: true, msg: `Flight created` })

                    })
                    .catch(() => {
                        res.setHeader("Content-Type", "application/json")
                        res.json({ success: false, msg: `Flight is not created` })
                    });

            } else {
                res.setHeader("Content-Type", "application/json")
                res.json({ success: false, msg: `Flight already exists` });
            }
            // res.json(result);
        })
        .catch(err => {
            console.log(err);
        }
        )
    }
    else
    {
        res.json({msg: "you are not authorized to add a new flight"});
    }
});

//Update Flight details

router.put('/:_id',async (req, res) =>{
 
    if(await checkAdmin()){
    const body = req.body;
    var query = {}
    if(body.flight_number)
        {
            if(!isNaN(body.flight_number))
               {
                    query['flight_number'] = body.flight_number;
               } 
        }
    if(body.from)
    {
        query['from'] = body.from;
    }
    if(body.to)
    {
        query['to'] = body.to;
    }

    if(body.departure_time)
    {
        
        if(moment(body.departure_time, "YYYY-MM-DDTHH:MM", true) )
            {
                const d1 = new Date(body.departure_time);
                d1.setHours(d1.getHours()+2);
                
             
                query['departure_time'] = d1;
            }
    }

    
    if(body.arrival_time)
    {

        console.log("here");
        
        if(moment(body.arrival_time, "YYYY-MM-DDTHH:MM", true) )
            {

                
                const d1 = new Date(body.arrival_time);

                d1.setHours(d1.getHours()+2);
                console.log(d1);
             
                
                query['arrival_time'] = d1;
            }
    }

    if(body.economy_seats)
    {
        if(!isNaN(body.economy_seats))
               {
                    query['economy_seats'] = body.economy_seats;
               } 
    }


    if(body.business_seats)
    {
        if(!isNaN(body.business_seats))
               {
                    query['business_seats'] = body.business_seats;
               } 
    }
    
    if(body.first_seats)
    {
        if(!isNaN(body.first_seats))
               {
                    query['first_seats'] = body.first_seats;
               } 
    }
        
    
        
        Flight.findByIdAndUpdate(req.params._id, query).then(async (result)=>{
            const row = await Flight.find({'_id': req.params._id});
            res.json(row);
            
        })
        .catch((err)=>(res.json({msg:"Not Found"})));
    }
    else
    {
        res.json({msg:'you are not authorized to update any flights'});
    }

});


router.post('/search', async (req, res) => {

    if(await checkAdmin()){
    const body = req.body;
    var query = {}
    if(body.flight_number)
        {
            if(!isNaN(body.flight_number))
               {
                    console.log("here");    
                    query['flight_number'] = body.flight_number;
               } 
        }
    if(body.from)
    {
        const regex = new RegExp(body.from, 'i')
        query['from'] = { $regex: regex };
    }
    if (body.to) {
        const regex = new RegExp(body.to, 'i')
        query['to'] = { $regex: regex };
    }

    if(body.departure_time)
    {
        
        if(moment(body.departure_time, "YYYY-MM-DDTHH-MM", true) )
            {
                const d1 = new Date(body.departure_time);
                d1.setHours(d1.getHours()+2);
                const d2 = new Date(body.departure_time);
                d2.setHours(d2.getHours()+2);
                d2.setMinutes(d2.getMinutes()+1);
             
                query['departure_time'] = {$gte: d1 , $lt: d2};
            }
    }

    
    if(body.arrival_time)
    {
        
        if(moment(body.arrival_time, "YYYY-MM-DDTHH-MM", true) )
            {
                const d1 = new Date(body.arrival_time);
                d1.setHours(d1.getHours()+2);
                const d2 = new Date(body.arrival_time);
                d2.setHours(d2.getHours()+2);
                d2.setMinutes(d2.getMinutes()+1);
             
                
                query['arrival_time'] = {$gte: d1 , $lt: d2};
            }
    }




    const ans = await Flight.find(query);
    res.json(ans)
}
else{
    res.json({msg: 'you are not authorized to search for flights'});
}
});


// delete flight
router.delete('/:_id', async(req, res) => {
    if(await checkAdmin()){
    Flight.findByIdAndRemove(req.params._id, req.body).then(flight => res.json({ msg: 'flight entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a flight' }))
}
else{
    res.json({msg: 'you are not authorized to delete any flights'});
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

module.exports = router