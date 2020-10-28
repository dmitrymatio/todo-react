import React, { useEffect, useState } from "react";

function RandUserApi(props) {
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const res = await fetch('https://api.randomuser.me/');
        const data = await res.json();
        setUser(data.results[0]);
    }, []);

    return (
        //fragment short syntax
        <>
            {
                //will only render this h1 when we have a user
                user && <h1>{user.name.title}. {user.name.first} {user.name.last}</h1>
            }
        </>
    );
}

export default RandUserApi;