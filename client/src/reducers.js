import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    API_REQUEST_FAILURE,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    LOGOUT,
    REGISTER_VOTE_SUCCESS,
    GET_FRIENDS_POLLS_SUCCESS,
    CHANGE_FRIEND_STATUS_SUCCESS
} from "./constants.js";

const userInitialState = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    lists: [],
    polls: [],
    friends: [],
    error: ""
};

const usersInitialState = {
    users: [],
    error: ""
};

const friendsPollsInitialState = {
    friendsPolls: [],
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
                    friends: action.response.data.friends,
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

        case API_REQUEST_FAILURE:
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

        case CHANGE_FRIEND_STATUS_SUCCESS:
            if (action.action === "follow") {
                if (action.response.data.status !== 500) {
                    const newFriend = {
                        _id: action.response.data.friendId,
                        name: action.response.data.name,
                        avatar: action.response.data.avatar
                    };
                    return Object.assign({}, state, {
                        friends: [...state.friends, newFriend]
                    });
                } else {
                    return Object.assign({}, state, {
                        error: action.error
                    });
                }
            } else {
                if (action.response.data.status !== 500) {
                    const updatedFriends = state.friends.filter(
                        friend => friend._id !== action.response.data.friendId
                    );
                    return Object.assign({}, state, {
                        friends: updatedFriends
                    });
                } else {
                    return Object.assign({}, state, {
                        error: action.error
                    });
                }
            }

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

        case API_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
};

export const pollsReducer = (state = friendsPollsInitialState, action = {}) => {
    switch (action.type) {
        case GET_FRIENDS_POLLS_SUCCESS:
            if (action.response.status === 200) {
                return Object.assign({}, state, {
                    friendsPolls: action.response.data
                });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }
        case REGISTER_VOTE_SUCCESS:
            if (action.response.status === 200) {
                const { pollId, newCounts } = action.response.data;

                const updatedPolls = state.friendsPolls.map(poll => {
                    // Find the poll with the matching pollId
                    if (poll._id === pollId) {
                        // Return a new object
                        return {
                            ...poll, // copy the existing poll
                            votes: newCounts // replace the votes array
                        };
                    }

                    // Leave every other poll unchanged
                    return poll;
                });

                return Object.assign({}, state, { friendsPolls: updatedPolls });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case API_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
};
