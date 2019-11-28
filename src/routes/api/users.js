//users.js

// Core packages to enable routing functionality
const express = require("express");
const router = express.Router();

// Loads .env keys needed for routing functions
const keys = require("../../config/config");
const SECRET = keys.app.secretOrKey;

// Used to encrypt/decrypt password and for using jwt token
const bcrypt = require("bcryptjs");

// LOAD VALIDATION FUNCTIONS
import { validateRegisterInput } from "../../validation/register";
import { validateLoginInput } from "../../validation/login";
import { validateUserDataInput } from "../../validation/userData";
import { createToken } from "../utils/routeAuthorization";

// LOAD DATA MODELS
const User = require("../../models/User");
const FriendList = require("../../models/FriendList");

// ROUTES
/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 * */
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user =>
                            createToken(
                                {
                                    id: user.id,
                                    name: user.name
                                },
                                res,
                                SECRET
                            )
                        )
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

/**
 * @route POST api/users/login
 * @desc Login user and return a JWT token
 */
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }

        // Check password
        bcrypt
            .compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT token and return via res.json
                    createToken(
                        {
                            id: user.id,
                            name: user.name
                        },
                        res,
                        SECRET
                    );
                } else {
                    return res
                        .status(400)
                        .json({ password: "Password incorrect" });
                }
            })
            .catch();
    });
});

// @route GET api/users/user/:id
// @desc Get all information for a single user
// @access Private
router.get("/user/:id", (req, res) => {
    User.findById(req.params.id)
        .populate({
            path: "polls",
            options: {
                sort: {
                    complete: "descending",
                    createdAt: "descending"
                }
            },
            populate: {
                path: "sendToList",
                select: "title"
            }
        })
        .populate({
            path: "lists",
            options: {
                sort: {
                    updatedAt: "descending"
                }
            },
            populate: {
                path: "friends",
                select: "name avatar"
            } // select only name and avatar for each friend
        })
        .populate("friends", "name _id avatar online")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).json({
                error: "Unable to retrieve user data"
            });
        });
});

// @route PATCH /
// @desc Update User Data
// @params req.body.userId, req.body.email, req.body.name
// @access Private
router.patch("/", (req, res) => {
    const { errors, isValid } = validateUserDataInput(req.body);
    const { userId, email, name } = req.body;
    if (!isValid) {
        res.status(400).json(errors);
    }

    const dataToUpdate = {
        email: email,
        name: name
    };

    User.findByIdAndUpdate(userId, dataToUpdate, {
        lean: true,
        omitUndefined: true
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
