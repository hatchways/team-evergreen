import React, { Component } from "react";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/button";
import Icon from "@material-ui/core/icon";
import IconButton from "@material-ui/core/iconbutton";
import Dialog from "@material-ui/core/dialog";
import DialogContent from "@material-ui/core/dialogcontent";
import DialogActions from "@material-ui/core/dialogactions";
import FormControl from "@material-ui/core/formcontrol";
import FormHelperText from "@material-ui/core/formhelpertext";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/textfield";
import Typography from "@material-ui/core/typography";
import axios from "axios";

// App components

// Utility Modules

// Constants
const TARGET_AVATAR = "avatar_image";

// Component Styles
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
    },
    bigAvatar: {
        display: "inline-flex",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100px",
        height: "100px",
        marginBottom: theme.spacing(2),
        textTransform: "uppercase",
        fontSize: "60px"
    },
    bigInput: {
        display: "inline",
        opacity: "0",
        position: "absolute",
        zIndex: 10,
        left: "148px",
        borderRadius: "100px",
        width: "100px",
        height: "100px",
        cursor: "pointer"
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

// Component definition
class EditProfileDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            avatar: this.props.avatar,
            email: this.props.email,
            newFile: "",
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

    disableSaveButton = () => {
        this.setState({ saveIsDisabled: true });
    };

    enableSaveButton = () => {
        this.setState({ saveIsDisabled: false });
    };

    handleAvatarChange = e => {
        if (e.target.files.length === 1) {
            window.URL = window.URL || window.webkitURL;
            this.setState({
                avatar: window.URL.createObjectURL(e.target.files[0]),
                newFile: e.target.files[0]
            });
            this.enableSaveButton();
        }
    };

    handleEmailChange = e => {
        if (e.target.value !== this.props.email) {
            this.setState({ email: e.target.value });
            this.setState({ saveIsDisabled: false });
        }
    };

    handleNameChange = e => {
        if (e.target.value !== this.props.name) {
            this.setState({ name: e.target.value });
            this.setState({ saveIsDisabled: false });
        }
    };

    onCancel = () => {
        // Added middle step in the event we need to add some closing routines
        this.closeDialog();
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, email, avatar, newFile } = this.state;

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
            // load new data and send it to upload api:
            let formData = new FormData();
            formData.append("userId", this.props.userId);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("avatar", avatar);
            formData.append("target", TARGET_AVATAR);
            formData.append("newFile", newFile, newFile.name);

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

                    // replace current avatar and close dialog:
                    this.props.updateAvatar(response.data.data);
                    this.closeDialog();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    revokeUrl = e => {
        // need to revoke url assigned to image to prevent memory leaks
        window.URL.revokeObjectURL(e.target.src);
    };

    render() {
        const { classes } = this.props;
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
                                {avatar ? (
                                    <Avatar
                                        className={classes.bigAvatar}
                                        alt={`Avatar of user ${this.props.name}`}
                                        src={avatar || this.props.avatar}
                                        onLoad={this.revokeUrl}
                                    />
                                ) : (
                                    <Avatar
                                        className={classes.bigAvatar}
                                        alt={`Avatar of user ${name}`}>
                                        {name[0]}
                                    </Avatar>
                                )}
                                <input
                                    type="file"
                                    id="avatar_file"
                                    accept="image/*"
                                    className={classes.bigInput}
                                    onChange={this.handleAvatarChange}
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
                                color="secondary">
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
