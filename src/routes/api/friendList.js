// Core packages to enable routing functionality
const express = require("express");
const router = express.Router();

// VALIDATION FUNCTIONS
import { validateFriendListInput } from "../../validation/friendList";

// DATA MODELS
const FriendList = require("../../models/friendList");
const User = require("../../models/User");

// ROUTES
// @route POST api/friend-list/add
// @desc Create a new friends list
// @params req.body.userId, req.body.title, req.body.friends
router.post("/add", (req, res) => {
    const { errors, isValid } = validateFriendListInput(req.body);

    // validate request info:
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newList = new FriendList({
        userId: req.body.userId,
        title: req.body.title,
        friends: req.body.friends
    });

    // check that title is unique for this user before saving list:
    FriendList.find({ userId: req.body.userId })
        .select("title")
        .then(result => {
            if (
                result.length &&
                result.find(
                    list =>
                        list.title.toLowerCase() ===
                        req.body.title.toLowerCase()
                )
            ) {
                return res
                    .status(400)
                    .json({ error: "List with this name already exists" });
            } else {
                newList
                    .save()
                    .then(list => {
                        User.findOneAndUpdate(
                            { _id: req.body.userId },
                            {
                                $push: {
                                    lists: list["_id"]
                                }
                            }
                        )
                            .then(response => {
                                res.json(list);
                            })
                            .catch(err => {
                                console.log("error: ", err);
                                return res.status(500).json({
                                    error: "Cannot create a new list"
                                });
                            });
                    })
                    .catch(err => {
                        console.log("error: ", err);
                        res.status(500).json({
                            error: "Unable to create a new list"
                        });
                    });
            }
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).json({
                error: "Unable to create a new list"
            });
        });
});

// @route PATCH api/friend-list/
// @desc Update friend list data
// @params req.body.listId, req.body.title, req.body.friends
router.patch("/", (req, res) => {
    const { errors, isValid } = validateFriendListInput(req.body);
    const { listId, title, friends } = req.body;

    // validate request data:
    if (!isValid) return res.status(400).json(errors);

    const dataToUpdate = { title, friends };

    FriendList.findByIdAndUpdate(listId, dataToUpdate, {
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

// @route DELETE api/friend-list/
// @desc Delete friend list
// @params req.body.listId
// TODO: add delete friend list route

module.exports = router;
