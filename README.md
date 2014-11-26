Dashboard visualized by d3

==========================
Description

This node.js based web app can be used as a template where logged in users can assess historical and monitor live data, which are visualized by d3.js, from API you speficied.

==========================
Demo

  https://node-webstats-dashboard.herokuapp.com/
  
==========================
Installation

  To obtain a copy of the source code:

    $ git clone 
    $ cd node-dashboard-d3
  
  To install dependencies needed for backend:

    $ npm install

  To install dependecies needed for frontend:

    $ bower install

==========================
Start Application
     
  start app in development mode and on port 3000 by default:
    
    $ nodemon                                      

  start app in mode and on port as specified:

    $ PORT=4000 NODE_ENV=production npm start      

Here 'nodemon' does everything 'npm start' does, but 'nodemon' will enable the ability for developer to see change on web page immediately without manually restarting server.
