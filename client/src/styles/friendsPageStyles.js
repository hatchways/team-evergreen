export const friendsPageStyles = theme => ({
    tabsContainer: {
        flexDirection: "column"
    },
    friendsContainer: {
        "& > .MuiGrid-item:first-child": {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    }
});
