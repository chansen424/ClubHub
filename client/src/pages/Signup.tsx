import React, { useState } from 'react';
import ApplicantSignup from '../components/ApplicantSignup';
import OrgSignup from '../components/OrgSignUp';

export default function Signup() {
    const [userType, setUserType] = useState("orgs");
    return (
    <>
        <h1>Signup</h1>
        <label htmlFor="userType">Signup as:</label>
        <select name="userType" onChange={e => setUserType(e.target.value)}>
            <option value="orgs">Organization</option>
            <option value="applicants">Applicant</option>
        </select>
        {userType === "orgs" && <OrgSignup />}
        {userType === "applicants" && <ApplicantSignup />}
    </>
    )
}
