import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NavigationBar from '../NavigationBar/NavigationBar'
import DropDown from '../Dropdown/Dropdown'
import './SendEmail.css';

function SendEmail(props) {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");



    return (
        <div>
            <NavigationBar />
            <br />
            <div className="container">
                <h1 className="text-center">Send Email</h1>
                <br />
                <p> Choose a template </p>
                <DropDown 
                    setSubject={setSubject}
                    setBody={setBody}
                />
                <br/>
                <br/>
                <div id='input-area'>
                    <h3>Subject</h3>
                    <input
                        type='text'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <br />
                    <br />

                    <h3>Body</h3>
                    <textarea
                        type='text'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <br />
                </div>
                <br />
                <br />
                <Button> Send email </Button>
                <br />
                <p> Note : Sends to all verified subscribers</p>
            </div>
        </div>
    );
}

export default SendEmail;