import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { useHistory } from 'react-router-dom';
import userContext from '../context/userContext';

type Credentials = {
    name: string,
    password: string
}

export default function Login() {
    const history = useHistory();
    const {setUser} = useContext(userContext);
    const [userType, setUserType] = useState("orgs");

    const { register, handleSubmit, errors } = useForm<Credentials>();

    const onSubmit = (credentials: Credentials) => {
        const {name, password} = credentials;
        const properKey = userType === "orgs" ? "name" : "netId";
        const body = { [properKey]: name, password };

        fetch(`http://localhost:5000/api/${userType}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(async res => ({status: res.status, data: await res.json()}))
        .then(({status, data}) => {
            if (status === 200) {
                setUser({
                    userType,
                    ...data
                })
                history.push('/home');
            } else {
                console.error('Something went wrong');
            }
        });
    };

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin: 'auto', width: 'max-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <div>
                    <label style={{fontWeight: 700}} htmlFor="userType">Log In As:</label>

                    <select name="userType" onChange={e => setUserType(e.target.value)}>
                        <option value="orgs">Org</option>
                        <option value="applicants">Applicant</option>
                    </select>
                </div>

                <div>
                    <label style={{fontWeight: 700}} htmlFor="name">
                        {userType === "orgs" ? "Name" : "NetID"}
                    </label>
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
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </>
    );
}
