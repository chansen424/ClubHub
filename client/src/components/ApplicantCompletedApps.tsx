import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';

export default function ApplicantCompletedApps() {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {

    fetch(`http://localhost:5000/api/applicants/${user.appl.netId}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setApplications(data.applications))
  }, []);

  return (
    <>
      <h2>Your Applications</h2>
      {
        applications.map((application: any) => {
          return <p key={application._netId}>{application.status}</p>
        })
      }
    </>
  )
}