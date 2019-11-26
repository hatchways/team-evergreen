import axios from "axios";

export async function createFriendList(newList, cb) {
    await axios
        .post("/api/friend-list/add", newList)
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log("Error creating friend list: ", err);
            cb(err.response.data);
        });
}

export async function updateFriendList(newData, cb) {
    await axios
        .patch("/api/friend-list", newData)
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log("Error updating friend list: ", err);
            cb(err.response);
        });
}
