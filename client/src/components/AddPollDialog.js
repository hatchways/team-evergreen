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
    Select,
    Avatar,
    Icon
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { FileDrop } from "./FileDrop";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(4)
    },
    title: {
        fontWeight: "600",
        textAlign: "center"
    },
    subtitle: {
        fontWeight: "600",
        marginBottom: theme.spacing(2)
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
        paddingTop: theme.spacing(2)
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

class AddPollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pollName: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
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
        this.setState({
            userId: this.props.userId,
            pollName: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
            errors: {}
        });
    };

    onChange = e => {
        this.setState({ pollName: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { pollName, image1, image2, expiresOn, sendToList } = this.state;

        if (!pollName) {
            this.setState({
                errors: { title: "Please provide a question for the poll." }
            });
        } else if (!sendToList) {
            this.setState({
                errors: { sendToList: "Please add a Friend list." }
            });
        } else if (!image1 || !image2) {
            this.setState({
                errors: { pollImages: "Please add both images." }
            });
        } else {
            // create new list and send it to database:
            const newPoll = {
                userId: this.props.userId,
                title: pollName,
                image1: image1,
                image2: image2,
                expiresOn: expiresOn,
                sendToList: sendToList,
                target: "poll-images"
            };

            axios
                .post("/api/images/upload", newPoll)
                .then(response => {
                    if (response.data.status !== 200) {
                        this.setState({
                            errors: { error: response.data.error }
                        });
                        return;
                    }

                    // add new poll to Profile and close dialog:
                    // this.props.addNewPoll(response.data);
                    // this.closeDialog();
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ errors: err.response.data });
                });
        }
    };

    render() {
        const { classes } = this.props;
        const { users } = this.props;
        const { open, errors, sendToList, title, image1, image2, friendLists } = this.state; // TODO need to add the
        // list of
        // polls
        const isQuestionInvalid = errors.title && !title;
        const isImage1Invalid = errors.images && !image1.length;
        const isImage2Invalid = errors.images && !image2.length;
        const isSendToListInvalid = errors.sendToList && !sendToList.length;

        return (
            <div>
                <Button
                    onClick={this.openDialog}
                    variant="contained"
                    color="primary"
                    size="medium">
                    Create poll
                </Button>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.closeDialog}
                    aria-labelledby="create-poll"
                    open={open}>
                    <DialogTitle id="create-poll" onClose={this.closeDialog}>
                        Create a poll
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    value={title}
                                    error={errors.name && !title}
                                    onChange={this.onChange}
                                    id="poll-question"
                                    placeholder="Enter question ..."
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="poll-question"
                                    className={classes.error}>
                                    {isQuestionInvalid
                                        ? errors.title
                                        : isListInvalid
                                        ? errors.friends
                                        : errors.error}
                                </FormHelperText>

                                <FileDrop
                                    value={image1}
                                    error={errors.image1 && !image1}
                                    onChange={this.onChange}
                                    id="image1"
                                    placeholder=""
                                    margin="none"
                                    variant="outlined"
                                />

                                <FormHelperText
                                    error
                                    id="image1"
                                    className={classes.error}>
                                    {isImage1Invalid
                                        ? errors.images
                                        : isSendToListInvalid
                                        ? errors.sendToList
                                        : errors.error}
                                </FormHelperText>

                                <FileDrop
                                    value={image2}
                                    error={errors.image2 && !image2}
                                    onChange={this.onChange} // TODO How do I handle the change events
                                    id="image2"
                                    placeholder=""
                                    margin="none"
                                    variant="outlined"
                                />

                                <FormHelperText
                                    error
                                    id="image2"
                                    className={classes.error}>
                                    {isImage2Invalid
                                        ? errors.images
                                        : isListInvalid
                                        ? errors.friends
                                        : errors.error}
                                </FormHelperText>

                                <Select
                                    value={sendToList}
                                    onChange={handleChange}
                                    input={<Input id="select-list" />}
                                    displayEmpty={true}
                                    {friendLists.map(list => (
                                        <MenuItem
                                            key={_id}
                                            value={title}
                                            style={getStyles(
                                                listName,
                                                theme
                                            )}>
                                            {listName}
                                        </MenuItem>
                                    ))}>
                                </Select>
                            </FormControl>

                            <Typography
                                variant="subtitle1"
                                component="h4"
                                className={classes.subtitle}>
                                Add friends:
                            </Typography>
                            <Divider />

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

export default withStyles(styles)(AddPollDialog);
