//getVotes.js

const Vote = require("../../models/Vote");

export async function getVotes(pollId) {
    await Vote.find({ pollId: pollId }, "option userId")
        .populate("name avatar")
        .then(results => {
            console.log(results);
            return { status: 200, results: results };
        })
        .catch(err => {
            return { status: 500, error: "Unable to get votes", err };
        });
}

// PRIVATE FUNCTIONS
