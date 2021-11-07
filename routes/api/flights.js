const express = require('express')
const moment = require('moment')
const router = express.Router()

const Flight = require('../../src/Models/Flight');
const User = require('../../src/Models/User');

// APIs here

//Get all flights

router.get("/", (req, res) => {
    Flight.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
})

//Create Flight

router.post("/", (req, res) => {
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
});

//Update Flight details

router.put('/:_id',function( req, res){
 
    console.log(req.body);
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

    

        
    
        
        Flight.findByIdAndUpdate(req.params._id, query).then((result)=>(res.json({msg:"Updated Successfully"})))
        .catch((err)=>(res.json({msg:"Not Found"})));


});


router.post('/search', async (req, res) => {
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
});


// delete flight
router.delete('/:_id', (req, res) => {
    Flight.findByIdAndRemove(req.params._id, req.body).then(flight => res.json({ msg: 'flight entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a flight' }))
})

module.exports = router