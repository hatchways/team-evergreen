//getFriendsPollRequests.js

const Lists = require("../../models/friendList");
const Polls = require("../../models/Poll");

export async function getRequests(userId) {
    //Get all the lists the user is a member of
    const lists = await Lists.find({ friends: userId }, "_id").exec();

    //Get all the polls attached to those lists
    return await Polls.find({ sendToList: lists });
}

// PRIVATE FUNCTIONS
