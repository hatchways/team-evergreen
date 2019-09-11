import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Divider,
    IconButton,
    Grid,
    Icon
} from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

function ListCard(props) {
    const classes = useStyles();
    const { _id, title, friends } = props.list;

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
                        <IconButton aria-label="friend list settings">
                            <Icon>more_vert</Icon>
                        </IconButton>
                    }
                    className={classes.cardHeader}
                    title={
                        <Typography
                            component="h3"
                            className={classes.listTitle}>
                            {title}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2">
                            {friends.length + " friends"}
                        </Typography>
                    }
                />
                <Divider />
                <CardContent>
                    <List className={classes.list}>
                        {friends.map(friend => (
                            <ListItem key={friend._id}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={friend.avatar}
                                        alt={`Avatar of ${friend.name}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={friend.name} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ListCard;
