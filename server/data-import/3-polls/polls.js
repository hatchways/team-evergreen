//poll.js - seed data moduel

const mongoose = require("mongoose");
require("../../config/db-connect");
const pollIds = require("../../helpers/pollids");
const User = require("../../models/User");

const titles = [
    "What should I wear?",
    "Which is bolder?",
    "What's your favourite?",
    "Where should we go?",
    "Make a choice!",
    "Choose now!",
    "Choose for me.",
    "The Tribe as Spoken",
    "How can I choose?",
    "Tough choice"
];

const userIdQuery = User.find({}, "_id", { limit: 10 });
userIdQuery.exec(createPolls);

let polls = [];

function createPolls(error, users) {
    console.log(users);

    let i = 0;
    users.forEach(user => {
        const poll = {};

        poll.userId = user["_id"];
        poll._id = pollIds[i];
        poll.title = titles[i];
        polls.push(poll);
        i++;
    });

    mongoose.connection.close();
}

module.exports = polls;
