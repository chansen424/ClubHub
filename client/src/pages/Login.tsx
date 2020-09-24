import React from 'react';
import { useForm } from 'react-hook-form'; 
import { useHistory } from 'react-router-dom';

type OrgCredentials = {
    name: string,
    password: string
}

export default function Login() {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm<OrgCredentials>();

    const onSubmit = (credentials: OrgCredentials) => {
        fetch('http://localhost:5000/api/orgs/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(res => {
            if (res.status == 200) {
                history.push('/home')
            }
        })
    };

    return (
        <>
        <h1>ClubHub</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin: 'auto', width: 'max-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <div>
                    <label style={{fontWeight: 700}} htmlFor="user-type">Log In As:</label>

                    <label htmlFor="org">Org</label>
                    <input type="radio" id="org" name="user-type" value="org" ref={register} />
                    
                    <label htmlFor="applicant">Applicant</label>
                    <input type="radio" id="applicant" name="user-type" value="applicant" ref={register} />
                </div>

                <div>
                    <label style={{fontWeight: 700}} htmlFor="name">NetID</label>
                    <input name="name" ref={register({ required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>

                <div>
                    <label style={{fontWeight: 700}} htmlFor="password">Password</label>
                    <input name="password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>

                <div style={{alignSelf: 'center'}}>
                    <input type="submit" value="Login" />
                </div>
            </div>
          
        </form>
        </>
      );
}


{/* <div>
    <label style={{fontWeight: 700}} htmlFor="description">Description</label>
    <input name="description" ref={register({ required: true })} />
    {errors.description && <span>This field is required</span>}
</div> */}
