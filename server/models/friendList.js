// friendList.js
// Created by Olga Fomin - September 5, 2019

require("mongoose-type-url");
const mongoose = require("mongoose");

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
                ref: "user",
                required: true
            }
        ]
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("friendList", friendListSchema);
