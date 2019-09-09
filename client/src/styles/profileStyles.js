// Profile page styling:

export const profileStyles = theme => ({
    root: {
        display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.gray,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6)
    },
    fixedHeightContainer: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        minHeight: "50vh",
        "& > .MuiGrid-item:first-child": {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    title: {
        marginRight: theme.spacing(1) / 2
    }
});
