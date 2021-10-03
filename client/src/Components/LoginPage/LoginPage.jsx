import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import './LoginPage.css';

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const history = useHistory();

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            history.push('/dashboard');
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    async function onSubmit() {
        if (!validateEmail(email)) {
            setWarning("e-mail is invalid");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email: email, password: password });
            console.log(response.data.user.token);
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        catch (e) {
            console.log(e);
            setWarning("Invalid email or password");
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='details-box'>
                Login to proceed
                <div className='input-field'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <div className='input-field'>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </div>
                <div className='warning'>
                    {warning}
                </div>
                <Button onClick={onSubmit}> Login </Button>
            </div>
        </div>
    );
}

export default LoginPage;
