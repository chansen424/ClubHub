import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';

export default function OrgPostings() {
  const [postings, setPostings] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orgs/${user.org.id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setPostings(data.postings))
  }, []);

  return (
    <>
      <h2>Org Postings</h2>
      {
        postings.map((posting: any) => {
          console.log(posting)
          return <p key={posting._id}>{posting.question}</p>
        })
      }
    </>
  )
}