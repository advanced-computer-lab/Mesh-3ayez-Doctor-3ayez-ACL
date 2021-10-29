const express = require("express");
const mongoose = require('mongoose');

const MongoURI = 'mongodb+srv://ACLDatabase:*_s.mmrqMzs.2Y7@cluster0.e68ah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const Flight = require('./models/Flight');

var Xmas95 = new Date(1995, 11, 25);

// const dummyRec = new Flight({
// From:"oo",
// To:"yyy",                                the line below me is important
// FLight_Date: '2022-12-13',       ==>> I dont actually know how to insert a date, Maybe we have to changed DATE type from the schema 
// Cabin:"Eco",                             the line above me is important
// Available_Seats:20
// });
// dummyRec.save();

Flight.find(function(err,res)
{
    if(!err)
        console.log(res);
});