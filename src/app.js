const express = require("express");
const mongoose = require('mongoose');
const app= express();
const port =5000||process.env.port;
const cors =require("cors");

const MongoURI = require("../config/keys").MongoURI ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));



// defining the middleware functions to parse the body of the requests
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cors());
// defining the path for all APIs regarding flights
app.use('/api/flights', require('../routes/api/flights'))



// const dummyRec ={
// From:"oo",
// To:"yyy",                               // the line below me is important
// FLight_Date: '2022-12-13',       //==>> I dont actually know how to insert a date, Maybe we have to changed DATE type from the schema 
// Cabin:"Eco",                        //     the line above me is important
// Available_Seats:20
// };
// const ndummyRec=new Date(dummyRec.FLight_Date);
//dummyRec.save();
// dummyRec['FLight_Date']=new Date(dummyRec.FLight_Date);


const PORT = process.env.PORT | 8000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
