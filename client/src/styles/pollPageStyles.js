// Poll page styling:

export const pollPageStyles = theme => ({
    listItem: {
        paddingTop: "10px",
        paddingBottom: "10px",
        "&:first-child": {
            paddingTop: "inherit"
        }
    },
    listItemText: {
        fontWeight: "600"
    },
    thumbnail: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "60px",
        height: "60px",
        border: "1px solid gray",
        backgroundColor: ""
    }
});
