import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';
import { useForm } from 'react-hook-form';

export default function ApplicantAvailableApps() {
  const [postings, setPostings] = useState([]);
  const { user } = useContext(userContext);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/api/orgs/all`, {
      headers: { 'Content-Type': 'postings/json' },
    })
      .then(res => res.json())
      .then(data => setPostings(data.postings))
  }, []);

  const onSubmit = (data: any) => {
    const body = { netId: user.appl.netId, ...data };
    fetch(`http://localhost:5000/api/applicants/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(data => console.log(data))
  };

  return (
    <>
      <h2>Available Applications</h2>
      {
        postings.map((posting: any) => {
          return (
            <div className = "postingForm">
              <h3 key={posting._id} style={{backgroundColor: '#bd7a3c', padding:'1%', fontSize:'125%'}}>{posting.postingName}</h3>
              <p key={posting._id} style={{display:'block', fontWeight:'bold'}}>{"Description: " + posting.description}</p>
              <p key={posting._id} style={{display:'block', fontWeight:'bold'}}>{"Deadline: "}<em>{posting.deadline}</em></p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input type="hidden" name="postingId" value={posting._id} />
                </div>
                <div>
                <label style={{ fontWeight: 700 }} key={posting._id} htmlFor="answer">{posting.question + " "}</label>
                <input type = "text" name="answer" ref={register({ required: true })} />
                    {errors.answer && <span>This field is required</span>}
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <input type="submit" value="Apply!" />
                </div>
              </form>
            </div>
          )
        })
      }
    </>
  )
}