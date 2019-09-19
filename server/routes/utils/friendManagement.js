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
        return { userId, friendId };
    } catch (err) {
        console.log(`${userId} attempting to follow ${friendId}`, err);
        return {
            status: 500,
            error: "Error occurred while trying to add friend."
        };
    }
}

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

export async function randomSuggestions(userId) {
    return "Random Suggestions";
}
