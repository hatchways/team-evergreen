//voteModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to cast a vote
 */

import Vote from "../../models/Vote";
import Poll from "../../models/Poll";

export async function registerVote(pollId, userId, option) {
    try {
        //Update the vote for this poll and this user
        await Vote.findOneAndUpdate(
            { userId: userId, pollId: pollId },
            { option: option },
            { new: true, upsert: true }
        );

        const newCounts = await parallelSumOfCounts(pollId);

        await Poll.findOneAndUpdate(
            { _id: pollId },
            {
                votes: newCounts
            }
        );

        return { status: 200, pollId: pollId, option: option };
    } catch (err) {
        console.log(`PollId:${pollId}, UserId:${userId}`, err);
        return { status: 500, message: "Error occurred while saving vote." };
    }
}

//PRIVATE FUNCTIONS

async function parallelSumOfCounts(pollId) {
    const promises = [
        Vote.where({
            _id: pollId,
            option: 0
        }).countDocuments(),
        Vote.where({
            _id: pollId,
            option: 1
        }).countDocuments()
    ];
    const [count0, count1] = await Promise.all(promises);
    return [count0, count1];
}
