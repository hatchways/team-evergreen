import React, { Component } from "react";
// import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import avatar from "../images/icons/user.png";
import Icon from "@material-ui/core/Icon";
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
    Avatar
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    title: {
        textAlign: "center"
        // paddingBottom: "0"
    },
    subtitle: {
        marginBottom: theme.spacing(2)
    },
    error: {
        marginTop: "2px",
        marginBottom: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    action: {
        justifyContent: "center"
    },
    item: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    }
});

// enhance dialog title area with close button:
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography>
            <Typography variant="h6">{children}</Typography>
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
    constructor() {
        super();
        this.state = {
            open: false,
            listName: "",
            friends: [],
            errors: {},
            users: [
                {
                    name: "Harry Potter",
                    id: 1
                },
                {
                    name: "Ron Weasley",
                    id: 2
                },
                {
                    name: "Hermione Granger",
                    id: 3
                }
            ]
        };
    }

    componentDidMount = () => {
        // fetch all users from database
        // axios.
        //   get('/users')
        //   .then(response => {
        //     this.setState({ users : response});
        // })
        // .catch(err => console.log);
    };

    openDialog = () => {
        this.setState({ open: true });
    };

    closeDialog = () => {
        this.setState({ open: false });
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
          this.setState({ errors: { friends: "List cannot be empty" } });
        } else {
          // create new list and send it to database
          const newList = {
            name: listName,
            friends
          }
        }
    };

    addFriend = (name) => {
        this.setState({ friends: this.state.friends.concat(name) });
    };

    render() {
        const { classes } = this.props;
        const { open, users, errors, listName } = this.state;

        return (
            <div>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={this.openDialog}>
                    Create friends list
                </Button>

                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.closeDialog}
                    aria-labelledby="create-friend-list"
                    open={open}>
                    <DialogTitle
                        className={classes.title}
                        id="create-friend-list"
                        onClose={this.closeDialog}>
                        Create a friend list
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
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
                                    {errors.name && !listName
                                        ? errors.name
                                        : ""}
                                </FormHelperText>
                            </FormControl>

                            <Typography
                                variant="subtitle1"
                                className={classes.subtitle}>
                                Add friends:
                            </Typography>
                            <Divider />
                            <List dense>
                                {users.map(user => (
                                    <ListItem
                                        key={user.id}
                                        className={classes.item}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar of ${user.name}`}
                                                src={avatar}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name} />
                                        <Divider />
                                        <ListItemSecondaryAction>
                                            <Button
                                                onClick={() => this.addFriend(user.name)}
                                                edge="end"
                                                variant="contained"
                                                size="small"
                                                color="secondary">
                                                Add
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
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
