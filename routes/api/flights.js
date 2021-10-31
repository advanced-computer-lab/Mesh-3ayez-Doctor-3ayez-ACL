const express = require('express')

const router = express.Router()

const Flight = require('../../src/Models/Flight');

// APIs here


router.post("/createFlight", (req, res) => {
    const data = req.body;
    Flight.find(data)
        .then(result => {
            if (result.length == 0) {
                const newFlight = new Flight(data);
                newFlight.save()
                    .then(console.log("created successfully"))
                    .catch(err => console.log("not created"));

            } else {
                console.log("Already existing");
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        }
        )
});


module.exports = router