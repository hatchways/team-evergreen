import axios from "axios";

class fetchDataAPI {
    static fetchUserData(id) {
        return axios
            .get(`../api/users/user/${id}`)
            .then(response => {
                console.log("response from server: ", response);
                return response;
            })
            .catch(err => console.log(err));
    }
}

export default fetchDataAPI;
