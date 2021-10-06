import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import NavigationBar from '../NavigationBar/NavigationBar'
import DropDown from '../Dropdown/Dropdown'
import './SendEmail.css';
import axios from 'axios';
import { getAuthHeader } from "../utils/authutils";

function SendEmail(props) {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [is_scheduled, setScheduled] = useState(false);
    const [recurrence, setRecurrence] = useState('Daily');
    const [message, setMessage] = useState("");
    const recur_states = ['Daily', 'Weekly', 'Monthly'];


    function onSend() {
        axios.post('http://localhost:8000/api/send_email', {subject, body, is_scheduled, recurrence}, {
            headers: getAuthHeader()
        })
        .then((res) => {
            console.log(res.data.message);
            setMessage(res.data.message);
        })
        .catch(e => {
            console.log(e);
            setMessage(e.error);
        });
    }



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
                <br />
                <br />
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
                Scheduled?
                <input
                    type='checkbox'
                    value={is_scheduled}
                    onClick={() => setScheduled(prev => !prev)}
                />
                {is_scheduled &&
                    <Dropdown>
                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                            {recurrence}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {recur_states.map((item, ind) => {
                                return <Dropdown.Item onClick={() => setRecurrence(item)}> {item} </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                }
                <br />
                <br />
                <Button onClick={onSend}> Send email </Button>
                <br />
                <p> Note : Sends to all verified subscribers</p>

                {message}
            </div>
        </div>
    );
}

export default SendEmail;