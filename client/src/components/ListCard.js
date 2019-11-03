import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import renderAvatar from "../utils/renderAvatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditFriendList from "../components/EditFriendList";
import DeleteFriendList from "../components/DeleteFriendList";

const useStyles = makeStyles(profileStyles);

function ListCard(props) {
    const classes = useStyles();
    const { _id, title, friends } = props.list;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = React.useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = React.useState(false);

    const openMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const openEditDialog = () => {
        closeMenu();
        setEditDialogIsOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogIsOpen(false);
    };

    const openDeleteDialog = () => {
        closeMenu();
        setDeleteDialogIsOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogIsOpen(false);
    };

    return (
        <Grid
            item
            key={_id}
            xs={12}
            md={6}
            lg={4}
            style={{ transform: `translateX(-${props.moveListBy}%)` }}>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <>
                            <IconButton
                                onClick={openMenu}
                                aria-label="friend list settings"
                                aria-controls="friend-list-menu"
                                aria-haspopup="true">
                                <Icon>more_vert</Icon>
                            </IconButton>
                            <Menu
                                id="friend-list-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={closeMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}>
                                <MenuItem key={1} onClick={openEditDialog}>
                                    Edit list
                                </MenuItem>
                                <MenuItem key={2} onClick={openDeleteDialog}>
                                    Remove list
                                </MenuItem>
                            </Menu>
                        </>
                    }
                    className={classes.cardHeader}
                    title={
                        <Typography
                            component="h3"
                            className={classes.boldTitle}>
                            {title}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2">
                            {friends.length +
                                (friends.length === 1 ? " friend" : " friends")}
                        </Typography>
                    }
                />
                <Divider />
                <CardContent>
                    <List className={classes.list}>
                        {friends.map(friend => (
                            <ListItem key={friend._id}>
                                <ListItemAvatar>
                                    {renderAvatar(friend, classes)}
                                </ListItemAvatar>
                                <ListItemText primary={friend.name} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

            <EditFriendList
                dialogIsOpen={editDialogIsOpen}
                closeDialog={closeEditDialog}
                title={title}
                friends={friends}
                listId={_id}
                user={props.user}
                updateFriendListInState={props.updateFriendListInState}
                toggleSnackbar={props.toggleSnackbar}
                snackbarIsOpen={props.snackbarIsOpen}
            />

            <DeleteFriendList
                dialogIsOpen={deleteDialogIsOpen}
                closeDialog={closeDeleteDialog}
                listId={_id}
                user={props.user}
                deleteFriendListInState={props.deleteFriendListInState}
                toggleSnackbar={props.toggleSnackbar}
                snackbarIsOpen={props.snackbarIsOpen}
            />
        </Grid>
    );
}

export default ListCard;
