const express = require('express')
const moment = require('moment');
const { Query } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const Reservation = require('../../src/Models/Reservation');
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
        if(!body.flight_number)
        {
            res.status(400).json({msg:'flight number is a required field'});
            return;
        }
        else if(isNaN(body.flight_number))
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

        if(!body.departure_terminal)
        {
            res.status(400).json({msg:'the origin airport terminal is a required field'});
            return;
        }
        else if(isNaN(body.departure_terminal))
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

        if(!body.arrival_terminal)
        {
            res.status(400).json({msg:'the destination airport terminal is a required field'});
            return;
        }
        else if(isNaN(body.arrival_terminal))
        {
            res.status(400).json({msg:'the destination airport terminal is not valid'});
            return;
        }
        else
            query['arrival_terminal'] = body.arrival_terminal;

        if(!body.economy_seats)
        {
            res.status(400).json({msg:'the number of economy seats is a required field'});
            return;
        }
        else if(isNaN(body.economy_seats))
        {
            res.status(400).json({msg:'the number of economy seats must be an integer'});
            return;
        }
        else
            query['economy_seats'] = body.economy_seats

        if(!body.business_seats)
        {
            res.status(400).json({msg:'the number of business seats is a required field'});
            return;
        }
        else if(isNaN(body.business_seats))
        {
            res.status(400).json({msg:'the number of business seats must be an integer'});
            return;
        }
        else
            query['business_seats'] = body.business_seats

        if(!body.first_seats)
        {
            res.status(400).json({msg:'the number of first class seats is a required field'});
            return;
        }
        else if(isNaN(body.first_seats))
        {
            res.status(400).json({msg:'the number of first class seats must be an integer'});
            return;
        }
        else
            query['first_seats'] = body.first_seats

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

        const flights = await Flight.find(query, 'flight_number');
        if(flights.length>0)
        {
            res.status(400).json({msg : 'flight aready exists'});
        }
        else
        {
            const newFlight = new Flight(query);
            newFlight.save().then(()=>{
                res.status(201).json({msg : 'flight created successfully'});
            }).catch(err=>{
                res.status(500).json('the server has encountered an internal error sorry for disturbance');
            })
            
        }

    }
    else
    {
        res.status(403).json({msg: "you are not authorized to add a new flight"});
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
            else{
                res.status(400).json({msg:'the flight number should be an integer'});
                return;
            }
        }
    if(body.from)
    {
        query['from'] = body.from;
    }

    if(body.departure_terminal)
    {
        if(!isNaN(body.departure_terminal))
            query['departure_terminal'] = body.departure_terminal
        else
            {
                res.status(400).json({msg:'invalid terminal number'})
                return;
            }
    }

    if(body.to)
    {
        query['to'] = body.to;
    }

    if(body.arrival_terminal)
    {
        if(!isNaN(body.arrival_terminal))
            query['arrival_terminal'] = body.arrival_terminal
        else
            {
                res.status(400).json({msg:'invalid terminal number'})
                return;
            }
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

    if(body.economy_seats)
    {
        if(!isNaN(body.economy_seats))
        {
            query['economy_seats'] = body.economy_seats;
        } 
        else{
            res.status(400).json({msg:'the number of economy seats should be an integer'});
            return;
        }
    }


    if(body.business_seats)
    {
        if(!isNaN(body.business_seats))
        {
            query['business_seats'] = body.business_seats;
        } 
        else{
            res.status(400).json({msg:'the number of business seats should be an integer'});
            return;
        }
    }
    
    if(body.first_seats)
    {
        if(!isNaN(body.first_seats))
        {
            query['first_seats'] = body.first_seats;
        } 
        else{
            res.status(400).json({msg:'the number of first class seats should be an integer'});
            return;
        }
    }
        
    
        
        Flight.findByIdAndUpdate(req.params._id, query).then(async (result)=>{
            const row = await Flight.find({'_id': req.params._id});
            res.json(row);
            
        })
        .catch((err)=>(res.status(404).json({msg:"there is not flight with such id"})));
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
    if(body.flight_number)
        {
            if(!isNaN(body.flight_number))
               {
                    query['flight_number'] = body.flight_number;
               }
            else
            {
                res.status(400).json({msg:'the flight number should be an integer'});
                return;
            }
        }
    if(body.from)
    {
        const regex = new RegExp(body.from, 'i')
        query['from'] = { $regex: regex };
    }

    if(body.departure_terminal)
    {
        if(!isNaN(body.departure_terminal))
            query['departure_terminal'] = body.departure_terminal
        else
            {
                res.status(400).json({msg:'invalid terminal number'})
                return;
            }
    }

    if (body.to) {
        const regex = new RegExp(body.to, 'i')
        query['to'] = { $regex: regex };
    }

    if(body.arrival_terminal)
    {
        if(!isNaN(body.arrival_terminal))
            query['arrival_terminal'] = body.arrival_terminal
        else
            {
                res.status(400).json({msg:'invalid terminal number'})
                return;
            }
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

module.exports = router