//Polls.js

require("mongoose-type-url");
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
    title: String,
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "friendList" // TODO - rename to actual model once created
    },
    poll: {
        1: {
            url: { type: mongoose.SchemaTypes.Url, required: true },
            votes: Number
        },
        2: {
            url: { type: mongoose.SchemaTypes.Url, required: true },
            votes: Number
        }
    },
    expiresOn: Date
});

module.exports = mongoose.model("poll", pollSchema);
