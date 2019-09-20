import axios from "axios";

class postDataAPI {
    static registerVote(data) {
        return axios
            .post("../api/poll/vote", data)
            .then(response => {
                console.log("response in registerVote: ", response);
                return response;
            })
            .catch(err => console.log(err));
    }

    static changeFriendStatus(data) {
        const dataToSend = {
            userId: data.userId,
            friendId: data.friendId
        };

        return axios
            .post(`../api/friends/${data.action}`, dataToSend)
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log("error changing user status: ", err);
                return err;
            });
    }
}

export default postDataAPI;
