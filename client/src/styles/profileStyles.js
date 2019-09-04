// Profile page styling:

export const profileStyles = theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: '0 15px 0 25px',
        ...theme.mixins.toolbar
    },
    subtitle: {
        fontWeight: "600"
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: '240px',
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    }
});
