![Tijwal (1)](https://user-images.githubusercontent.com/83404871/147373192-68de0612-6e7c-42d7-ba48-f4af78489dd1.jpg)
# Tijwal
An Airline Reservation web application through which individuals can reserve and pay for flights in order to travel to different countries and sometimes domestic cities.
# content
- [Motivation](#motivation)
          + [The following are the objectives of this project:](#the-following-are-the-objectives-of-this-project-)
- [Tech/Framework used](#tech-framework-used)
    + [we used MERN Stack framework to create the Application](#we-used-mern-stack-framework-to-create-the-application)
        * [Database](#database)
        * [Node.js Framework](#nodejs-framework)
        * [Front end](#front-end)
        * [Back end](#back-end)
- [How to use?](#how-to-use-)
    + [Built with](#built-with)
    + [Prerequisets](#prerequisets)
    + [Navigation](#navigation)
        * [signup using button in navigation bar](#signup-using-button-in-navigation-bar)
        * [Login if you already signed up before using:](#login-if-you-already-signed-up-before-using)
        * [Your Home should look like this](#your-home-should-look-like-this)
        * [View your profile info By clicking on profile in the navigation bar](#view-your-profile-info-by-clicking-on-profile-in-the-navigation-bar)
        * [edit profile info](#edit-profile-info)
        * [change your Password](#change-your-password)
        * [Searching for Flights](#searching-for-flights)
        * [after clicking reserve this will give you the list of all possible return flights like this](#after-clicking-reserve-this-will-give-you-the-list-of-all-possible-return-flights-like-this)
        * [when reserving your return flight this will navigate you to selecting your preferred seats on the plane](#when-reserving-your-return-flight-this-will-navigate-you-to-selecting-your-preferred-seats-on-the-plane)
        * [when pressing on confirm](#when-pressing-on-confirm)
        * [confirmation will lead you to online payment where you have to specify](#confirmation-will-lead-you-to-online-payment-where-you-have-to-specify)
        * [after payment a brief about Your Itenerary will appear where you will get the opportunity to cancel reservations](#after-payment-a-brief-about-your-itenerary-will-appear-where-you-will-get-the-opportunity-to-cancel-reservations)
        * [if you choose to cancel you will be Automatically refunded](#if-you-choose-to-cancel-you-will-be-automatically-refunded)
        * [if you logged out and you want to check you reservations](#if-you-logged-out-and-you-want-to-check-you-reservations)
        * [open any of the to view full details](#open-any-of-the-to-view-full-details)
- [API reaferences](#api-reaferences)
    + [Flights](#flights)
        * [1.Show all flights](#1show-all-flights)
        * [2.Create a flights](#2create-a-flights)
        * [3.Update Flight details](#3update-flight-details)
        * [4.Search for flights](#4search-for-flights)
        * [5.Delete a Flight](#5delete-a-flight)
        * [6.Get All Reserved Flights by a user](#6get-all-reserved-flights-by-a-user)
        * [7.User search for departure and return flights](#7user-search-for-departure-and-return-flights)
        * [8.get the details of a flight with its id](#8get-the-details-of-a-flight-with-its-id)
        * [9.getting all seats of a specific flight](#9getting-all-seats-of-a-specific-flight)
        * [10.get all seats from a flight with the cabin](#10get-all-seats-from-a-flight-with-the-cabin)
    + [Seats](#seats)
        * [1.Get a seat](#1get-a-seat)
    + [Login](#login)
    + [Register](#register)
    + [Reservations](#reservations)
        * [1. Create A Reservation](#1-create-a-reservation)
        * [2. Change Reservation Seats](#2-change-reservation-seats)
        * [3. Change Reservation Flights](#3-change-reservation-flights)
        * [4. Getting All Replacement Flights For A Reservation](#4-getting-all-replacement-flights-for-a-reservation)
        * [5. Searching For a Specific Replacement Flight For A Reservation](#5-searching-for-a-specific-replacement-flight-for-a-reservation)
        * [6. Send Mail](#6-send-mail)
    + [Users](#users)
        * [1.User Cancel a Reservation](#1user-cancel-a-reservation)
        * [2. User Get Reservation Itinerary](#2-user-get-reservation-itinerary)
        * [3. Update User Information](#3-update-user-information)
        * [4. User Change Password](#4-user-change-password)
        * [5. Get User Info](#5-get-user-info)
        * [6. User Forget Password](#6-user-forget-password)
- [Code Style](#code-style)
    + [JavaScript](#javascript)
    + [HTML](#html)
    + [CSS](#css)
- [LICENSE](#license)


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
## Built with
Visual Studio Code [Download from here](https://code.visualstudio.com/download)

## Prerequisets
* After Cloning the repository.
* Open a new Terminal.
* open the source directory. `cd src`
* Run the server! `npm run dev`
* open the client directory. `cd client`
* open the source directory. `cd src`
* Run front end. `npm start`

## Navigation

### signup using button in navigation bar:
You have to specify your
* username
* first name
* last name
* email
* passport number
* Address
* country code
* mobile number
![signup](https://user-images.githubusercontent.com/83404871/147391856-7facc2fb-113b-40ff-bee2-68a6eefc7f85.png)
### Login if you already signed up before using:
* username
* password
![login](https://user-images.githubusercontent.com/83404871/147391901-168234f5-2d2e-4d58-9e9f-05a58d0d730f.png)

### Your Home should look like this:
![User Home](https://user-images.githubusercontent.com/83404871/147391948-896a2043-a737-4f84-b3d7-5ff5b6eeb03a.png)

### View your profile info By clicking on profile in the navigation bar:
![Profile](https://user-images.githubusercontent.com/83404871/147392002-1060a2e2-228b-45e5-90b5-e6f2b724aea8.png)

### edit profile info:
you can change your:
* first name
* last name
* email
* passport
![edit profile](https://user-images.githubusercontent.com/83404871/147392053-1ae59bbf-1c71-4bc4-a3b9-b24b7c76c3c1.png)

### change your Password:
![password](https://user-images.githubusercontent.com/83404871/147392087-ff6cb823-8057-47d4-859c-e8ba7e9e8c69.png)


### Searching for Flights:
select departure flight
![264084117_4816018441753058_6427254638577618211_n](https://user-images.githubusercontent.com/83404871/147392161-34470c03-6d5a-491e-8f74-11d7d3c2cc2d.png)

### after clicking reserve this will give you the list of all possible return flights like this:
![264391135_241762758032223_505865153648017193_n](https://user-images.githubusercontent.com/83404871/147392222-ba2f7999-2af1-4dbb-948c-d4721a14c8c0.png)

### when reserving your return flight this will navigate you to selecting your preferred seats on the plane:
* you are allowed to reserve up to 3 seats/flight
![267236310_684965332884764_2867850062151290321_n](https://user-images.githubusercontent.com/83404871/147392285-725a8af1-2ae5-4aff-8cac-13a8110e5a14.png)

### when pressing on confirm:
![269932859_1058812101356524_6092159770024377494_n](https://user-images.githubusercontent.com/83404871/147392496-2282b40f-4f78-4679-be2d-e52b30120a1b.png)
### confirmation will lead you to online payment where you have to specify:
* your card id
* expiration date
* CSV
![267745259_717452489220252_5944662319792235373_n](https://user-images.githubusercontent.com/83404871/147392318-fc9c3da4-2a35-4ad6-ae11-f8ee20f5599c.png)


### after payment a brief about Your Itenerary will appear where you will get the opportunity to cancel reservations:
![267749894_223356439948945_6298808428255626415_n](https://user-images.githubusercontent.com/83404871/147392375-cc6c1fbe-e20a-420c-8db5-a32b23ef1188.png)

### if you choose to cancel you will be Automatically refunded:
![267826159_1008464426682420_218440884847535797_n](https://user-images.githubusercontent.com/83404871/147392426-8889b23e-9a14-47cc-843f-67ce4ef5d372.png)


### if you logged out and you want to check you reservations:
* click on your profile icon in the navbar
* click on Dash board

![267865779_599568691155316_6054516382772229699_n](https://user-images.githubusercontent.com/83404871/147392572-f32e9b89-08ae-488b-955a-e8df44596f7f.png)

### open any of the to view full details:

![269608535_503053430991019_962950745107906975_n](https://user-images.githubusercontent.com/83404871/147392584-89dc9665-64d3-4b3a-85b8-b52ba0cef7cc.png)

in this view you can cancel any of your reservations at anytime and you can also email it to yourself to save a copy of it
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
