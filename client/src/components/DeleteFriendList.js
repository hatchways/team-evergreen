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
            const listId = this.props.listId;
            deleteFriendList(listId, () => {
                // use redux action to update list details in global state:
                this.props.deleteFriendListInState(listId);
            });

            setTimeout(() => {
                this.closeDialog();
                this.props.toggleSnackbar({
                    action: "open",
                    message: "Your list was successfully deleted!"
                });
            }, 500);
        });
    };

    onCancel = () => {
        this.closeDialog();
    };

    render() {
        const { classes, dialogIsOpen } = this.props;
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
                        This friend list will be removed
                    </DialogTitle>

                    <DialogActions className={classes.action}>
                        <AdornedButton
                            loading={loading}
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
