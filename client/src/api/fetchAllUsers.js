import axios from "axios";

class fetchUsersAPI {
    static fetchUsers() {
        return axios
            .get("../api/users")
            .then(response => {
                console.log("response from server: ", response);
                return response;
            })
            .catch(err => console.log(err));
    }
}

export default fetchUsersAPI;
