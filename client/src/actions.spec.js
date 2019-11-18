// testing of loadUserData() action

import {
    USER_DATA_LOADING,
    FETCH_USER_DATA_SUCCESS,
    API_REQUEST_FAILURE
} from "./constants";
import * as actions from "./actions";

// import configreStore to create a mock store where to dispatch actions
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// mock axios call
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];

// initialize mockStore
const mockStore = configureStore(middlewares);

// create a new mock instance of the MockAdapter:
const mock = new MockAdapter(axios);

const store = mockStore({});

describe("Testing loadUserData action", () => {
    beforeEach(() => {
        // runs before each test:
        store.clearActions();
    });

    it("should handle loadUserData action", () => {
        store.dispatch(actions.loadUserData());
        const action = store.getActions();

        const expectedAction = {
            type: USER_DATA_LOADING
        };

        expect(action[0]).toEqual(expectedAction);
    });

    it("should create an action fetchUserDataSuccess", () => {
        const response = "test";
        const expectedAction = {
            type: FETCH_USER_DATA_SUCCESS,
            response
        };
        expect(actions.fetchUserDataSuccess(response)).toEqual(expectedAction);
    });

    const data = {
        id: 1,
        name: "John Smith",
        email: "john.smith@mail.com"
    };

    it("should fetch user data", () => {
        store
            .dispatch(actions.loadUserData(data.id))
            .then(() => {
                const firstExpectedAction = {
                    type: USER_DATA_LOADING
                };
                expect(store.getActions()[0]).toEqual(firstExpectedAction);
            })
            .then(() => {
                // moch axios request to get user details:
                mock.onGet(`/api/users/user/${data.id}`).reply(200, { data });

                // test that fetchUserDataSuccess() is being dispatched after successful API call:
                store.dispatch(
                    actions.fetchUserDataSuccess(data).then(() => {
                        let secondExpectedAction = {
                            type: FETCH_USER_DATA_SUCCESS,
                            response: data
                        };

                        expect(store.getActions()[1]).toEqual(
                            secondExpectedAction
                        );
                    })
                );
            });
    });
});

// const loadItemData = () => dispatch => {
//     return axios
//         .get("someapi")
//         .then(response => {
//             dispatch({
//                 type: GET_ALL_ITEMS,
//                 payload: {
//                     data: response.data
//                 }
//             });
//         })
//         .catch(error => {
//             console.log("Error" + error);
//         });
// };
