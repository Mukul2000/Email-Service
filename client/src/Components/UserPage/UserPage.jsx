import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './UserPage.css';

const UserPage = (props) => {
    const [companyName, setCompanyName] = useState(props.location.pathname)
    const [email, setEmail] = useState("");
    const [warning, setWarning] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [OTP, setOTP] = useState("");

    useEffect(() => {
        const path = props.location.pathname;
        setCompanyName(path.substr(1,path.length));
    }, [])
 
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function onSubmit(e) {
        const isOkay = validateEmail(email);
        if(!isOkay) {
            setWarning("Please enter a valid email address")
        }
        else {
            // send to server, show OTP box
                try {
                const response = await axios.post("localhost:8000/signup", {email: email});
                setWarning(response.message); // OTP has been sent or something went wrong
                if(response.status === 200) {
                    // proceed to verify user 
                    setShowOTP(true);
                }
            }
            catch(e) {
                setWarning("Something went wrong");
            }
        }
    }           

    async function verifyOTP() {
        try {
            const response = await axios.post('localhost:8000/verify_user', {email: email, otp: OTP});
            if(response.status === 200) setWarning(response)
            else setWarning("Something went wrong");
        }
        catch(e) {
            setWarning("Something went wrong");
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='details-box'>
                Subscribe to our feature updates!
                {!showOTP && <div id='input-field'>
                    <input
                        type="text"
                        value = {email}
                        placeholder='Enter your email'
                        onChange = {(e) => setEmail(e.target.value)}                
                    />
                    <div id='warning'>
                        {warning}
                    </div>
                </div>}
                {showOTP && <div id='input-field'><input placeholder='Enter OTP' type="text" value={OTP} onChange={(e) => setOTP(e.target.value)}/></div>}
                {showOTP && <Button onClick = {verifyOTP}>Verify</Button>}
                {!showOTP && <Button onClick = {onSubmit}>Submit!</Button>}
            </div>
        </div>
    );
}

export default UserPage;
