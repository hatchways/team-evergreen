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
        ).exec();

        // Retrieves counts by option and total # of votes needed
        // newCounts[0,1] = vote counts for options
        // newCounts[2] = number of votes needed
        const newCounts = await parallelSumOfCounts(pollId);

        await Poll.findOneAndUpdate(
            { _id: pollId },
            {
                votes: newCounts,
                complete: newCounts[0] + newCounts[1] === newCounts[2]
            }
        ).exec();
        return { pollId: pollId, option: option, newCounts: newCounts };
    } catch (err) {
        return { status: 500, message: "Error occurred while saving vote." };
    }
}

//PRIVATE FUNCTIONS

export async function parallelSumOfCounts(pollId) {
    const promises = [
        Vote.where({
            pollId: pollId,
            option: 0
        }).countDocuments(),
        Vote.where({
            pollId: pollId,
            option: 1
        }).countDocuments(),
        Poll.findById(pollId).populate("sendToList", "friends")
    ];
    const [count0, count1, friends] = await Promise.all(promises);
    return [count0, count1, friends.length];
}
