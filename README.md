# Starting Client, Server and Databases

This readme describes how to:

1. Start Client Server(#Start Client)
2. Start Server Server(#Start Server)
3. Combo Start(#Combo)
4. Start MongoDB(#Start Mongo)
5. Install Prettier(#Prettier)

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

## Prettier

Prettier is an opinionated code formatter that enforces common code styling guidelines across the team.  Depending on
how you configure it you can either run it manually on specific files as you are working, or set it up to watch
for file changes and run on every change.  Instructions for setting up watches is given below.

You can learn more about Prettier at [Prettier.io](https://prettier.io).

**Run Manually** 

Instructions for running at the command line can be found [here](https://prettier.io/docs/en/cli.html).  There are
multiple options that can be used, this example is used in the docs:

```prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"```

The items in {} is a file search glob, the --write flag tells it to update the file and re-write it.  The other options
enforce\change the applicable rules.  Per the docs you may want to commit your code before running this manually.

**Configure Using a File Watcher**

To install Prettier on your machine pull the latest version of the [dev](https://github.com/hatchways/team-evergreen.git)
repository on GitHub, navigate to the root folder for your project and run ```npm install```.  Make sure
you are in the root folder, if you are in \server or \client you will end up doing an npm install for those folder.

To use Prettier you can configure your IDE to automatically watch for changes to files and update them
on change.  Instructions for WebStorm can be found [here](https://www.jetbrains.com/help/webstorm/prettier.html),
for Visual Studio Code a guide can be found [here](https://www.codereadability.com/automated-code-formatting-with-prettier/)
(There doesn't seem to be a definitive VSC install guide, this is one that seemed complete but was not
able to test).

Alternatively if you don't want to modify your IDE a convenience script was added to the project root directory
package.json file.  At the command prompt run ```npm run prettier-watch```.  As usual this is a convenience script
and some troubleshooting may be required for your environment.  You need to start this script or automate it every 
time you restart your laptop.

**Configure Using a Pre-Commit Hook**

There are additional methods to integrate Prettier into your workflow including configuring it as a 
[pre-commit hook](https://prettier.io/docs/en/precommit.html) that will run before every new commit.  This has not been 
configured but you may want to look at it.

##PS

If its 2 am and you need a laugh go [here](https://www.youtube.com/watch?v=FxOIebkmrqs)

If its the next day and you are still updating the readme go [here](https://www.youtube.com/watch?v=ajq8eag4Mvc)

Feel free to add to this list with your own favourites.  
