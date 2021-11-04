const express = require('express')
const moment = require('moment')
const router = express.Router()

const Flight = require('../../src/Models/Flight');

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
                    .then(console.log("created successfully"))
                    .catch(err => console.log("not created"));

            } else {
                res.status(400).json({msg:`Flight already exists`});
            }
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({msg:`Flight already exists`});
        }
        )
});

//Update Flight details
router.put('/:id',function( req, res){
    let orgRec;
    Flight.find({"_id":req.params.id},function(err,response){
            if(!err)
                {
                    orgRec=JSON.parse(JSON.stringify(response[0]));
                    const updatedRec = req.body;
                 
                    
                    const rec={
                        "From":updatedRec.From?updatedRec.From:orgRec.From,
                        "To":updatedRec.To?updatedRec.To:orgRec.To,
                        "Flight_Date":updatedRec.Flight_Date?updatedRec.Flight_Date:orgRec['Flight Date'],
                        "Cabin":updatedRec.Cabin?updatedRec.Cabin:orgRec.Cabin,
                        "Available_Seats":updatedRec.Available_Seats?updatedRec.Available_Seats:orgRec['Seats Available on Flight']
                    };
                    res.json(rec);
                    Flight.update({_id:req.params.id},
                        {$set:{From:rec.From,
                               To:rec.To,
                               "Flight Date":rec.Flight_Date,
                               Cabin:rec.Cabin,
                               'Seats Available on Flight':rec.Available_Seats
                        }},
                        function(err,N){
                        if(!err)
                            console.log(N);
                    });
                    
                }
            else
                console.log(err);    
    });

   
  

});


router.get('/search', async (req,res)=>{
    const body = req.body;
    var query = {}
    if(body.flight_number)
        {
            if(Number.isInteger(body.flight_number))
                query['flight_number'] = body.flight_number;
        }
    if(body.from)
    {
        const regex = new RegExp(body.from, 'i')
        query['from'] = {$regex: regex};
    }
    if(body.to)
    {
        const regex = new RegExp(body.to, 'i')
        query['to'] = {$regex: regex};
    }

    if(body.departure_time)
    {
        
        if(moment(body.departure_time, "YYYY-MM-DD", true) )
            {
                
                
                query['departure_time'] = new Date(body.departure_time);
            }
    }

    
    if(body.arrival_time)
    {
        
        if(moment(body.arrival_time, "YYYY-MM-DD", true) )
            {
                
                
                query['arrival_time'] = new Date(body.arrival_time);
            }
    }

    

    
     const ans = await Flight.find(query);
     res.json(ans)
});


// delete flight
router.delete('/:_id',(req,res) => {
    Flight.findByIdAndRemove(req.params._id,req.body).then(flight=>res.json({msg:'flight entry deleted successfully'}))
    .catch(err=>res.status(404).json({error:'No such a flight'}))
})

module.exports = router