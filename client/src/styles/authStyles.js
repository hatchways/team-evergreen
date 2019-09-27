import hero from "../images/hero.png";

// Login and Signup styling:

export const authStyles = {
    heading: {
        marginBottom: "2.35em",
        fontWeight: "600"
    },
    container: {
        transform: "translate(-50%, -50%)",
        position: "absolute",
        left: "50%",
        top: "50%"
    },
    item: {
        minHeight: "100vh",
        position: "relative"
    },
    hero: {
        backgroundColor: "#DDE0E5",
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat"
    },
    link: {
        paddingBottom: "2.35em !important",
        paddingTop: "0 !important"
    },
    agreement: {
        paddingTop: "0 !important"
    },
    uppercase: {
        textTransform: "uppercase"
    },
    btn: {
        marginTop: "8px",
        "&:nth-child(3)": {
            marginLeft: "15px"
        }
    }
};
