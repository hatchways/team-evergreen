//seeddb.js

/**
 * @desc - Generates a random data set
 */

//Make a connection to the database - by default this is to development
//To create for test set process.env.NODE_ENV='test'
require("../config/db-connect");
const mongoose = require("mongoose");

// Application modules  and other configuration items
const startData = require("./startdata");
const names = startData.usernames;
const avatars = startData.avatars;
const pollImages = startData.pollImages;
const pollTitles = startData.pollTitles;
const listTitles = startData.listTitles;

const config = require("../config/config");
import jwt_decode from "jwt-decode";
import User from "../models/User";
import FriendList from "../models/friendList";
import Poll from "../models/Poll";
import Vote from "../models/Vote";
import { registerVote } from "./voteModelUpdates2";

//Constants
const NO_OF_USERS = 50;
const MAX_NO_OF_ADORNMENTS = 5; //Used in determining # of lists/polls to create/user
const MAX_NO_OF_FRIENDS_PER_LIST = 5;

//network connectivity
import axios from "axios";

async function seedDb() {
    //drop the database
    console.log(`!!WARNING!! Dropping database ${mongoose.connection.host}`);
    try {
        await mongoose.connection.dropDatabase();
        console.log("Database dropped");
        const userIds = await createUsers(NO_OF_USERS);
        await addAvatarImages(userIds);
        const friendsLists = await addFriendLists(userIds);
        await addPolls(userIds, friendsLists);
        await addVotes();
    } catch (err) {
        console.log(err);
    }
}

seedDb()
    .then(() => console.log("\n*****SEED DATA LOADED*****"))
    .catch(err => console.log(err));
//PRIVATE FUNCTIONS

async function sumUpVotes() {}

async function addVotes() {
    const promises = [];
    let count = 0;

    //Join the poll collection with friendList collection to get friends array
    const results = await Poll.aggregate([
        {
            $lookup: {
                from: "friendlists",
                localField: "sendToList",
                foreignField: "_id",
                as: "listOf"
            }
        },
        { $project: { listOf: { friends: 1 } } },
        { $unwind: "$listOf" }
    ]).then();

    //Extract pollId and friends list from returned cursor
    results.map(poll => {
        poll.listOf.friends.map(voter => {
            //does not post poll results about 1/2 of the time so we can see
            //polls to vote on
            if (Math.floor(Math.random() * 9) > 4) {
                registerVote(poll._id, voter, Math.round(Math.random()));
            }
        });
    });
}

async function addPolls(userIds, friendsLists) {
    let createPollPromises = [];
    let addPollToUserPromises = [];
    let count = 0;
    let newPolls = {};
    userIds.forEach(id => {
        const maxNoOfPolls = Math.floor(Math.random() * MAX_NO_OF_ADORNMENTS);
        for (let j = 0; j < maxNoOfPolls; j++) {
            let i = Math.floor(Math.random() * 9);
            const newPoll = new Poll({
                title: pollTitles[i],
                options: pollImages[i],
                userId: id,
                sendToList:
                    friendsLists[id][
                        Math.floor(Math.random() * friendsLists[id].length)
                    ],
                votes: [0, 0]
            });
            const newPromise = newPoll.save();
            newPolls[id] = newPoll._id;
            createPollPromises.push(newPromise);
            const addPollToUser = User.findByIdAndUpdate(id, {
                $push: { polls: newPoll._id }
            });
            addPollToUserPromises.push(addPollToUser);
        }
    });

    //Create Polls
    await Promise.all(createPollPromises)
        .then(results => (count = results.length))
        .catch(err => console.log("****ERROR ADDING POLLS\n", err));

    console.log(`${count} polls created`);

    //Add polls to users
    await Promise.all(addPollToUserPromises)
        .then(results => (count = results.length))
        .catch(err => console.log("****ERROR ADDING POLL TO USERS\n", err));

    console.log(`${count} users updated with poll`);
}

async function addFriendLists(userIds) {
    let promises = [];
    let friendsLists = {};
    const noOfUsers = userIds.length;
    await userIds.forEach(id => {
        let listIds = [];
        let maxNoOfLists = Math.ceil(Math.random() * MAX_NO_OF_ADORNMENTS);
        for (let j = 0; j < maxNoOfLists; j++) {
            // exclude current user since user cannot add himself to a friend list:
            const friendIds = userIds.filter(friendId => friendId !== id);

            // create a friends list of varying length per user
            let j;
            let friends = [];
            let noOfFriends = Math.ceil(
                Math.random() * MAX_NO_OF_FRIENDS_PER_LIST
            );
            for (j = 0; j < noOfFriends; j++) {
                let newFriend;
                let endLoop;
                do {
                    endLoop = true;
                    newFriend =
                        friendIds[
                            [Math.floor(Math.random() * (noOfUsers - 1))]
                        ];
                    if (friends.includes(newFriend)) {
                        endLoop = false;
                    }
                } while (!endLoop);
                friends.push(newFriend);
            }

            const newList = new FriendList({
                title: listTitles[Math.floor(Math.random() * 9)],
                friends: friends,
                userId: id
            });
            newList.save();
            const newPromise = User.findByIdAndUpdate(id, {
                $push: { lists: newList._id }
            }).exec();
            promises.push(newPromise);
            listIds.push(newList._id);
        }
        friendsLists[id] = listIds;
    });

    await Promise.all(promises)
        .then(results => {
            console.log(`${results.length} friends lists created`);
        })
        .catch(err => console.log("****ERROR ADDING FRIEND LISTS\n", err));

    return friendsLists;
}

async function addAvatarImages(userIds) {
    const promises = [];
    let count = 0;
    userIds.forEach(id => {
        const newPromise = User.findByIdAndUpdate(id, {
            avatar: avatars[Math.floor(Math.random() * 9)]
        }).exec();
        promises.push(newPromise);
    });
    await Promise.all(promises)
        .then(results => {
            console.log(`${results.length} avatars added`);
        })
        .catch(err => console.log("****ERROR ADDING AVATARS\n", err));
}

async function createUsers(noOfUsers) {
    //Will create users in multiples of 10
    const newUserIds = [];
    const promises = [];
    let noOfLoops = Math.max(1, Math.floor(noOfUsers / 10));
    for (let i = 0; i < noOfLoops; i++) {
        names.forEach(name => {
            let newUser = {
                name: name.split(" ")[0] + String(i) + " " + name.split(" ")[1],
                email: `${name.split(" ")[0].toLowerCase()}${String(
                    i
                )}@mail.com`,
                password: config.app.samplePassword,
                password2: config.app.samplePassword
            };

            const newPromise = axios.post(
                "http://localhost:3001/api/users/register",
                newUser
            );
            promises.push(newPromise);
        });
    }
    await Promise.all(promises)
        .then(results => {
            results.forEach(result => {
                const { token } = result.data;
                const decoded = jwt_decode(token);
                newUserIds.push(decoded.id);
            });
        })
        .catch(err => console.log("********* ERROR *********", err));

    console.log(`${newUserIds.length} user ids created`);
    return newUserIds;
}
