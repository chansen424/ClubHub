import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import userContext from '../context/userContext';

export default function CreatePosting() {
  // name, id, question, deadline, description

  const { user } = useContext(userContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    const body = { orgId: user.org.id, ...data };
    fetch(`http://localhost:5000/api/orgs/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(data => console.log(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ margin: 'auto', width: 'max-content', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontWeight: 700 }} htmlFor="postingName">Posting Name</label>
          <input name="postingName" ref={register({ required: true })} />
          {errors.postingName && <span>This field is required</span>}
        </div>

        <div>
          <label style={{ fontWeight: 700 }} htmlFor="deadline">Deadline</label>
          <input name="deadline" ref={register({ required: true })} />
          {errors.deadline && <span>This field is required</span>}
        </div>

        <div>
          <label style={{ fontWeight: 700 }} htmlFor="question">Question</label>
          <input name="question" ref={register({ required: true })} />
          {errors.question && <span>This field is required</span>}
        </div>

        <div>
          <label style={{ fontWeight: 700 }} htmlFor="description">Description</label>
          <textarea name="description" ref={register({ required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>

        <div style={{ alignSelf: 'center' }}>
          <input type="submit" value="Create Posting" />
        </div>
      </div>
    </form>
  )
}