import React, { useContext } from 'react';
import CreatePosting from '../components/CreatePosting';
import userContext from '../context/userContext';

export default function Home() {
    const { user: { userType } } = useContext(userContext);

    return (
        <>
            <h1>ClubHub</h1>
            <p>You are logged in as a {userType}</p>
            {
                userType === "orgs" && <CreatePosting />
            }
        </>
    )
}