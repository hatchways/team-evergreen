//Vote.js

require("mongoose-type-url");
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        pollId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "poll",
            required: true
        },
        option: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("vote", voteSchema);
