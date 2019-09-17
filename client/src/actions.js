import {
    LOGOUT,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    FETCH_REQUEST_FAILURE,
    REGISTER_VOTE_SUCCESS
} from "./constants.js";

import fetchDataAPI from "./api/fetchUserData";
import fetchUsersAPI from "./api/fetchAllUsers";
import postDataAPI from "./api/postDataAPI";

export const loadUserData = data => dispatch => {
    return fetchDataAPI
        .fetchUserData(data)
        .then(response => {
            dispatch(fetchUserDataSuccess(response));
        })
        .catch(error => {
            dispatch(fetchRequestFailure(error));
        });
};

export const loadUsers = id => dispatch => {
    return fetchUsersAPI
        .fetchUsers(id)
        .then(response => {
            dispatch(fetchUsersSuccess(response, id));
        })
        .catch(error => {
            dispatch(fetchRequestFailure(error));
        });
};

export const registerVote = data => dispatch => {
    return postDataAPI
        .registerVote(data)
        .then(response => {
            dispatch(registerVoteSuccess(response));
        })
        .catch(error => {
            dispatch(fetchRequestFailure(error));
        });
};

export function fetchUsersSuccess(response, id) {
    return {
        type: FETCH_USERS_SUCCESS,
        response,
        id
    };
}

export function fetchUserDataSuccess(response) {
    return {
        type: FETCH_USER_DATA_SUCCESS,
        response
    };
}

export function registerVoteSuccess(response) {
    return {
        type: REGISTER_VOTE_SUCCESS,
        response
    };
}

export function addNewList(data) {
    return {
        type: ADD_NEW_LIST,
        data
    };
}

export function addNewPoll(data) {
    return {
        type: ADD_NEW_POLL,
        data
    };
}

export const logOut = () => {
    return {
        type: LOGOUT
    };
};

export function fetchRequestFailure(error) {
    return {
        type: FETCH_REQUEST_FAILURE,
        error
    };
}
