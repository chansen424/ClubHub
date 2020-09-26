import React, { useContext } from 'react';
import ApplicantAvailableApps from '../components/ApplicantAvailableApps';
import ApplicantCompletedApps from '../components/ApplicantCompletedApps';
import CreatePosting from '../components/CreatePosting';
import OrgPostings from '../components/OrgPostings';
import userContext from '../context/userContext';

export default function Home() {
    const { user: { userType } } = useContext(userContext);

    return (
        <>
            <h1>ClubHub</h1>
            <p>You are logged in as a {userType}</p>
            {
                userType === "orgs" && <>
                    <CreatePosting />
                    <OrgPostings />
                </>
            }
            {
                userType === "applicants" && <>
                    <ApplicantCompletedApps />
                </>
            }
        </>
    )
}