import axios from "axios";

export async function updateFriendList(newData, cb) {
    await axios
        .patch("/api/friend-list", newData)
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log("Error updating friend list: ", err);
            cb(err);
        });
}

export async function deleteFriendList(payload, cb) {
    await axios
        .delete("/api/friend-list", {
            data: payload
        })
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log("Error deleting friend list: ", err);
            cb(err);
        });
}
