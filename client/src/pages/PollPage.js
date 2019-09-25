import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import renderAvatar from "../utils/renderAvatar";
import { Link as RouterLink } from "react-router-dom";
import { profileStyles } from "../styles/profileStyles";
import { pollPageStyles } from "../styles/pollPageStyles";
import { withStyles } from "@material-ui/core/styles";

import AddPollDialog from "../components/AddPollDialog";
import UserPanel from "../components/UserPanel";
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
import IconButton from "@material-ui/core/IconButton";

class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            results: []
        };
    }

    componentDidMount() {
        // TODO: show results array updaing in real time
        // get voting data on the poll from the database:
        const { _id } = this.props.location.state.poll;
        axios
            .get("/api/poll/results", {
                params: {
                    pollId: _id
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ results: response.data.results });
                }
            })
            .catch(error => {
                console.log("Cannot get poll results: ", error);
            });
    }

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes, user, users } = this.props;
        const { poll, lists } = this.props.location.state;
        const { results, pollDialogIsOpen } = this.state;
        const votesCount = poll.votes[0] + poll.votes[1];

        return (
            <div className={classes.root}>
                <CssBaseline />
                <UserPanel
                    user={user}
                    users={users}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                />
                <AddPollDialog
                    userId={user._id}
                    lists={lists}
                    togglePollDialog={this.togglePollDialog}
                    pollDialogIsOpen={pollDialogIsOpen}
                    hideButton={true}
                    addNewPoll={this.props.addNewPoll}
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
                                                {votesCount || 0}{" "}
                                                {votesCount === 1
                                                    ? "answer"
                                                    : "answers"}
                                            </Typography>
                                        }
                                    />
                                    <CardContent
                                        className={classes.cardContent}>
                                        <GridList
                                            cellHeight={180}
                                            className={classes.gridList}>
                                            <GridListTile key={11}>
                                                <img
                                                    src={poll.options[0]}
                                                    alt="First option"
                                                />
                                            </GridListTile>
                                            <GridListTile key={22}>
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
                                            <IconButton
                                                disabled
                                                className={classes.icon}
                                                aria-label="Vote for first image"
                                                component="span">
                                                <Icon>favorite</Icon>
                                            </IconButton>
                                            <Typography variant="body1">
                                                {poll.votes[0] || 0}
                                            </Typography>
                                        </div>
                                        <div className={classes.votes}>
                                            <IconButton
                                                disabled
                                                className={classes.icon}
                                                aria-label="Vote for second image"
                                                component="span">
                                                <Icon>favorite</Icon>
                                            </IconButton>
                                            <Typography variant="body1">
                                                {poll.votes[1] || 0}
                                            </Typography>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Divider
                                    style={{
                                        display: results.length
                                            ? "block"
                                            : "none"
                                    }}
                                />
                                <List>
                                    {results &&
                                        results.map(voter => {
                                            return (
                                                <>
                                                    <ListItem
                                                        key={voter.userId}
                                                        className={
                                                            classes.boldTitle
                                                        }>
                                                        <ListItemAvatar>
                                                            {renderAvatar(
                                                                voter,
                                                                classes
                                                            )}
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                <Typography
                                                                    className={
                                                                        classes.listItemText
                                                                    }
                                                                    variant="subtitle1">
                                                                    {voter.name}{" "}
                                                                    voted
                                                                </Typography>
                                                            }
                                                            secondary={
                                                                <Moment fromNow>
                                                                    {
                                                                        voter.updatedAt
                                                                    }
                                                                </Moment>
                                                            }
                                                        />

                                                        <ListItemSecondaryAction>
                                                            <Box
                                                                style={{
                                                                    backgroundImage: `url(
                                                                ${
                                                                    voter.option ===
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
