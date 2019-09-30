//friendManagement.js

import User from "../../models/User";

//Add user to friends list
export async function followUser(userId, friendId) {
    try {
        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: { friends: friendId }
            }
        ).exec();
        const details = await User.findById(friendId, "name avatar").exec();
        return {
            userId,
            friendId,
            name: details["name"],
            avatar: details["avatar"]
        };
    } catch (err) {
        console.log(`${userId} attempting to follow ${friendId}`, err);
        return {
            status: 500,
            error: "Error occurred while trying to add friend."
        };
    }
}

//Remove user from friend list
export async function unFollowUser(userId, friendId) {
    try {
        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $pull: { friends: friendId }
            }
        ).exec();
        return { userId, friendId };
    } catch (err) {
        console.log(`${userId} attempting to un-follow ${friendId}`, err);
        return {
            status: 500,
            error: "Error occurred while trying to remove friend."
        };
    }
}

//Return a sample of users
export async function getSampleOfUsers(
    userId,
    sampleSize = DEFAULT_SAMPLE_SIZE
) {
    try {
        const listOf = await User.findById(
            { _id: userId },
            { friends: 1, _id: 0 }
        ).exec();
        let exclusionList = listOf.friends;
        exclusionList.push(userId);
        return await User.aggregate([
            { $project: { name: 1, avatar: 1 } },
            { $match: { _id: { $nin: exclusionList } } },
            { $sample: { size: sampleSize } }
        ]).exec();
    } catch (err) {
        console.log(`Unable to select sample for ${userId}`, err);
        return {
            status: 500,
            error: "Error occurred while trying to select sample."
        };
    }
}
