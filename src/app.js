const express = require("express");
const mongoose = require('mongoose');
const app= express();
const port =5000||process.env.port;
const cors =require("cors");

require('dotenv').config({path : __dirname+'/../config/.env'});



const MongoURI = process.env.MONGOURI ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));

mongoose.set('debug', true);

// defining the middleware functions to parse the body of the requests
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cors());
// defining the path for all APIs regarding flights
app.use('/api/flights', require('../routes/api/flights'))
app.use('/api/flight_seats', require('../routes/api/flightSeats'))

// defining the path for all APIs regarding users
app.use('/api/users', require('../routes/api/users'))


// defining the path for all APIs regarding reservations
app.use('/api/reservations', require('../routes/api/reservations'))

app.use('/api/login', require('../routes/api/login'))
app.use('/api/register', require('../routes/api/register'))




const PORT = process.env.PORT | 8000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
