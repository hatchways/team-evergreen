import React, { Component } from "react";
import renderAvatar from "../utils/renderAvatar";
import { withStyles } from "@material-ui/core/styles";
import { friendListStyles } from "../styles/friendListStyles";
import { AdornedButton } from "./AdornedButton";
import {
    Button,
    Dialog,
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
import { updateFriendList } from "../utils/updateFriendList";

class EditFriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            friends: [],
            errors: {},
            saveIsDisabled: true,
            loading: false
        };
    }

    componentDidMount() {
        const friendsIds = this.props.friends.map(friend => friend._id);
        this.setState({ title: this.props.title, friends: friendsIds });
    }

    closeDialog = () => {
        this.clearDialogData();
        this.props.closeDialog();
    };

    clearDialogData = () => {
        const friendsIds = this.props.friends.map(friend => friend._id);

        this.setState({
            title: this.props.title,
            friends: friendsIds,
            errors: {},
            saveIsDisabled: true,
            loading: false
        });
    };

    enableSaveButton = () => {
        this.setState({ saveIsDisabled: false });
    };

    disableSaveButton = () => {
        this.setState({ saveIsDisabled: true });
    };

    onChange = e => {
        const newTitle = e.target.value;

        this.setState({ title: newTitle });

        if (newTitle && newTitle !== this.props.title) {
            this.enableSaveButton();
        } else {
            this.disableSaveButton();
        }
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
            this.setState({ loading: true, saveIsDisabled: true }, () => {
                const newListData = {
                    userId: this.props.user._id
                };

                // send new title if it was changed:
                if (title !== this.props.title) {
                    newListData["title"] = title.trim();
                }

                // TODO: check if friend ids have changed:
                newListData["friends"] = friends;

                if (newListData.title || newListData.friends) {
                    updateFriendList(newListData, response => {
                        // use redux action to update list details in global state:
                        if (newListData.title) {
                            this.props.updateFriendListInState({
                                target: "title",
                                newData: title
                            });
                        }
                        if (newListData.friends) {
                            this.props.updateFriendListInState({
                                target: "friends",
                                newData: friends
                            });
                        }
                    });
                    setTimeout(() => {
                        this.closeDialog();
                        this.props.toggleSnackbar({
                            action: "open",
                            message: "Your list was successfully updated!"
                        });
                    }, 500);
                }
            });
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
        this.enableSaveButton();
    };

    toggleAllUsers = () => {
        if (this.state.friends.length === this.props.user.friends.length) {
            // clear all users from friends list:
            this.setState({ friends: [] });
        } else {
            // add all users as friends:
            const friends = this.props.user.friends.map(user => user._id);
            this.setState({ friends });
        }
        this.enableSaveButton();
    };

    render() {
        const { classes, user, dialogIsOpen } = this.props;
        const { friends, errors, title, saveIsDisabled, loading } = this.state;
        const isNameInvalid = errors.name && !title;
        const isListInvalid = errors.friends && !friends.length;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth="xs"
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
                                    error={isNameInvalid}
                                    onChange={this.onChange}
                                    id="list-name"
                                    placeholder="Enter name of list"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="list-name"
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
                                    {user.friends.length === friends.length
                                        ? "Remove all"
                                        : "Select all"}
                                </Button>
                            </div>
                            <Divider />
                            <List dense className={classes.list}>
                                {user.friends.map(user => {
                                    const included = friends.includes(user._id);
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
                </Dialog>
            </div>
        );
    }
}

export default withStyles(friendListStyles)(EditFriendsList);
