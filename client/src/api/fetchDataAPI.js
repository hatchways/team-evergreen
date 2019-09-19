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
            .get(`../api/poll/requests`, {
                params: {
                    userId: id
                }
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
}

export default fetchDataAPI;
