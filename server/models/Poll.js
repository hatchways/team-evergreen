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
            url: { type: mongoose.SchemaTypes.Url, required: true },
            votes: Number,
            required: true
        },
        2: {
            url: { type: mongoose.SchemaTypes.Url, required: true },
            votes: Number,
            required: true
        }
    },
    expiresOn: Date
});

module.exports = mongoose.model("poll", pollSchema);
