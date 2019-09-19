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
}

export default postDataAPI;
