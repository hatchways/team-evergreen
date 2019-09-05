//Polls.js

require("mongoose-type-url");
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sendToList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "friendList", // TODO - rename to actual model once created,
        required: true
    },
    options: {
        1: {
            url: { type: String, required: true },
            votes: { type: Number, default: 0 }
        },
        2: {
            url: { type: String, required: true },
            votes: { type: Number, default: 0 }
        }
    },
    expiresOn: Date
});

module.exports = mongoose.model("poll", pollSchema);
