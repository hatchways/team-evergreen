import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function renderAvatar(user, classes) {
    if (user.avatar) {
        return <Avatar alt={`Avatar of user ${user.name}`} src={user.avatar} />;
    } else {
        return <Avatar className={classes.avatarLetter}>{user.name[0]}</Avatar>;
    }
}
