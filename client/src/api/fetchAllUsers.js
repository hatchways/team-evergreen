import axios from "axios";

class fetchUsersAPI {
    static fetchUsers() {
        return axios
            .get("../api/users")
            .then(response => {
                return response;
            })
            .catch(err => console.log(err));
    }
}

export default fetchUsersAPI;
