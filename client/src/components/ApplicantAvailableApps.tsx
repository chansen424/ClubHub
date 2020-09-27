import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';

export default function ApplicantAvailableApps() {
  const [postings, setPostings] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orgs/all`, {
      headers: { 'Content-Type': 'postings/json' },
    })
      .then(res => res.json())
      .then(data => setPostings(data.postings))
  }, []);
  console.log(postings);
  return (
    <>
      <h2>Available Applications</h2>
      {
        postings.map((posting: any) => {
          return <a href = "#" style={{display: 'block'}} key={posting._id}>{posting.postingName}</a> 
        })
      }
    </>
  )
}