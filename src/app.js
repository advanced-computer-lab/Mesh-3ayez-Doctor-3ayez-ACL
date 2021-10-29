const express = require("express");
const mongoose = require('mongoose');

const MongoURI = require("../config/keys").MongoURI ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const Flight = require('./models/Flight');

var Xmas95 = new Date('2022-12-13');

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
Flight.find(function(err,res)
{
    if(!err)
        console.log(res);
});