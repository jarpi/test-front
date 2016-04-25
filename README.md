# README 

## Problem 

Build an UI like the attached in file with the following business rules 
	- A click on add server button should add a 'grey' box representing a new ready to use machine
	- A click on destroy server should kill a 'grey' box representing a running machine 
	- A click on a plus sign in app should create a new app instance in the first free server or a server with one running app, if there is no available machine it shouldn't be started 
	- A click on minus sign in app should kill the newest instance of that type 

## Proposed solution 

- ### Layout 
    I choosed bootstrap to build the layout and styling the page, 
    mainly because it's the library i know and worked with before. 
    If i would had more time, rather bootstrap i had choosen a framework like LESS or       SASS, but have a MVP as soon as possible was my first goal. 

- ### Client side logic 
    To bring it to life, i choosed AngularJS for the same reasons, it's with what i worked        before. I feel comfortable and it bring me the needs i had for this demo site. I         really like to keep things simple as much as possible until the business needs wants     more. 
    If i would had more time, i had chosen react framework, just to get a first approach 
    to it and to know how it feels. 

- ### Bonus server side logic 

    After implementing the layout, i was thinking about implement the desired
    funcionalities with angular in the front, but i'm a backend guy so i decided to  
    decouple the views from functionalities and roll an express server with the business
    rules. It was not hard as i feel very comformatable in the backend. 
    Finally, i have implemented an in-memory storage doing where the business rules 
    applies. Yes, i know, it does not scale, but i though is out of scope to build 
    an scalable system right now, but i could if you want. 
    
- ### TO DO 
    There's still a lot of things to do: 
    - Refactor some classes 
    - Decouple embedded styles in html 
    - Refactor to an angular directive server boxes repeater code 
    - Refactor server-side code to enable database storage, it could be MongoDB
    - Testing (unit, integration with mocha, chai...) 
    - More testing in the front (unit)  
    - Even more functional testing (selenium) 
    - When database storage available, implement a mechanism to enable web scalability:
        - Servers are stored in a MongoDB database as documents 
        - Each server has apps running on top of it
    
        To modularize this situation we have two approaches: 
        - Save each app in a server's document 
        - Create a new collection of apps, storing it's id in a server's document array
        field 
        - Make a relation collection storing all apps running, and save it's id in a 
        server's document 
    
        For this use-case i will choose to store it inside the server's document, as the 
        volume of data it's small enough. 

        About the second approach, it will use 'populate' functionality of MongoDB, so 
        it will be easy enough to get related data. 
        
        The third approach, think it's not the use-case as it does not apply. 
        
        So well, adding this features we have our new shiny server running and scaling up
        to our budget allows, but wait, How do we handle concurrency? How do we notify 
        frontend about the changes in our data? Well, i'll be glad to discuss these and 
        other questions. 


[Online demo](https://peaceful-escarpment-22148.herokuapp.com)
Powered by [Heroku](https://heroku.com) 