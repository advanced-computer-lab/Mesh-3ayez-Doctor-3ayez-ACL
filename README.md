![Tijwal (1)](https://user-images.githubusercontent.com/83404871/147373192-68de0612-6e7c-42d7-ba48-f4af78489dd1.jpg)
# Tijwal
An Airline Reservation web application through which individuals can reserve and pay for flights in order to travel to different countries and sometimes domestic cities.

# Motivation
###### The following are the objectives of this project:
* Master working with *MERN Stack*.
* Work using the Agile Methodology to plan out a project and develop the software.
* Practice working together as a team on GitHub.
* Learn the process of following a given set of System Requirements to develop a software. 
# Tech/Framework used
### we used MERN Stack framework to create the Application
##### Database 
* [Mongo DB](https://www.mongodb.com/) - The only database that harnesses the innovations of NoSQL.
##### Node.js Framework
* [Express JS](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
##### Front end
* [React JS](https://reactjs.org/) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
##### Back end
* [Node JS](http://nodejs.org/) - A platform built on Chrome's JS runtime for easily building fast, scalable network apps.
# How to use?
### Built with
Visual Studio Code  [DOwnload](https://code.visualstudio.com/download)

### Prerequisets
* After Cloning the repository.
* Open a new Terminal.
* open the source directory. `cd src`
* Run the server! `npm run dev`
* open the client directory. `cd client`
* open the source directory. `cd crs`
* Run front end. `npm start`

### 


# API reaferences

### Flights
##### 1.Show all flights
 - Route `flights\`
 - Request type `GET`
 - Response Body

```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
}
   // All the available flights in the database
```


##### 2.Create a flights
 - Route `flights\`
 - Request type `POST`
 - Request Body

```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
}
```
- Response Body

```
{msg : 'flight created successfully'}
// or 
{msg:'flight number must be an integer'}
// or 
{msg:'the origin airport is a required field'}
// or 
{msg:'the origin airport terminal is not valid'}
// or 
{msg:'the destination airport terminal is not valid'}
// or 
{msg:'the number of economy seats must be an integer'}
// or 
{msg:'the price of economy seats must be a valid decimal'}
// or 
{msg:'the ammount of baggage allowed for economy class must be a valid decimal'}
// or 
{msg:'the number of first class seats must be an integer'}
// or 
{msg:'the price of first class seats must be a valid decimal'}
// or 
{msg:'the ammount of baggage allowed for first class must be a valid decimal'}
// or 
{msg:'the departure time is not a valid date time'}
// or 
{msg:'the arrival date and time is a required field'}
// or 
{msg:'the arrival time is not a valid date time'}
// or 
{msg : 'flight aready exists'}
// or 
{msg: "you are not authorized to add a new flight"}

```
##### 3.Update Flight details
 - Route `flights\_id`
 - Request type `PUT`
 - Request Body

```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
    
    //Any of the Attributes given will be updated and the others will remain the same
}
```
- Response Body 
```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
}
// or 
{msg : "flight number should be a valid integer"}
// or 
{msg : "a flight with the same flight number already exists"}
// or 
{msg : "the departure terminal should be a valid integer"}
// or 
{msg : "the arrival terminal should be a valid integer"}
// or 
{msg:'departure time is not a valid date time'}
// or 
{msg:'arrival time is not a valid date time'}
// or 
{msg:'you are not authorized to update any flights'}
// or 
{msg:"there is not flight with such id"}
// or 
{msg:'the allowed baggage of first class seats should be a valid double'}
```


##### 4.Search for flights
 - Route `flights\search`
 - Request type `POST`
 - Request Body
```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
    
    //Any of the attributes given will be searched by
}
```
- Response Body
```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
    //List of all flights that match search
}
//or
{msg:'departure time is not a valid date time'}
//or
{msg:'arrival time is not a valid date time'}
//or
{msg: 'you are not authorized to search for flights'}
```

##### 5.Delete a Flight
 - Route `flights\_id`
 - Request type `DELETE`
 - Request Response
 
 ```
 { msg: 'flight entry deleted successfully' }
  //or
 {msg : "the flight id you have passed is not valid"}
 //or
 {msg: 'you are not authorized to delete any flights'}
 ```

##### 6.Get All Reserved Flights by a user
 - Route `flights\user\_id`
 - Request type `GET`
 - Request Response
 ```
{
    _id:61c4e9af2c27d255710d8cac,
    user_id:61bcd1e7bf1ace92644c0287,
    departure_flight:61c4d7459f95b2bb051dd778,
    return_flight:61bf2bc5c93bc7a6a0dee465,
    cabin_type:"economy",
    number_of_passengers:2,
    price:550,
    paid:0,
    __v:0
}
//or
{msg:"Flight Doesn't exist"}
```

##### 7.User search for departure and return flights
 - Route `flights\user_search_flights`
 - Request type `POST`
 - Request Body
 ```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
    
    //Any of the attributes given will be searched by
}
```
- Response Body
```
{
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
    //List of all flights that match search
}
//or
{msg: 'you need to specify the origin airport'}
//or
{msg: 'you need to specify the destination airport'}
//or
{msg: 'the departure date is not a valid date'}
//or
{msg: 'you need to specify the date of your departure'}
//or
{msg: 'the return date is not a valid date'}
//or
{msg: 'you need to specify the date of your return'}
//or
{msg: 'you need to specify the cabin type'}
//or
{msg: 'the number of passengers must be a valid integer'}
//or
{msg: 'the cabin type is not valid please choose between (economy, business, first)'}
//or
{msg: 'you can\'t specify the retun date before the departure date'}
//or
{msg: 'the departure date can\'t be before today\'s date'}
//or
{msg: 'there are no departure flights with this search criteria'}
//or
{msg: 'there are no return flights with this search criteria'}
```

##### 8.get the details of a flight with its id
 - Route `flights\_id`
 - Request type `GET`
 - Request Response 
 ```
 {
    flight_number:15,
    from:"Munich",
    departure_terminal:2,
    to:"Cairo",
    arrival_terminal:15,
    economy_seats:{
            max_seats:20,
            available:20,
            price:15.5,
            baggage_allowance:22
            },
    business_seats:{
            max_seats:8,
            available:8,
            price:50,
            baggage_allowance:30.5,
            }
    first_seats:{
            max_seats:1,
            available:1,
            price:1550.99,
            baggage_allowance:45.9
            }
    departure_time:2021-12-15T22:00:00.000+00:00,
    arrival_time:2021-12-16T03:00:00.000+00:00,
    __v:0
}
//or
{msg:'flight with this id not found'}
```

##### 9.getting all seats of a specific flight
 - Route `flights\all_seats\:flight_id`
 - Request type `GET`
 - Request Response
```
{
    _id:61aa2bf03c1776af5683b9b7,
    flight_id:61aa2bf03c1776af5683b9b2,
    reservation_id:null,
    seat_type:"economy",
    seat_name:"C3",
    __v:0
    //get all seats that have the same flight id
}
//or
{msg : "no such flight"}
```

##### 10.get all seats from a flight with the cabin
 - Route `flights\all_seats\:flight_id`
 - Request type `GET`
 - Request Response
 ```
 {
    _id:61aa2bf03c1776af5683b9b7,
    flight_id:61aa2bf03c1776af5683b9b2,
    reservation_id:null,
    seat_type:"economy",
    seat_name:"C3",
    __v:0
    //get all seats that have the same flight id and cabin
}
//or
{msg : "the cabin type is not valid. please choose between economy, business and first"}
//or
{msg : "the flight id you have passed is not a valid id"}
}
```

### Seats

##### 1.Get a seat
- Route `flightSeats\seats_id`
 - Request type `GET`
 - Request Response
 ```
 {
  {
    _id:61aa2bf03c1776af5683b9b7,
    flight_id:61aa2bf03c1776af5683b9b2,
    reservation_id:null,
    seat_type:"economy",
    seat_name:"C3",
    __v:0
    //get all seats that have the same flight id and cabin
}
//or
{msg: 'there is no such seat'}
//or
{msg : 'the seat id is not a valid id'}
```
### Login
- Route `login\`
 - Request type `POST`
 - Request Body
 ```
 {
    username:"nadaabdo558"
    password:"$2a$10$UVmu9E2PrmLWcafVc3PG8u27E60gSYnCiO1lIkgkdpTrqK3mAjyWy"
}
```
- Request Response
```
{msgSrc:"email",msg:"Username is required"}
//or
{msgSrc:"password",msg:"Password is required"}
//or
{msgSrc:"username-credentials",msg:"Username does not exist"}
//or
{msgSrc:"password-credentials",msg:"Incorrect password"}
//or
{"token":token,"user":user}
```
### Register
- Route `Register\`
 - Request type `POST`
 - Request Body
 ```
 {
     _id:61bcd1e7bf1ace92644c0287,
    username:"nadaabdo558",
    password:"$2a$10$UVmu9E2PrmLWcafVc3PG8u27E60gSYnCiO1lIkgkdpTrqK3mAjyWy",
    first_name:"nada",
    last_name:"abdo",
    email:"body5045@gmail.com",
    passport:1234,
    __v:0
}
```
- Request Response
```
{token:token,user:user}
//or
{msgSrc:"taken",msg:"User already exists. Please Login"}
//or
{msgSrc: "email", msg: "Please enter a valid email"}
//or
{msgSrc:"missing input",msg:"All input is required"}
```

### Reservations

##### 1. Create A Reservation

- Route `reservations\`

- Request type `POST`

- Request Body

```
{
user_id:  "61bcd1e7bf1ace92644c0287"

departure_flight:  departure.flight_id,

return_flight:  ret.flight_id,

number_of_passengers:  Number(departure.number_of_passengers),

cabin_type:  departure.cabin_type,

departure_seats:  reservedDepSeats,

return_seats:  reservedRetSeats,

stripeToken:token
}
```

- Response Body

```
{msg :  "there is no such user with this id"}

// or

{msg :  "this user id is not a valid id"}

// or

{msg :  "you need to specify the user id"}

// or

{msg :  "there is no such departure flight with this id"}

// or

{msg :  "this departure flight id is not a valid id"}

// or

{msg :  "you need to specify the departure flight id"}

// or

{msg :  "there is no such return flight with this id"}

// or

{msg :  "this return flight id is not a valid id"}

// or

{msg :  "you need to specify the return flight id"}

// or

{msg :  'the number of passengers should be a valid integer'}

// or

{msg :  'you need to specify the number of passengers'}

// or

{msg :  'the number of passengers must be less than the available seats in the chosen cabin in the departure flight'}

// or

{msg :  'the number of passengers must be less than the available seats in the chosen cabin in the return flight'}

// or

{msg :  'the cabin type is incorrect. please choose between economy, business, and first'}

// or

{msg :  'you need to specify the cabin type'}

// or

{msg :  'the number of chosen seats in the departure flight should be equal to the number of passengers'}

// or

{msg :  `foo is not a valid id`}

// or

{msg :  `the seat with id foo does not exist in the departure flight`}

// or

{msg :  `the seat with id ${body.departure_seats[i]} is already reserved`}

// or

{msg :  `all seats must have the same cabin type`}

// or

{msg :  'you should specify the departure flight seats'}

// or

{msg :  'the number of chosen seats in the return flight should be equal to the number of passengers'}

// or

{msg :  'the seat with id foo does not exist in the return flight'}

// or

{msg :  'you should specify the return flight seats'}

// or

{msg :  "customer error"}

// or

{msg:  'payment error'}

// or

{msg :  'reservation created successfully'}

// or

{msg :  'the server has encountered a problem. sorry for disturbance'}
```

##### 2. Change Reservation Seats

- Route `reservations\change_seats\`

- Request Type `PUT`

- Response Body

```
{msg :  'the reservation id is not a valid id'}

// or

{msg :  'the user id is not a valid id'}

// or

{msg :  'the flight id is not a valid id'}

// or

{msg :  'foo is not a valid seat id'}

// or

{msg :  'there is no such user with the passed id'}

// or

{msg :  'there is no such reservation for this user'}

// or

{msg :  'this user has no reserved flight with this flight id'}

// or

{msg :  'the number of seats to be reserved should be equal to the number of seats for this reservation'}

// or

{msg :  `there is no seat with id foo`}

// or

{msg:  'one of the passed seats dos not belong to this flight'}

// or

{msg:  'all seats must have the same cabin type as the reservation cabin type'}

// or

{msg:  'one of the seats is already reserved by another passenger'}

// or

{msg:  'reservation updated successfully'}
```

##### 3. Change Reservation Flights

- Route `reservations\changeFlight`

- Request Type `PUT`

- Request Body

```
{msg:"the old flight id is not a valid id"}

// or

{msg:"the reservation id is not a valid id"}

// or

{msg:"the user id is not a valid id"}

// or

{msg:"the user does not exist"}

// or

{msg:"there is no reservation with such id"}

// or

{msg:"this reservation does not belong to this user"}

// or

{msg:"the old flight does not belong to this reservation"}

// or

{msg:"the new flight id was not provided"}

// or

{msg:"the new seats were not provided"}

// or

{msg:"the number of seats should be equal to the number of passengers"}

// or

{msg:"one of the seats id is not a valid id"}

// or

{msg :  "on of the new seats does not exist"}

// or

{msg :  "on of the new seats does not belong to the new flight"}

// or

{msg:  "one of the new seats has a different cabin type"}

// or

{msg :  "on of the new seats is already reserved"}

// or

{msg :  "customer error"}

// or

{msg:  'payment error'}

// or

{msg :  "the reservation was updated successfully"}
```

##### 4. Getting All Replacement Flights For A Reservation

- Route `reservations\all_possible_flights\`

- Request Type `GET`

- Response Body

```
{msg :  'the reservation id is not a valid id'}

// or

{msg :  "the reservation does not exist"}

// or

{msg :  'you need to specify if you are coming from the source or the destination'}

// or

{msg :  'you can not change the departure flight after its departure time'}

// or

{msg :  'you can not change the departure flight after its departure time'}

// or

[{

flight_number:15,

from:"Munich",

departure_terminal:2,

to:"Cairo",

arrival_terminal:15,

economy_seats:{

max_seats:20,

available:20,

price:15.5,

baggage_allowance:22

},

business_seats:{

max_seats:8,

available:8,

price:50,

baggage_allowance:30.5,

}

first_seats:{

max_seats:1,

available:1,

price:1550.99,

baggage_allowance:45.9

}

departure_time:2021-12-15T22:00:00.000+00:00,

arrival_time:2021-12-16T03:00:00.000+00:00,

__v:0

}]
```

##### 5. Searching For a Specific Replacement Flight For A Reservation

- Route `reservations\find_flights\`

- Request Type `POST`

- Request Body

```
{

from:  'Cairo',

to:  'Bali',

cabin_type:  'economy',

number_of_passengers:  1,

source:  editDep

}
```

- Response Body

```
{msg:"the reservation id is not a valid id"}

// or

{msg :  "the reservation does not exist"}

// or

{msg :  'please specify the cabin type'}

// or

{msg :  'no results found'}

// or

{msg:"you need to specify which flight you need to replace"}

// or

{msg :  'you need to specify the date of the desidred flight'}

// or

{msg :  'you can not search for a flight before today's date'}

// or

{msg :  'you can not search for a departure flight after the return flight'}

// or

{msg :  'your flight has already taken off'}

// or

[{

flight_number:15,

from:"Munich",

departure_terminal:2,

to:"Cairo",

arrival_terminal:15,

economy_seats:{

max_seats:20,

available:20,

price:15.5,

baggage_allowance:22

},

business_seats:{

max_seats:8,

available:8,

price:50,

baggage_allowance:30.5,

}

first_seats:{

max_seats:1,

available:1,

price:1550.99,

baggage_allowance:45.9

}

departure_time:2021-12-15T22:00:00.000+00:00,

arrival_time:2021-12-16T03:00:00.000+00:00,

__v:0

}]
```

##### 6. Send Mail

- Route `reservations\send_me_mail`

- Request Type `POST`

- Response Body

```
{msg :  'the user id is not a valid id'}

// or

{msg :  'the reservation id is not a valid id'}

// or

{msg :  'this user does not exist'}

// or

{msg :  'there is no reservation with this id'}

// or

{msg :  'you are not authorized to view this reservation'}

// or

{msg :  'mail sent successfully'}
```
  
  

### Users

  

##### 1.User Cancel a Reservation

- Route `users\reservation`

- Request type `DELETE`

- Response Body

  
```


{msg : 'the user id is not a valid id'}



// or



{msg : 'the reservation id is not a valid id'}



// or



{msg : 'this user is not found'}



// or



{msg:"deleted successfully"}



// or



{msg: 'no such reservations for this specific user'}

```

// Deletes a reservation from the database
  

##### 2. User Get Reservation Itinerary

- Route `users\itinerary`

- Request type `GET`

- Response Body
```
{"departure_flight":{"economy_seats":{"max_seats":40,"available":36,"price":{"$numberDecimal":"250"},"baggage_allowance":{"$numberDecimal":"30"}},"business_seats":{"max_seats":20,"available":14,"price":{"$numberDecimal":"500"},"baggage_allowance":{"$numberDecimal":"45"}},"first_seats":{"max_seats":5,"available":5,"price":{"$numberDecimal":"1000"},"baggage_allowance":{"$numberDecimal":"50"}},"_id":"61bf2b93c93bc7a6a0dee3dd","flight_number":1256,"from":"Cairo","departure_terminal":1,"to":"Bali","arrival_terminal":5,"departure_time":"2021-12-27T16:45:45.000Z","arrival_time":"2021-12-31T15:00:45.000Z","__v":0},"return_flight":{"economy_seats":{"max_seats":40,"available":31,"price":{"$numberDecimal":"250"},"baggage_allowance":{"$numberDecimal":"30"}},"business_seats":{"max_seats":20,"available":11,"price":{"$numberDecimal":"500"},"baggage_allowance":{"$numberDecimal":"45"}},"first_seats":{"max_seats":5,"available":1,"price":{"$numberDecimal":"1000"},"baggage_allowance":{"$numberDecimal":"50"}},"_id":"61bf2bc5c93bc7a6a0dee465","flight_number":1257,"from":"Bali","departure_terminal":1,"to":"Cairo","arrival_terminal":5,"departure_time":"2021-12-31T14:00:45.000Z","arrival_time":"2021-12-31T15:00:45.000Z","__v":0},"reservation_number":"61c73c8f736c30248a9bba95","departure_seats":[{"_id":"61bf2b94c93bc7a6a0dee41b","flight_id":"61bf2b93c93bc7a6a0dee3dd","reservation_id":"61c73c8f736c30248a9bba95","seat_type":"first","seat_name":"A1","__v":0}],"return_seats":[{"_id":"61bf2bc5c93bc7a6a0dee4a5","flight_id":"61bf2bc5c93bc7a6a0dee465","reservation_id":"61c73c8f736c30248a9bba95","seat_type":"first","seat_name":"A3","__v":0}],"cabin_type":"first","total_price":{"$numberDecimal":"2000"},"amount_paid":{"$numberDecimal":"0"}}

// or

{msg:'no such reservation for this specific user'}
```
##### 3. Update User Information

- Route `users\`

- Request type `PUT`

- Request Body

```
{
first_name:  "Youssef",

last_name:  "Ziad",

email:  "yzfm2000@gmail.com",

Passport:  123
}
```

- Response Body

```
{msg :  'the id you have sent is not a valid id'}

// or

{msg :  'no such user'}

// or

{msg :  'the passport you have entered is not valid'}

// or

{msg :  'the email you have entered is not valid'}
```

##### 4. User Change Password

- Route `users/changePassword/`

- Request Type `PUT`

- Request Body

```
{
oldPassword: 'cookies',
password: 'newcookies'
}
```

- Response Body

```
{msg :  'the id you have sent is not a valid id'}

// or

{msg :  'no such user'}

// or

{msg :  'the Old Password you have entered is not correct'}
```

##### 5. Get User Info

- Route `users/`

- Request Type `GET`

- Response Body

```
{

"_id": "61c731d494f7fd5a1fdef011",

"username": "youssef ziad",

"password": "$2a$10$jy0dc39j8pUjVb/FOx76v.i5FvovlYG7K7exYv7jjKOzV0W8I67OG",

"first_name": "Youssef",

"last_name": "Ziad",

"email": "youssefziad",

"passport": 122,

"home_address": "Masr",

"country_code": 20,

"mobile_number": 1019816933,

"__v": 0

}
```

##### 6. User Forget Password

- Route `users\`

- Request Type `PUT`

- Request Body

```
{
username: 'youssefziad'
email: 'yzfm2000@gmail.com'
}
```

- Response Body

```
{msg :  'you must provide your username'}

// or

{msg :  'you must provide your email'}

// or

{msg :  'there is no user with such username'}

// or

{msg :  'your email is incorrect'}

// or

{mag:  'an email has been sent to you, please check your mail'}
```

# Code Style
* Readability counts.
* Be consistent.
* [Don't repeat yourself](http://en.wikipedia.org/wiki/Don't_repeat_yourself).
* Flat is better than nested.
* Beautiful is better than ugly.
* Simple is better than complex.
* Add blank line to the end of every file.
* Limit lines to 80 characters.
### JavaScript
* Two spaces indentation.
* Single quotes are preferred over double. Reason: HTML uses double quotes.
* Use `void 0` instead of `undefined`, because `undefined` could have been
redefined.
* Write code in functional style with minimum side effects. See coffeescript
section for more info.
* Don't use function statements. Instead, create anonymous functions and
assing them to vars for consistency with other vars.

    ```javascript
    // No
    function doThing(a, b) {return a * b;}

    // Yes
    var doThing = function(a, b) {return a * b;};
    ```

* Avoid global vars where you can. If you use them, specify it explicitly.

    ```javascript
    window.globalVar = ...;
    ```

* Use one `var` per variable.

    ```javascript
    var a = 5;
    var b = 6;
    var $this = $(this);
    // Exception.
    var a, b, c, d, $this;
    ```

* Use '_this' variable to push current context to the closures.

    ```javascript
    var a = {
     b: function() {
       var _this = this;
       $(some).click(function(event) {
         _this.c();
       });
     }
    };
    ```

* Event callback should name event data variable as 'event', not 'e' etc.

    ```javascript
    $('#item').click(function(event) {
      $.storage.set('item', $(this).val());
    });
    ```

* Do not use quotes in object keys.

    ```javascript
    // No
    {'a': 'testtest'}

    // Yes
    {a: 'testtest'}
    ```

* Use '===' for comparing instead of '=='. JavaScript is weakly typed
language, so 5 == '5'. This ambiguity could lead to hard-to-find bugs.

    ```javascript
    if (a === 5) {
      ...
    }
    if ($(this).val() === 'something') {
      ...
    }
    if (typeof a === 'undefined') {
      ...
    }

    // Exception: this compares both to 'null' and 'undefined'.
    if (item == null) {

    }
    ```

* Cache list length into a variable. You could afford 2x loop performance
increase with this on some browsers.

    ```javascript
    for (var i = 0, length = someList.length; i < length; i++) {
      doSomething(someList[i]);
    }
    ```

* Avoid bitwise operators if possible.
* Avoid `with` & implied typecasting.

### HTML
* Two spaces indentation.

### CSS
* Two spaces indentation.
* Use lowercase hex colors (e.g. #fff) instead of color names (e.g. white).
* [Use `* {box-sizing: border-box;}`](http://paulirish.com/2012/box-sizing-border-box-ftw/).
* Use hyphens between class names, not camelCase or under_scores.
* Use only classes for styling most of the time (no #ids, elems etc).
* Don't use inline styling.
* Profile your selectors with webkit inspector.
* Use tree-style indentation.

    ```css
    .signup-page {
      background: #0d0; }
      .signup-button {
        padding: 10px;
        background-image: url("../img/signup.png"); }

    /* This looks cool if you use Stylus etc. */
    .chat-page {
      font-size: 0.9em; }
      .identity {
        margin-bottom: 20px; }
        .identity-profile {
          height: 4em; }
        .identity-nickname {
          float: left;
          width: 165px; }
        .identity-avatar {
          float: right; }
        .identity-updates {
          margin-top: 10px; }
        .identity-status {
          height: 30px; }
        .identity-current-mood {
          padding-left: 5px; }
        .identity-button {
          float: right; }
    ```

* Use this sequence of properties

    ```css
    .item {
      position: static;
      z-index: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      display: block;
      visibility: hidden;
      float: none;
      clear: none;
      overflow: hidden;
      clip: rect(0 0 0 0);

      box-sizing: content-box;
      width: auto;
      min-width: 0;
      max-width: 0;
      height: auto;
      min-height: 0;
      max-height: 0;
      margin: 0;
      padding: 0;

      table-layout: fixed;
      empty-cells: show;
      border-spacing: 0;
      border-collapse: collapse;
      list-style: none;

      font: 1em sans-serif;
      font-family: Arial, sans-serif;
      font-size: 1em;
      font-weight: normal;
      font-style: normal;
      font-variant: normal;

      content: "";
      cursor: default;
      text-align: left;
      vertical-align: top;
      line-height: 1;
      white-space: normal;
      text-decoration: none;
      text-indent: 1;
      text-transform: uppercase;
      letter-spacing: 1;
      word-spacing: normal;

      opacity: 1;
      color: #d00;
      text-shadow: 5px 5px 5px #d59;
      border: 1px solid #d00;
      border-radius: 15px;
      box-shadow: inset 1px 0 0 #fff;
      background: #fff url("../i/bg.png") no-repeat 0 0; }
    ```

# LICENSE
Distributed under the MIT License.See `LICENSE.txt` for more information.
>Copyright (c) 2021 Tijwal Airlines
