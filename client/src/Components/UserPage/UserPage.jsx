import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import './UserPage.css';

const UserPage = (props) => {
    const [email, setEmail] = useState("");
    const [warning, setWarning] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [OTP, setOTP] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const {company_id} = useParams();


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function onSubmit(e) {
        const email_okay = validateEmail(email);
        const name_okay = name.length > 2;
        if(!email_okay && !name_okay) setWarning("Details are incorrect");
        else if (!email_okay) setWarning("Please enter a valid email address")
        else if(!name_okay) setWarning("Please enter a name");
        else {
            // send to server, show OTP box
            setWarning("");
            try {
                const response = await axios.get('http://localhost:8000/api/signup', { params: { email: email, name: name, user_id: company_id } });
                console.log(response);
                if (response.status === 200) {
                    // proceed to verify user 
                    setMessage(response.data.message);
                    setShowOTP(true);
                }
            }
            catch (e) {
                console.log(e);
                setWarning(e.error);
            }
        }
    }

    async function verifyOTP() {
        try {
            const response = await axios.post('http://localhost:8000/api/signup', { email: email, user_id: company_id, otp: OTP });
            console.log(response.data);
            setMessage(response.data.message)
            setDone(true);
        }
        catch (e) {
            console.log(e.error);
            setWarning("Something went wrong");
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='details-box'>
                Subscribe to our feature updates!
                {done && {message}}
                {!showOTP && !done && <div id='input-field'>
                    <div>
                        <input
                            type="text"
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div id='name-field'>
                        <input type="text" value={name} placeholder='Your name' onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>}
                {showOTP && !done && <div id='input-field'><input placeholder='Enter OTP' type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} /></div>}
                {showOTP && !done && <Button onClick={verifyOTP}>Verify</Button>}
                <div id='warning'>
                    {warning}
                </div>
                {message}
                {!showOTP && <Button onClick={onSubmit}>Submit!</Button>}
            </div>
        </div>
    );
}

export default UserPage;
