import React, { Component } from "react";
import renderAvatar from "../utils/renderAvatar";
import { withStyles } from "@material-ui/core/styles";
import { friendListStyles } from "../styles/friendListStyles";
import { AdornedButton } from "./AdornedButton";
import {
    Button,
    DialogContent,
    DialogActions,
    Divider,
    TextField,
    Typography,
    FormControl,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction
} from "@material-ui/core";
import { DialogTitle } from "./DialogTitle";
import { updateFriendList } from "../utils/manageFriendList";
import { ResponsiveDialog } from "./ResponsiveDialog";

class EditFriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            friends: [],
            errors: {},
            saveIsDisabled: false,
            loading: false
        };
    }

    retrieveIds = users => users.map(user => user._id);

    componentDidMount() {
        // initialize friends array with friends that were
        // previously selected for current list:
        const friendsIds = this.retrieveIds(this.props.friends);
        this.setState({ title: this.props.title, friends: friendsIds });
    }

    closeDialog = () => {
        this.clearDialogData();
        this.props.closeDialog();
    };

    clearDialogData = () => {
        const friendsIds = this.retrieveIds(this.props.friends);

        this.setState({
            title: this.props.title,
            friends: friendsIds,
            errors: {},
            saveIsDisabled: false,
            loading: false
        });
    };

    onChange = e => this.setState({ title: e.target.value });

    areAllOldFriends = () => {
        const newFriends = this.state.friends;
        const oldFriends = this.props.friends;

        return (
            oldFriends.length === newFriends.length &&
            oldFriends.every(friend => newFriends.includes(friend._id))
        );
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, friends } = this.state;

        if (!title) {
            this.setState({ errors: { name: "Please provide list name" } });
        } else if (!friends.length) {
            this.setState({
                errors: { friends: "Please add friends to the list" }
            });
        } else {
            const listData = { listId: this.props.listId };

            // send new title if it was changed:
            if (title !== this.props.title) {
                listData["title"] = title.trim();
            }

            // send new friends array if friends were changed:
            if (!this.areAllOldFriends()) {
                listData["friends"] = friends;
            }

            if (listData.title || listData.friends) {
                this.setState(
                    { loading: true, saveIsDisabled: true, errors: {} },
                    () => {
                        updateFriendList(listData, response => {
                            if (response.status === 200) {
                                // use redux action to update list details in global state:
                                setTimeout(() => {
                                    if (listData.title) {
                                        this.props.updateFriendListInState({
                                            listId: this.props.listId,
                                            target: "title",
                                            newData: title.trim()
                                        });
                                    }

                                    if (listData.friends) {
                                        // save friend with name and avatar, not just id:
                                        friends.forEach((id, i, array) => {
                                            const user = this.props.user.friends.find(
                                                user => user._id === id
                                            );

                                            if (user) {
                                                array[i] = {
                                                    _id: id,
                                                    name: user.name,
                                                    avatar: user.avatar
                                                };
                                            }
                                        });

                                        this.props.updateFriendListInState({
                                            listId: this.props.listId,
                                            target: "friends",
                                            newData: friends
                                        });
                                    }
                                    this.closeDialog();
                                    this.props.toggleSnackbar({
                                        action: "open",
                                        message:
                                            "Your list was successfully updated!"
                                    });
                                }, 500);
                            } else {
                                this.setState({ errors: response });
                            }
                        });
                    }
                );
            } else {
                this.setState({
                    errors: { error: "You have not modified your list" }
                });
            }
        }
    };

    onCancel = () => {
        this.closeDialog();
    };

    handleClick = id => {
        if (this.state.friends.includes(id)) {
            // remove friend from friends list:
            this.setState(prevState => ({
                friends: prevState.friends.filter(friendId => friendId !== id)
            }));
        } else {
            // add friend to friends list:
            this.setState({ friends: this.state.friends.concat(id) });
        }
    };

    toggleAllUsers = () => {
        if (this.state.friends.length === this.props.user.friends.length) {
            // clear all users from friends list:
            this.setState({ friends: [] });
        } else {
            // add all users as friends:
            const friends = this.retrieveIds(this.props.user.friends);
            this.setState({ friends });
        }
    };

    render() {
        const { classes, user, dialogIsOpen } = this.props;
        const newFriends = this.state.friends; // new list of friends
        const allFriends = user.friends; // all friends of current user
        const { errors, title, saveIsDisabled, loading } = this.state;
        const isNameInvalid = errors.name && !title;
        const isListInvalid = errors.friends && !newFriends.length;

        return (
            <div>
                <ResponsiveDialog
                    onClose={this.closeDialog}
                    aria-labelledby="edit-friend-list"
                    open={dialogIsOpen}>
                    <DialogTitle
                        id="edit-friend-list"
                        onClose={this.closeDialog}>
                        Edit a friend list
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    value={title}
                                    error={isNameInvalid || isListInvalid}
                                    onChange={this.onChange}
                                    aria-describedby="list-name-message"
                                    placeholder="Enter name of list"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="list-name-message"
                                    className={classes.error}>
                                    {isNameInvalid
                                        ? errors.name
                                        : isListInvalid
                                        ? errors.friends
                                        : errors.error}
                                </FormHelperText>
                            </FormControl>

                            <div className={classes.flexBox}>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Add or remove friends:
                                </Typography>
                                <Button
                                    onClick={this.toggleAllUsers}
                                    color="secondary"
                                    className={classes.button}>
                                    {newFriends.length === allFriends.length
                                        ? "Remove all"
                                        : "Select all"}
                                </Button>
                            </div>
                            <Divider />
                            <List dense className={classes.list}>
                                {allFriends.map(user => {
                                    const included = newFriends.includes(
                                        user._id
                                    );
                                    return (
                                        <ListItem
                                            key={user._id}
                                            className={classes.item}>
                                            <ListItemAvatar>
                                                {renderAvatar(user, classes)}
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    className={classes.button}
                                                    onClick={() =>
                                                        this.handleClick(
                                                            user._id
                                                        )
                                                    }
                                                    variant={
                                                        included
                                                            ? "text"
                                                            : "contained"
                                                    }
                                                    size="small"
                                                    color="secondary">
                                                    {included
                                                        ? "Remove"
                                                        : "Add"}
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <AdornedButton
                                loading={loading}
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={saveIsDisabled}
                                color="secondary">
                                Save
                            </AdornedButton>
                            <Button
                                type="button"
                                onClick={this.onCancel}
                                variant="contained"
                                size="small"
                                color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </ResponsiveDialog>
            </div>
        );
    }
}

export default withStyles(friendListStyles)(EditFriendsList);
