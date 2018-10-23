# Geolocation service (Frontend)

This is a HTML/jQuery based frontend app which is used to consume RESTful API for the project
located here: https://github.com/vgrankin/geolocation_service_backend

This small app is a microservice which connects to backend server using jQuery's AJAX capabilities.

See "Usage/testing" section.

## Technical details / Requirements:
- Current project is built using jQuery 3.3.1 CDN, Bootstrap 4.1.3 CDN and HTML 5
- index.html contains main code and backend.js contains functions to work with backend via AJAX    
- QUnit and sinonJS libraries are used for tests. sinonJS is used to make a fake backend server
  and to create fake responses from the server to make various tests. After running all tests
  QUnit will provide corresponding report in your browser.
- In order to use this app, you need to run backend server. Please refer to the following repository
  README.md file to set it up and run properly: 
  https://github.com/vgrankin/geolocation_service_backend/blob/master/README.md 

## Installation:
		
    - no special installation is required. All components are CDN-based, 
      so you can simply run index.html		
		
    - set correct path using "backendUrl" variable
      located in backend.js file and make sure backend server is running				                            
          
## Implementation details:

- Application code is located at ./index.html
- JS functionality is located at ./backend.js
- Tests are located in ./tests/tests.js file. ./tests/index.html simply mimics ./index.html file with QUnit addons
     
## Usage/testing:

    First of all, start your backend server. Then set correct path using "backendUrl" 
    variable located in backend.js file (and make sure backend server is running).
    
    * See: https://github.com/vgrankin/geolocation_service_backend/blob/master/README.md 
      on how to start/run backend server 

In order to use the app, simply run ./index.html in your browser. As soon as your IP address appears
you can click "Get geolocation" button to get IP geolocation info. That's basically it!
    
In order to run tests, go to test folder and run index.html file in your browser. You should see
a QUnit report on how all the tests are doing!