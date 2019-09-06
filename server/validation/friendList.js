const Validator = require("validator");
const isEmpty = require("is-empty");

/* data: 
    userId: id,
    title: 'String',
    friends: [id1, id2, id3]
*/

module.exports = function validateFriendListInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.friends = !isEmpty(data.friends) ? data.friends : "";

    // Title check
    if (Validator.isEmpty(data.title)) {
        errors.title = "List title is required";
    }

    // Friends array check
    if (Validator.isEmpty(data.friends)) {
        errors.friends = "List should have at least one friend";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
