import React from "react";
import AddFriendsList from "../components/AddFriendList";


function Profile(props) {
    const { name, id } = props.user;

    return (
        <div>
            <h1>This is a temp profile page for testing routes</h1>
            <h2>You can replace this code</h2>
            <p>User name is {name} </p>
            <p>User id is {id} </p>

            <h2>Testing add new friend list feature:</h2>
            <AddFriendsList userId={id} />
        </div>
    );
}

export default Profile;
