import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { friendListStyles } from "../styles/friendListStyles";
import { AdornedButton } from "./AdornedButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogTitle } from "./DialogTitle";
import { deleteFriendList } from "../utils/updateFriendList";

class DeleteFriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    closeDialog = () => {
        this.clearDialogData();
        this.props.closeDialog();
    };

    clearDialogData = () => {
        this.setState({
            loading: false
        });
    };

    onSubmit = e => {
        this.setState({ loading: true }, () => {
            const { listId, userId } = this.props;

            const dataToSend = { listId, userId };

            deleteFriendList(dataToSend, () => {
                // use redux action to delete list in global state:
                setTimeout(() => {
                    this.closeDialog();
                    this.props.deleteFriendListInState(listId);
                    this.props.toggleSnackbar({
                        action: "open",
                        message: "Your list was successfully deleted!"
                    });
                }, 800);
            });
        });
    };

    onCancel = () => {
        this.closeDialog();
    };

    render() {
        const { classes, dialogIsOpen, title } = this.props;
        const { loading } = this.state;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.closeDialog}
                    aria-labelledby="delete-friend-list"
                    open={dialogIsOpen}>
                    <DialogTitle
                        id="delete-friend-list"
                        onClose={this.closeDialog}>
                        Your friend list {title} will be deleted
                    </DialogTitle>
                    <DialogActions className={classes.action}>
                        <AdornedButton
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            onClick={this.onSubmit}
                            variant="contained"
                            size="small"
                            color="secondary">
                            Submit
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
                </Dialog>
            </div>
        );
    }
}

export default withStyles(friendListStyles)(DeleteFriendsList);
