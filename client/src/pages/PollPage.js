import React, { Component } from "react";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import {
    CssBaseline,
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    GridList,
    GridListTile,
    Icon,
    List,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItem,
    ListItemText,
    Box,
    Divider,
    Avatar
} from "@material-ui/core";

class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: true,
            pollDialogIsOpen: false,
            voted: [
                {
                    name: "Alison Brown",
                    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                    option: 1
                },
                {
                    name: "Caroline Chapman",
                    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                    option: 0
                },
                {
                    name: "Dorothy Ferguson",
                    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
                    option: 1
                },
                {
                    name: "Jack Murray",
                    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                    option: 1
                }
            ] // fake data for friends
        };
    }

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes } = this.props;
        const { user, users, poll } = this.props.location.state;
        const { drawerIsOpen, voted } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppNavbar
                    user={user}
                    open={drawerIsOpen}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                />
                <FriendsDrawer
                    users={users}
                    open={drawerIsOpen}
                    toggleDrawer={this.toggleDrawer}
                />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6} direction="column">
                            <Grid item xs={12} md={6}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        className={classes.pollCardHeader}
                                        title={
                                            <Typography
                                                component="h3"
                                                className={classes.pollTitle}>
                                                {poll.title}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography variant="body2">
                                                {
                                                    "14 answers" /*TODO - Add proper counts*/
                                                }
                                            </Typography>
                                        }
                                    />
                                    <CardContent>
                                        <GridList
                                            cellHeight={180}
                                            className={classes.gridList}>
                                            <GridListTile key={1}>
                                                <img
                                                    src={poll.options[0]}
                                                    alt="First option"
                                                />
                                            </GridListTile>
                                            <GridListTile key={2}>
                                                <img
                                                    src={poll.options[1]}
                                                    alt="Second option"
                                                />
                                            </GridListTile>
                                        </GridList>

                                        <div className={classes.votesContainer}>
                                            <div className={classes.votes}>
                                                <Icon className={classes.icon}>
                                                    favorite
                                                </Icon>
                                                {12 /*TODO fix the votes*/}
                                            </div>
                                            <div className={classes.votes}>
                                                <Icon className={classes.icon}>
                                                    favorite
                                                </Icon>
                                                {2 /*TODO fox the votes*/}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Divider />
                                <List>
                                    {voted.map(user => {
                                        return (
                                            <>
                                                <ListItem
                                                    key={user._id}
                                                    className={classes.item}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={`Avatar of ${user.name}`}
                                                            src={user.avatar}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${user.name} voted`}
                                                        secondary="24m ago"
                                                    />

                                                    <ListItemSecondaryAction>
                                                        <Box
                                                            style={{
                                                                backgroundImage: `url(
                                                                ${
                                                                    user.option ===
                                                                    0
                                                                        ? poll
                                                                              .options[0]
                                                                        : poll
                                                                              .options[1]
                                                                }
                                                            )`
                                                            }}
                                                            className={
                                                                classes.thumbnail
                                                            }></Box>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <Divider />
                                            </>
                                        );
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(PollPage);
