// friendList.js
// Created by Olga Fomin - September 5, 2019

require("mongoose-type-url");
const mongoose = require("mongoose");
// set useFindAndModify to false to avoid deprecation error related to findOneAndUpdate():
mongoose.set("useFindAndModify", false);

const friendListSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        title: {
            type: String,
            required: true
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("friendList", friendListSchema);
