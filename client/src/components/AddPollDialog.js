import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PollSnackbar from "./PollSnackbar";
import {
    Button,
    IconButton,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    FormControl,
    FormHelperText,
    Select,
    Icon,
    Grid
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { FileDrop } from "./FileDrop";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

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

class AddPollDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
            buttonIsDisabled: false,
            errors: {},
            snackbarIsOpen: false
        };
    }

    clearDialogData = () => {
        this.setState({
            userId: this.props.userId,
            title: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
            buttonIsDisabled: false,
            errors: {}
        });
    };

    closeDialog = () => {
        this.clearDialogData();
        this.props.togglePollDialog();
    };

    handleTitleChange = e => {
        this.setState({ title: e.target.value });
    };
    handleSelectChange = e => {
        this.setState({ sendToList: e.target.value });
    };

    openSnackbar = () => {
        this.setState({ snackbarIsOpen: true });
    };

    closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ snackbarIsOpen: false });
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, image1, image2, sendToList } = this.state;

        if (!title) {
            this.setState({
                errors: { title: "Please provide a question for the poll." }
            });
        } else if (!sendToList) {
            this.setState({
                errors: { list: "Please add a Friend list." }
            });
        } else if (!image1 || !image2) {
            this.setState({
                errors: { pollImages: "Please add both images." }
            });
        } else {
            // disable the submit button to avoid duplicates
            this.toggleSubmitButton();
            // load poll data and send it to upload api:
            let formData = new FormData();
            formData.append("userId", this.props.userId);
            formData.append("title", title);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("sendToList", sendToList);
            formData.append("target", "poll_images");

            axios
                .post("/api/images/upload", formData)
                .then(response => {
                    if (response.data.status !== 200) {
                        console.log(response.data.errors);
                        this.setState({
                            errors: { error: response.data.error }
                        });
                        return;
                    }

                    // add new poll to Profile and close dialog:
                    this.props.addNewPoll(response.data.data);
                    this.closeDialog();
                    // open snackbar with success message:
                    this.openSnackbar();
                })
                .catch(err => {
                    console.log(err);
                    //this.setState({ errors: err.response.data });
                });
        }
    };

    // callback function to retrieve file from FileDrop component
    setImageFile = (file, option) => {
        if (option === 1) {
            this.setState({ image1: file[0] });
        }
        if (option === 2) {
            this.setState({ image2: file[0] });
        }
    };

    toggleSubmitButton = () => {
        this.setState({ buttonIsDisabled: !this.state.buttonIsDisabled });
    };

    render() {
        const { classes, lists, hideButton } = this.props;
        const {
            errors,
            sendToList,
            title,
            buttonIsDisabled,
            snackbarIsOpen
        } = this.state;

        return (
            <div>
                <Button
                    onClick={this.props.togglePollDialog}
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{
                        display: hideButton ? "none" : "block" // hide button on poll page
                        // or on friend's profile
                    }}>
                    Create poll
                </Button>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.props.togglePollDialog}
                    aria-labelledby="create-poll"
                    open={this.props.pollDialogIsOpen}>
                    <DialogTitle
                        id="create-poll"
                        onClose={this.props.togglePollDialog}>
                        Create a poll
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Question:
                                </Typography>
                                <TextField
                                    value={title}
                                    error={errors.name && !title}
                                    onChange={this.handleTitleChange}
                                    id="poll-question"
                                    placeholder="Enter question ..."
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="poll-question-errir"
                                    className={classes.error}>
                                    {errors.title}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Friend list:
                                </Typography>
                                <Select
                                    value={sendToList}
                                    error={errors.list && !sendToList}
                                    onChange={this.handleSelectChange}
                                    input={<Input id="select-poll-list" />}
                                    displayEmpty={true}>
                                    {lists.map(list => {
                                        return (
                                            <MenuItem
                                                key={list._id}
                                                value={list._id}
                                                className={classes.item}>
                                                {list.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText
                                    error
                                    id="select-poll-error"
                                    className={classes.error}>
                                    {errors.list}
                                </FormHelperText>
                            </FormControl>
                            <Grid
                                container
                                justify="space-evenly"
                                direction="row">
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FileDrop
                                            option={1}
                                            setImageFile={this.setImageFile}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FileDrop
                                            option={2}
                                            setImageFile={this.setImageFile}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormHelperText
                                    error
                                    id="image-files-error"
                                    className={classes.error}>
                                    {errors.pollImages}
                                </FormHelperText>
                            </Grid>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={buttonIsDisabled}
                                color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <PollSnackbar
                    snackbarIsOpen={snackbarIsOpen}
                    closeSnackbar={this.closeSnackbar}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AddPollDialog);
