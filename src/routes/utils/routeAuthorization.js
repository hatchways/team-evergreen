//routeAuthorization.js

import jwt from "jsonwebtoken";

const TOKEN_LIFETIME = 31556926;

export function isRequestAuthorized(token, secret) {
    console.log(token);
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
}

/**
 * @desc Creates a JWT token and returns it via callback provided
 * @params user - an instance of a users
 * @params res - call back function
 * @access Private
 */
export function createToken(payload, res, secret, expiration = TOKEN_LIFETIME) {
    // Sign token
    jwt.sign(
        payload,
        secret,
        {
            expiresIn: expiration // 1 year in seconds
        },
        (err, token) => {
            if (!err) {
                res.json({
                    status: 200,
                    token: `Bearer ${token}`
                });
            } else {
                res.json({
                    status: 500,
                    error: "Unable to generate token."
                });
            }
        }
    );
}
