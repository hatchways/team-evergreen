import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
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
    ListItemSecondaryAction,
    Avatar,
    Icon
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(4)
    },
    title: {
        fontWeight: "600",
        textAlign: "center"
    },
    subtitle: {
        fontWeight: "600"
    },
    error: {
        marginBottom: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    action: {
        justifyContent: "center",
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4)
    },
    list: {
        maxHeight: "220px"
    },
    item: {
        paddingLeft: "6px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    button: {
        padding: "4px 8px",
        "&.MuiButton-text": {
            textTransform: "initial"
        }
    },
    flexBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

// enhance default dialog title area with close button:
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" component="h3" className={classes.title}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class AddFriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listName: "",
            friends: [],
            errors: {}
        };
    }

    openDialog = () => {
        this.setState({ open: true });
    };

    closeDialog = () => {
        this.clearDialogData();
        this.setState({ open: false });
    };

    clearDialogData = () => {
        this.setState({ listName: "", friends: [], errors: {} });
    };

    onChange = e => {
        this.setState({ listName: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { listName, friends } = this.state;

        if (!listName) {
            this.setState({ errors: { name: "Please provide list name" } });
        } else if (!friends.length) {
            this.setState({
                errors: { friends: "Please add friends to the list" }
            });
        } else {
            // create new list and send it to database:
            const newList = {
                userId: this.props.userId,
                title: listName,
                friends
            };

            axios
                .post("/api/users/add_friend_list", newList)
                .then(response => {
                    if (response.data.status === 500) {
                        this.setState({
                            errors: { error: response.data.error }
                        });
                        return;
                    }

                    // add new list to Profile and close dialog:
                    this.props.addNewList(response.data);
                    this.closeDialog();
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ errors: err.response.data });
                });
        }
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
        if (this.state.friends.length === this.props.users.length) {
            // clear all users from friends list:
            this.setState({ friends: [] });
        } else {
            // add all users as friends:
            const friends = this.props.users.map(user => user._id);
            this.setState({ friends });
        }
    };

    render() {
        const { classes } = this.props;
        const { users } = this.props;
        const { open, friends, errors, listName } = this.state;
        const isNameInvalid = errors.name && !listName;
        const isListInvalid = errors.friends && !friends.length;

        return (
            <div>
                <Button
                    onClick={this.openDialog}
                    variant="contained"
                    color="primary"
                    size="medium">
                    Create list
                </Button>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.closeDialog}
                    aria-labelledby="create-friend-list"
                    open={open}>
                    <DialogTitle
                        id="create-friend-list"
                        onClose={this.closeDialog}>
                        Create a friend list
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    value={listName}
                                    error={errors.name && !listName}
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
                                    Add friends:
                                </Typography>
                                <Button
                                    onClick={this.toggleAllUsers}
                                    color="secondary"
                                    className={classes.button}>
                                    {users.length === friends.length
                                        ? "Remove all"
                                        : "Select all"}
                                </Button>
                            </div>
                            <Divider />
                            <List dense className={classes.list}>
                                {users.map(user => {
                                    const included = friends.includes(user._id);
                                    return (
                                        <ListItem
                                            key={user._id}
                                            className={classes.item}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar of ${user.name}`}
                                                    src={user.avatar}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} />
                                            <Divider />
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
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddFriendsList);
