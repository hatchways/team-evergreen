import axios from "axios";

class fetchDataAPI {
    static fetchUserData(id) {
        return axios
            .get(`../api/users/user/${id}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
    static fetchUsers() {
        return axios
            .get("../api/users")
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
    static fetchFriendsPolls(id) {
        return axios
            .get(`../api/polls/${id}`)
            .then(response => {
                console.log("response from server: ", response);
                return response;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
}

export default fetchDataAPI;
