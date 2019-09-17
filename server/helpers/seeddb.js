//seeddb.js

/**
 * @desc - Uses the applications routes to generate data
 */

//Make a connection to the database - by default this is to development
//To create for test set process.env.NODE_ENV='test'
require("../config/db-connect");
const mongoose = require("mongoose");

// Application modules  and other configuration items
// import { names } from "./startdata";
const startData = require("./startdata");
const names = startData.usernames;
const avatars = startData.avatars;
const pollImages = startData.pollImages;
const pollTitles = startData.pollTitles;
const listTitles = startData.listTitles;

const config = require("../config/config");
import jwt_decode from "jwt-decode";
import Users from "../models/User";
import FriendList from "../models/friendList";

//Constants
const TARGET_AVATAR = "avatar_image";

//network connectivity
import axios from "axios";

async function seedDb() {
    //drop the database
    console.log(`!!WARNING!! Dropping database ${mongoose.connection.host}`);
    try {
        await mongoose.connection.dropDatabase();
        console.log("Database dropped");
        const userIds = await createUsers();
        await addAvatarImages(userIds);
        await addFriendLists(userIds);
    } catch (err) {
        console.log(err);
    }
}

seedDb()
    .then(() => console.log("Seed data created."))
    .catch(err => console.log(err));
//PRIVATE FUNCTIONS

async function addPolls(userIds) {}

async function addFriendLists(userIds) {
    // exclude current user since user cannot add himself to a friend list:
    let promises = [];
    let count = 0;
    await userIds.forEach((id, i) => {
        const friendIds = userIds.filter(friendId => friendId !== id);
        const friends = [
            friendIds[[Math.floor(Math.random() * 9)]],
            friendIds[[Math.floor(Math.random() * 9)]],
            friendIds[[Math.floor(Math.random() * 9)]],
            friendIds[[Math.floor(Math.random() * 9)]]
        ];
        const newList = new FriendList({
            title: listTitles[i],
            friends: friends,
            userId: id
        });
        newList.save();
        const newPromise = Users.findByIdAndUpdate(id, {
            lists: [newList._id]
        }).exec();
        promises.push(newPromise);
    });
    await Promise.all(promises)
        .then(results => (count = results.length))
        .catch(err => console.log("****ERROR ADDING FRIEND LISTS\n", err));

    console.log(`${count} friends lists created`);
}

async function addAvatarImages(userIds) {
    const promises = [];
    let count = 0;
    userIds.forEach((id, i) => {
        const newPromise = Users.findByIdAndUpdate(id, {
            avatar: avatars[i]
        }).exec();
        promises.push(newPromise);
    });
    await Promise.all(promises)
        .then(results => (count = results.length))
        .catch(err => console.log("****ERROR ADDING AVATARS\n", err));

    console.log(`${count} avatars added`);
}

async function createUsers() {
    const newUserIds = [];
    const promises = [];
    names.forEach(name => {
        let newUser = {
            name: name,
            email: `${name.split(" ")[0].toLowerCase()}@mail.com`,
            password: config.app.samplePassword,
            password2: config.app.samplePassword
        };

        const newPromise = axios.post(
            "http://localhost:3001/api/users/register",
            newUser
        );
        promises.push(newPromise);
    });
    await Promise.all(promises)
        .then(results => {
            results.forEach(result => {
                const { token } = result.data;
                const decoded = jwt_decode(token);
                newUserIds.push(decoded.id);
            });
        })
        .catch(err => console.log("********* ERROR *********", err));
    console.log(`Created ${newUserIds.length} user ids.`);
    return newUserIds;
}
