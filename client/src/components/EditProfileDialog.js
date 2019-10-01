import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
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
    Icon
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { FileDrop } from "./FileDrop";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";

const TARGET_AVATAR = "avatar_image";

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

class EditProfileDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            avatar: "",
            email: "",
            target: TARGET_AVATAR,
            saveIsDisabled: true,
            errors: {}
        };
    }

    clearDialogData = () => {
        this.setState({
            userId: this.props.userId,
            name: this.props.name,
            avatar: this.props.avatar,
            email: this.props.email,
            target: TARGET_AVATAR,
            saveIsDisabled: true,
            errors: {}
        });
    };

    closeDialog = () => {
        this.clearDialogData();
        this.props.toggleEditProfileDialog();
    };

    handleNameChange = e => {
        if (e.target.value !== this.props.name) {
            this.setState({ name: e.target.value });
            this.setState({ saveIsDisabled: false });
        }
    };

    handleEmailChange = e => {
        if (e.target.value !== this.props.email) {
            this.setState({ email: e.target.value });
            this.setState({ saveIsDisabled: false });
        }
    };

    handleAvatarChange = e => {
        if (e.target.value !== this.props.avatar) {
            this.setState({ avatar: e.target.value });
            this.enableSaveButton();
        }
    };

    enableSaveButton = () => {
        this.setState({ saveIsDisabled: false });
    };

    disableSaveButton = () => {
        this.setState({ saveIsDisabled: true });
    };

    onCancel = () => {
        // Added middle step in the event we need to add some closing routines
        this.closeDialog();
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, email, avatar } = this.state;

        if (!name) {
            this.setState({
                errors: { name: "You need to provide a name." }
            });
        } else if (!email) {
            this.setState({
                errors: { email: "You need to provide an e-mail." }
            });
        } else {
            // disable the submit button to avoid duplicates
            this.disableSaveButton();
            // load poll data and send it to upload api:
            let formData = new FormData();
            formData.append("userId", this.props.userId);
            formData.append("name", this.state.name);
            formData.append("email", this.state.email);
            formData.append("avatar", this.state.avatar);
            formData.append("target", TARGET_AVATAR);

            console.log(formData);
        }
    };

    render() {
        const { classes, hideButton } = this.props;
        const { errors, name, email, avatar, saveIsDisabled } = this.state;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.props.toggleEditProfileDialog}
                    aria-labelledby="edit-profile"
                    open={this.props.editProfileDialogIsOpen}>
                    <DialogTitle
                        id="edit-profile"
                        onClose={this.props.toggleEditProfileDialog}>
                        Edit Profile
                    </DialogTitle>
                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <Avatar
                                    alt={`Avatar of user ${this.props.name}`}
                                    src={avatar || this.props.avatar}
                                />
                                <TextField
                                    value={avatar}
                                    error={errors.name && !name}
                                    onChange={this.handleAvatarChange}
                                    id="avatar_value"
                                    placeholder={this.props.avatar}
                                    margin="none"
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Name:
                                </Typography>
                                <TextField
                                    value={name}
                                    error={errors.name && !name}
                                    onChange={this.handleNameChange}
                                    id="name"
                                    placeholder={this.props.name}
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="name-error"
                                    className={classes.error}>
                                    {errors.name}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    e-mail:
                                </Typography>
                                <TextField
                                    value={email}
                                    error={errors.name && !email}
                                    onChange={this.handleEmailChange}
                                    id="email"
                                    placeholder={this.props.email}
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="email-error"
                                    className={classes.error}>
                                    {errors.email}
                                </FormHelperText>
                            </FormControl>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={saveIsDisabled}
                                color="primary">
                                Save
                            </Button>
                            <Button
                                type="button"
                                onClick={this.onCancel}
                                variant="contained"
                                size="small"
                                disabled={false}
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

export default withStyles(styles)(EditProfileDialog);
