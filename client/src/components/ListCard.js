import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
    },
    title: {
        fontWeight: "600"
    }
}));

function ListCard(props) {
    const classes = useStyles();
    const { _id, title, friends } = props.list;

    return (
        <Grid item key={_id} xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton aria-label="friend list settings">
                            <Icon>more_vert</Icon>
                        </IconButton>
                    }
                    className={classes.cardHeader}
                    title={
                        <Typography component="h3" className={classes.title}>
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
                    <List>
                        {friends.map(friend => (
                            <ListItem key={friend}>
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
