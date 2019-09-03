# Starting Client, Server and Databases

This readme describes how to:

1. Start Client Server(#Start Client)
2. Start Server Server(#Start Server)
3. Combo Start(#Combo)
4. Start MongoDB(#Start Mongo)

## Start Client

1. Navigate to client directory
2. If you've pulled any code from gitHub run ```npm install``` to update any packages.
3. At the command line type:
 
    - ```npm run start``` to start your dev environment
    - ```npm run test``` to run your test suite (if one exists)
    - ```npm run build``` to build a production deploy copy of your code
 
## Start Server

1. Navigate to server directory
2. If you've pulled any code from gitHub run ```npm install``` to update any packages.
3. At the command line type:
 
    - ```npm run dev``` to start your dev environment using nodemon (will restart server whenever files change)
    - ```npm run start``` to run your server in production mode (uses node to load app.js)
    - ```npm run test``` to run tests in \server\test directory
    
## Combo Start

You can start both the client and server environments by running ```npm run combo-start``` from either the 
server or client directory.  This is a convenience script with minimal error checking (i.e. none) so if you run
into issues try starting each server independently to make sure there are no other issues.

## Start MongoDB

### Pre-requisites

1. Install MongoDB on your local machine, instructions can be found [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).
2. Install Compass to help you manage and explore your databases, instructions can be found [here](https://docs.mongodb.com/compass/master/install/).

### Starting the Database

MongoDB is installed globally on your local machine.  In order to have it up and running you need to set up the
appropriate service for your local environment.  Instructions for installing and running MongoDB for various
environments please follow the [instructions](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/) for your particular os.

The following commands will start the database for the appropriate OS:

**MAC OS**

From a terminal, issue the following to run MongoDB (i.e. the mongod process) in the foreground.

```mongod --config /usr/local/etc/mongod.conf```

Alternatively, to run MongoDB as a macOS service, issue the following (the process uses the /usr/local/etc/mongod.conf file created during the install):

```brew services start mongodb-community@3.2```

Running it as a service is ideal as MacOS will automatically start the database on restart of your laptop\desktop.

**Linux**

Too many flavours of Linux to list them all, check [here](https://docs.mongodb.com/v3.2/administration/install-on-linux/) 
for your particular version.

**Windows**

You can find instructions for installing on Windows [here](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/)

### Connecting to Database In Code

To connect to the database once MongoDB is up and running add the following to your code (path to config is written
as relative to \server, modifies as appropriate if your script is in another directory):

```
require("./config/db-config");
const db = mongoose.connection;
```

To test if the database connection is ready check the value of readyState, if === 1 then open, if === 0 then not ready :

```$xslt
db.readyState === 1 
```

##PS

If its 2 am and you need a laugh go [here](https://www.youtube.com/watch?v=FxOIebkmrqs).
Feel free to add to this list with your own favourites.  