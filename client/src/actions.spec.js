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

    it("should dispatch USER_DATA_LOADING action", () => {
        const id = "5dcdd278444d9e3b260562f1";

        store.dispatch(actions.loadUserData(id));
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

    it("should create an action apiRequestFailure", () => {
        const error = "Some error";
        const expectedAction = {
            type: API_REQUEST_FAILURE,
            error
        };
        expect(actions.apiRequestFailure(error)).toEqual(expectedAction);
    });
});

describe("Testing loadUserData()", () => {
    beforeEach(() => {
        // Runs before each test in the suite
        store.clearActions();
    });

    it("should get FETCH_USER_DATA_SUCCESS after fetch request", () => {
        mock.onGet("./api/users/user/12345").reply(200, {
            data: { _id: "12345", name: "John Smith" }
        });

        store
            .dispatch(actions.loadUserData("5dcdd278444d9e3b260562f1"))
            .then(() => {
                let expectedActions = [
                    {
                        type: USER_DATA_LOADING
                    },
                    {
                        type: FETCH_USER_DATA_SUCCESS,
                        response: {
                            _id: "12345",
                            name: "John Smith"
                        }
                    }
                ];

                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
