// Profile page styling:

export const profileStyles = theme => ({
    root: {
        display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    main: {
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
    cardContent: {
        paddingBottom: "0 !important"
    },
    pollCardHeader: {
        textAlign: "center"
    },
    boldTitle: {
        fontWeight: "600"
    },
    // cardActions: {
    //     justifyContent: "center"
    // },
    list: {
        height: "200px",
        overflow: "scroll"
    },
    pollTitle: {
        fontWeight: "600"
    },
    gridList: {
        width: "auto",
        height: 200
    },
    icon: {
        color: theme.palette.common.red,
        marginRight: "2px"
    },
    votes: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: theme.spacing(2)
    },
    votesContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingTop: 0,
        paddingBottom: theme.spacing(3)
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
