![Tijwal (1)](https://user-images.githubusercontent.com/83404871/147373192-68de0612-6e7c-42d7-ba48-f4af78489dd1.jpg)
# Tijwal
An Airline Reservation web application through which individuals can reserve and pay for flights in order to travel to different countries and sometimes domestic cities.

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
