const mongoose = require("mongoose");
const userIds = require("../../helpers/userIds");
const listIds = require("../../helpers/listIds");
const titles = [
    "Fashion",
    "Tech",
    "Favorites",
    "Music",
    "Pets",
    "Ladies",
    "TV & Movies",
    "Close friends",
    "Work",
    "Honest"
];

const lists = [];

const createFriendList = i => {
    const newList = {};

    newList.userId = userIds[i];
    newList._id = listIds[i];
    newList.title = titles[i];
    newList.createdAt = mongoose.Types.ObjectId(listIds[i]).getTimestamp();

    // exclude current user since user cannot add himself to a friend list:
    const filteredUserIds = userIds.filter(id => id !== userIds[i]);
    newList.friends = [
        filteredUserIds[[Math.floor(Math.random() * 9)]],
        filteredUserIds[[Math.floor(Math.random() * 9)]],
        filteredUserIds[[Math.floor(Math.random() * 9)]],
        filteredUserIds[[Math.floor(Math.random() * 9)]]
    ];
    lists.push(newList);
};

// create 1 list for each user:
for (let i = 0; i < 10; i++) {
    createFriendList(i);
}

module.exports = lists;
