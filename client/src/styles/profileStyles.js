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
        // marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
        minHeight: "50vh",
        border: "2px solid red",
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
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)"
    },
    cardTitle: {
        fontWeight: "600"
    },
    list: {
        height: "200px",
        overflow: "scroll"
    },
    slider: {
        position: "relative",
        flexWrap: "initial",
        overflowX: "hidden",
        "& > .MuiGrid-item": {
            transition: "transform 0.5s",
            flexShrink: 0
        }
    },
    sliderControls: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)"
    }
});
