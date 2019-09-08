const mongoose = require("mongoose");
const userIds = require("../../helpers/userIds");
const listIds = require("../../helpers/listIds");
const names = [
    "Alison Brown",
    "Caroline Chapman",
    "Dorothy Ferguson",
    "Lisa Hudson",
    "Rose Fraser",
    "Peter Kelly",
    "Richard Randall",
    "William Avery",
    "Jack Murray",
    "Paul Newman"
];
const avatars = [
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg"
];

// create ten users with one friend list each:
module.exports = names.map((name, i) => ({
    name,
    email: `${name.split(" ")[0].toLowerCase()}@mail.com`,
    avatar: avatars[i],
    _id: userIds[i],
    lists: [listIds[i]],
    polls: [],
    createdAt: mongoose.Types.ObjectId(listIds[i]).getTimestamp()
}));
