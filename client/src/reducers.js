import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    FETCH_REQUEST_FAILURE,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    LOGOUT,
    REGISTER_VOTE_SUCCESS
} from "./constants.js";

const userInitialState = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    lists: [],
    polls: [],
    error: ""
};

const usersInitialState = {
    users: [],
    error: ""
};

const friendsPollsInitialState = {
    polls: [
        {
            _id: "5d7e7a4b2c55c706fbed8ac1",
            options: [
                "https://evegreen.s3.us-west-1.amazonaws.com/9dcd48c7-4884-4a67-877d-ee778aebb376",
                "https://evegreen.s3.us-west-1.amazonaws.com/04292b5e-ca2b-4c17-842d-ae58d25ccc32"
            ],
            votes: [],
            title: "lfhsd",
            userId: "5d7da350c440f87937ef7174",
            sendToList: "5d7deb294313b8033fa98b85",
            createdAt: "2019-09-15T17:52:11.363+00:00"
        }
    ],
    error: ""
};

export const userReducer = (state = userInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_USER_DATA_SUCCESS:
            if (action.response.status === 200) {
                // return new state with user details:
                return Object.assign({}, state, {
                    _id: action.response.data._id,
                    name: action.response.data.name,
                    email: action.response.data.email,
                    polls: action.response.data.polls,
                    lists: action.response.data.lists,
                    avatar: action.response.data.avatar,
                    error: ""
                });
            } else if (action.response.status === 500) {
                // TODO: show spinner icon or eror
                return;
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case FETCH_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        case ADD_NEW_LIST:
            return Object.assign({}, state, {
                lists: [action.data, ...state.lists]
            });
        case ADD_NEW_POLL:
            return Object.assign({}, state, {
                polls: [action.data, ...state.polls]
            });
        case LOGOUT:
            return userInitialState;
        default:
            return state;
    }
};

export const usersReducer = (state = usersInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            // if user exists, proceed
            if (action.response.status === 200) {
                // exclude current user from all users
                // (logged in user shouldn't see himself in the friends list):
                const usersExceptCurrent = action.response.data.filter(
                    user => user._id !== action.id
                );

                // return new state with users:
                return Object.assign({}, state, {
                    users: usersExceptCurrent
                });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case FETCH_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
};

export const pollsReducer = (state = friendsPollsInitialState, action = {}) => {
    switch (action.type) {
        case REGISTER_VOTE_SUCCESS:
            if (action.response.status === 200) {
                // return new state with friends polls:
                return Object.assign({}, state, {
                    polls: action.response.data
                });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case FETCH_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
};
