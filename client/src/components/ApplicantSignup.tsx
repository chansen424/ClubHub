import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import userContext from '../context/userContext';

type RequiredApplicantInfo = {
    name: string,
    netId: string,
    password: string
}

export default function ApplicantSignup() {
    const history = useHistory();
    const {setUser} = useContext(userContext);
    const { register, handleSubmit, errors } = useForm<RequiredApplicantInfo>();

    const onSubmit = (data: RequiredApplicantInfo) => {
        fetch(`http://localhost:5000/api/applicants/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async res => ({status: res.status, data: await res.json()}))
        .then(({status, data}) => {
            if (status === 200) {
                setUser({
                    userType: "applicants",
                    ...data
                });
                history.push('/home');
            } else {
                console.error('Something went wrong');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin: 'auto', width: 'max-content', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <div>
                    <label style={{fontWeight: 700}} htmlFor="name">Name</label>
                    <input name="name" ref={register({ required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>

                <div>
                    <label style={{fontWeight: 700}} htmlFor="netId">NetID</label>
                    <input name="netId" ref={register({ required: true })} />
                    {errors.netId && <span>This field is required</span>}
                </div>

                <div>
                    <label style={{fontWeight: 700}} htmlFor="password">Password</label>
                    <input name="password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>

                <div style={{alignSelf: 'center'}}>
                    <input type="submit" value="Sign Up" />
                </div>
            </div>
        </form>
    )
}