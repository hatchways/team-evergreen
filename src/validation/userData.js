//userData.js

const isEmpty = require("is-empty");
const validator = require("validator");

export function validateUserDataInput(data) {
    let errors = {};

    // Make sure there is at least one data value
    if (isEmpty(data.name) && isEmpty(data.email)) {
        errors.data = "At least one of email or name is required.";
    }

    // Email checks
    if (!isEmpty(data.email) && !validator.isEmail(data.email)) {
        errors.email = "Email is not valid.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
