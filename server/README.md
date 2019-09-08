# Server Configuration

This readme describes how to:

1. [Connect to MongoDB](#MongoDB)
2. [Use The Registration\Login API](#Authorization API)
3. [Uploading to S3](#Uploading to S3)

## MongoDB

### Pre-requisites

1. Install MongoDB on your local machine, instructions can be found [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).
2. Install Compass to help you manage and explore your databases, instructions can be found [here](https://docs.mongodb.com/compass/master/install/).
3. Download the latest copy of dev from gitHub to make sure you have the latest files.

### Database password

At the moment there are no database passwords set up to connect to the database. This needs to be corrected in a future
fix but for now it works. I suggest that you do the same on your local copy. If you do add a password to your database
please update db-connect.js and config.js with the appropriate values.

Passwords should never be stored in config.js, add an environment variable similar to the one in place for the password
encryption.

### Configuration

The connection script for Mongo uses environment variables to find your local database. It defaults
to the following values:

| Environment | DB Name        | Host      | Port  | DB Type |
| :---------- | :------------- | :-------- | :---- | :------ |
| Development | evergreen_dev  | localhost | 27017 | mongodb |
| Test        | evergreen_test | localhost | 27017 | mongodb |

You can override these values by setting the following KEYS in .env:

| Environment | DB Name      | Host         | Port         | DB Type      |
| :---------- | :----------- | :----------- | :----------- | :----------- |
| Development | DEV_DB_NAME  | DEV_DB_HOST  | DEV_DB_PORT  | DEV_DB_TYPE  |
| Test        | TEST_DB_NAME | TEST_DB_HOST | TEST_DB_PORT | TEST_DB_TYPE |

These values are loaded into process.env.\${KEY} by the \server\config\config.sys script and can then be used anywhere they
are needed by importing config.js.

### Connecting to MongoDB

The default connection script \server\config\db-connect.js uses the values above to create a connection to your local
database. In order to use this connection add the following to your file:

```
import mongoose from "mongoose";
import _ from "./config/db-connect";

const db = mongoose.connection
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
```

You can then add your code within the then() and catch() methods to accomplish what you need.

### Creating or Updating a Model

Models for the database are stored in \server\models and start with an uppercase. Models can contain validation and
type requirements. You can find more information on how to crate a model [here](https://docs.mongodb.com/manual/core/data-modeling-introduction/).

To update a model just make the changes you need and upload to gitHub and deal with any conflicts that might arise from
the merge. Avoid deleting or changing existing field names as this will more than likely break everything.

### Tests

Tests for db-connect.js and User.js can be found in server\test under the appropriate spec. We should create\update
the existing specs for any future models to help with future regression testing. The syntax is pretty straightforward,
just copy one that exists already.

To run the tests at the prompt within the \server directory type:

```
npm run test
```

This will run all the tests currently in the directory. Segregating these out into test suites is a job for future coders.

## Authorization API

### Pre-requisites

1. Download the latest version of dev branch on gitHub.
2. Add an environment variable called PASSWORD_CRYPTO_KEY to your .env file. The value should be a string, it can be
   anything you want. You can generate a random string at https://randomkeygen.com or create your own. This value
   will be used to encrypt the user passwords in the database. If you change it after creating a user account, that
   account will stop working as the same key is used for encrypting and decrypting.
3. Install [postman](https://www.getpostman.com) to help you test the end points.
4. Launch the server by typing `npm run dev`, alternatively you can use `npm run combo-start` to launch both
   client and server but the api does not depend on the client code at all so unless you need both its not necessary.

### API Endpoints

The api makes two endpoints available for registration and login and will return a status code of 200 if successfull or
a json file with an error description if not successful.

When logging in successfully the end point will return the jwt token. This token needs to be stored and then used for all
future back end requests. Right now the token only returns the user.id field but we can add more items to the payload
if we find this is necessary.

The various error messages and validations can be found at:

-   \server\validation\register.js
-   \server\validation\login.js

Registration requires these fields {name, email, password, password2) to exist, not be empty and be the correct
format for their type; password and password2 need to match. Registration will return:

1. 400 status error codes if data is not valid - user not registered\not logged ing
2. 500 status error code if registration succeeded but jwt token could not be created - user registered\not logged in
3. 200 status - returns jwt - user is registered and logged in

Login requires these fields {email, password} to exist, not be empty, and be the correct format for their type; there
has to be a record for that email in the user database.

The actual routes for the endpoints are:

http://localhost:3001/api/users/login
http://localhost:3001/api/users/registration

The data needs to be passed as part of the post request.

### Tests

Test scripts fo the endpoint validation files can be found in server\test and are named login.validation.spec.js and
registration.validation.spec.js. These tests check to make sure the validations are setup correctly.

To test the end points use postman, choose the appropriate data type you want to use (form-data to pass in the url) or
(x-www-form-urlencoded which allows you to use a table to enter the data for end point you want to test). I've added
images for what this looks like in postman to the test directory.

## Uploading to S3

### Pre-requisites
In order to use the \server\routes\utils\S3Upload.js file you will need to create a profile with Amazon to
use the S3 service.  You will need to provide a credit card but the rates are ridiculously low
and really only kick in for uploads of thousands's if not tens of thousands's of records.  To create an account go to 
[AWS Amazon Console](https://aws.amazon.com/console/) and register.  Follow their instructions for sign up.

### Create and Configure Bucket

Once registered from within S3 create a bucket to hold your images and configure as follows:

- Properties - none required but feel free to experiment
- Permissions
    -  Public Access - Turn on Public Access
    -  Access Control List - Public Access\Everyone\List Objects - Yes
- Bucket Policy - Leave Empty
- CORS Configuration - Leave Default
- Management - none required

### Create an IAM Account

Navigate to the IAM setup page (you can get there by clicking on the Services Drop Down menu of the S3 Console - search
for IAM) and create a new account.

### Create New Security Group

1. Go to Group folder and click on Crate New Group - call it something relevant - I used evergreen-file-uploader
2. Attach AmazonS3FullAccess policy
3. Create Group
4. From the list of groups click the one you just created
5. Select the Permissions tab
6. Click on the drop down arrow next to Inline Policies and then choose to create one (via link)
7. Choose Custom Policy
    - name the policy PutObjectAcl
    - in the policy text area copy and paste the following policy:
    - ```
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:PutObjectAcl"
                    ],
                    "Resource": "*"
                }
            ]
        }
        ```

### Create New User

1. Go to the Users folder and click Add User, follow the prompts.  Use the following values for the various fields:
    - User Name - something unique that you will recognize(shows up in logs) - I used evergreen-robot
    - Access Type - Programmatic Access
2. Select the checkbox next to the group you just created (You should be on Add User to Group Tab)
3. Click on Next: Tags
4. Enter a tag if you want to track transactions (I chose Evergreen - this is not necessary)
5. Click on Next: Review
6. Make sure you like what you see and click on Create User

#***********  VERY IMPORTANT ************
Once the user is created you will be provided with the user security credentials.  This is a one time opportunity so 
download the csv and keep it somewhere secure (not in the project folder or it will\may get uploaded to GitHub).  If for
some reason you lose this file, you can recreate the security credentials through the IAM portal.  
#***********  VERY IMPORTANT ************

### Create AWS Environment Variables

Create the following keys in your .env file:

```AWS_ACCESS_KEY_ID=<from your user credentials file>
AWS_SECRET_ACCESS_KEY=<from your user credentials file>
AWS_IMAGES_BUCKET=<bucket name that you chose>
AWS_REGION=<region that you chose for your S3 service>
```                   

A note on the region value, in the S3 console you can see what region you chose but it is given in plain
english and is not the actual code that you need.  For example my region is displayed as:

```US-East(Ohio)```

This is not the value you need for the region field.  The actual value you need is a code that looks like:

```us-east-2```

You can find the list of codes [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

### Testing if this works

You can use the \upload route and postman to test if you are set up correctly.

1. Launch the dev server and mongoDB database
2. From postman go to the following route:
        http://localhost:3001/api/images/upload
3. Choose form-data and add at least one file
4. Send the request

If it worked properly you should get back a response with the url of the stored file.

### Final Notes

The files are named using a UUID, this is to guarantee filename uniqueness and to hide the details of 
what's in the actual image.  The images however are not encrypted in any way.

Even though we have set Public access it should not be possible for anyone besides an authorized account for
you buckets to upload a file.  Everyone however should be able to read it.  To test that this is the
case click on the url that you got back.  If your image\file opens up you are good to go.