import {
    FETCH_USER_DATA_SUCCESS,
    LOGOUT,
    USER_DATA_LOADING,
    UPDATE_USER_DATA
} from "./constants.js";

import { userReducer } from "./reducers";

describe("Load user data", () => {
    const userInitialState = {
        _id: "",
        name: "",
        email: "",
        avatar: "",
        lists: [],
        polls: [],
        friends: [],
        error: "",
        isLoading: false,
        online: false
    };

    it("should return initial user state", () => {
        expect(userReducer(undefined, {})).toEqual(userInitialState);
    });

    it("should handle USER_DATA_LOADING action", () => {
        expect(
            userReducer(userInitialState, {
                type: USER_DATA_LOADING
            })
        ).toEqual({
            _id: "",
            name: "",
            email: "",
            avatar: "",
            lists: [],
            polls: [],
            friends: [],
            error: "",
            isLoading: true,
            online: false
        });
    });

    it("should handle FETCH_USER_DATA_SUCCESS action", () => {
        expect(
            userReducer(userInitialState, {
                type: FETCH_USER_DATA_SUCCESS,
                response: {
                    _id: "5dcdd278444d9e3b260562f1",
                    name: "Joel Garrett",
                    email: "joel.garrett@example.com",
                    avatar:
                        "https://randomuser.me/api/portraits/thumb/men/87.jpg",
                    lists: [],
                    polls: [],
                    friends: [],
                    online: false
                }
            })
        ).toEqual({
            _id: "5dcdd278444d9e3b260562f1",
            name: "Joel Garrett",
            email: "joel.garrett@example.com",
            avatar: "https://randomuser.me/api/portraits/thumb/men/87.jpg",
            lists: [],
            polls: [],
            friends: [],
            error: "",
            isLoading: false,
            online: false
        });
    });

    it("should handle LOGOUT action", () => {
        expect(
            userReducer(userInitialState, {
                type: LOGOUT
            })
        ).toEqual(userInitialState);
    });

    it("should handle UPDATE_USER_DATA action", () => {
        expect(
            userReducer(userInitialState, {
                type: UPDATE_USER_DATA,
                target: "name",
                newData: "Testname Testsurname"
            })
        ).toEqual({
            _id: "",
            name: "Testname Testsurname",
            email: "",
            avatar: "",
            lists: [],
            polls: [],
            friends: [],
            error: "",
            isLoading: false,
            online: false
        });
    });
});
