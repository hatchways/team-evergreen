//seeddb.js

/**
 * @desc - Uses the applications routes to generate data
 */

//Make a connection to the database - by default this is to development
//To create for test set process.env.NODE_ENV='test'
require("../config/db-connect");
const mongoose = require("mongoose");

// Application modules  and other configuration items
import {
    names,
    avatars,
    pollTitles,
    pollImages,
    listTitles
} from "./startdata";
import { config } from "../config/config";
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
        const userIds = await createUsers();
        console.log(userIds);
    } catch (err) {
        console.log(err);
    }
}

seedDb().then(() => console.log("done?"));
//PRIVATE FUNCTIONS

async function addFriendLists(userIds) {
    // exclude current user since user cannot add himself to a friend list:
    await userIds.forEach((id, i) => {
        try {
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
        } catch (err) {
            console.log(err);
        }
    });
}

async function addAvatarImages(userIds) {
    await userIds.forEach((id, i) => {
        Users.findByIdAndUpdate(id, { avatar: avatars[i], list: list });
    });
}

async function createUsers() {
    console.log("Create Users");
    const newUserIds = [];
    await names.forEach(name => {
        let newUser = {
            name: name,
            email: `${name.split(" ")[0].toLowerCase()}@mail.com`,
            password: config.app.samplePassword
        };

        axios
            .post("/api/users/register", newUser)
            .then(result => {
                const { token } = result.data;
                const decoded = jwt_decode(token);
                newUserIds.push(decoded.id);
            })
            .catch(err => {
                console.log(err);
            });
    });
    return newUserIds;
}
