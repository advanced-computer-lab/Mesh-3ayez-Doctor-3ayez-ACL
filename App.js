const express = require('express')
const path = require('path')


const app = express()

// middleware functions to parse the body and url of the post request

app.use(express.json())
app.use(express.urlencoded({extended : false}))


// all flights API routes
app.use('/api/flights', require('./routes/api/flights'))



const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server running on port ${PORT}`));
