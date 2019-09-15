import React, { Component } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { profileStyles } from "../styles/profileStyles";
import { pollPageStyles } from "../styles/pollPageStyles";
import { withStyles } from "@material-ui/core/styles";

import AddPollDialog from "../components/AddPollDialog";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: true,
            pollDialogIsOpen: false,
            voted: [
                {
                    userId: 1,
                    name: "Alison Brown",
                    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                    option: 1
                },
                {
                    userId: 2,
                    name: "Caroline Chapman",
                    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                    option: 0
                },
                {
                    userId: 3,
                    name: "Dorothy Ferguson",
                    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
                    option: 1
                },
                {
                    userId: 4,
                    name: "Jack Murray",
                    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                    option: 1
                }
            ] // fake data for friends
        };
    }

    componentDidMount() {
        // get voting data on the poll from the database:
        const { _id } = this.props.location.state.poll;

        axios.get("/api/poll/results").then(response => {
            if (response.data.status === 200) {
                this.setState({ voted: response.data });
            }
        });
    }

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes, user, users } = this.props;
        const { poll, lists } = this.props.location.state;
        const { drawerIsOpen, voted, pollDialogIsOpen } = this.state;
        console.log("props in Poll Page: ", this.props);
        const isFriendsPoll = user.polls.find(poll => (poll.userId = user._id));
        console.log("isFriendsPoll: ", isFriendsPoll);

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
                <AddPollDialog
                    userId={user._id}
                    lists={lists}
                    togglePollDialog={this.togglePollDialog}
                    pollDialogIsOpen={pollDialogIsOpen}
                    isPollPage={true}
                />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={5} direction="column">
                            <Grid item xs={12} md={6}>
                                <Button
                                    underline="none"
                                    component={RouterLink}
                                    to="/profile"
                                    className={classes.buttonLink}>
                                    <Icon>keyboard_arrow_left</Icon>Back
                                </Button>
                            </Grid>
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
                                    <CardContent
                                        className={classes.cardContent}>
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
                                    </CardContent>
                                    <CardActions
                                        className={classes.votesContainer}>
                                        <div className={classes.votes}>
                                            <Icon className={classes.icon}>
                                                favorite
                                            </Icon>
                                            {/* TODO: if votes == 0, icon is gray */}
                                            0
                                        </div>
                                        <div className={classes.votes}>
                                            <Icon className={classes.icon}>
                                                favorite
                                            </Icon>
                                            0
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Divider />
                                <List>
                                    {voted.map(user => {
                                        return (
                                            <>
                                                <ListItem
                                                    key={user.userId}
                                                    className={
                                                        classes.boldTitle
                                                    }>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={`Avatar of ${user.name}`}
                                                            src={user.avatar}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                className={
                                                                    classes.listItemText
                                                                }
                                                                variant="subtitle1">
                                                                {user.name}{" "}
                                                                voted
                                                            </Typography>
                                                        }
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

export default withStyles(theme => ({
    ...profileStyles(theme),
    ...pollPageStyles(theme)
}))(PollPage);
