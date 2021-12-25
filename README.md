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
Visual Studio Code

### Prerequisets
* After Cloning the repository.
* Open a new Terminal.
* open the source directory. `cd src`
* Run the server! `npm run dev`
* open the client directory. `cd client`
* open the source directory. `cd crs`
* Run front end. `npm start`

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
