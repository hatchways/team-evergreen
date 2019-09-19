export const friendsPageStyles = theme => ({
    tabsContainer: {
        flexDirection: "column"
    },
    friendsContainer: {
        "& > .MuiGrid-item:first-child": {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    },
    friendsTitle: {
        marginRight: 0
    },
    userList: {
        maxHeight: "150vh",
        overflow: "scroll"
    },
    listItem: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    tabs: {
        width: "100%",
        "& .Mui-selected": {
            fontWeight: "600 !important"
        }
    },
    disabled: {
        opacity: "0.4"
    },
    button: {
        "&.MuiButton-text": {
            textTransform: "initial"
        }
    }
});
