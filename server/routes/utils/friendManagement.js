//friendManagement.js

import User from "../../models/User";

//Add user to friends list

export async function followUser(userId, friendId) {
    return "follow";
}

export async function unFollowUser(userId, friendId) {
    return { o: "follow" };
}
