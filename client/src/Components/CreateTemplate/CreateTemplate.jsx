import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NavigationBar from '../NavigationBar/NavigationBar'
import { getAuthHeader } from "../utils/authutils";

function CreateTemplate(props) {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("");

    function onSubmit() {
        axios.post('http://localhost:8000/api/user_templates', {
            name: name,
            subject: subject,
            body: body
        }, {
            headers: getAuthHeader()
        }).then((res) => {
            console.log(res.data.message)
            setStatus("Template saved successfully");
        }).catch(e => {
            console.log(e)
            setStatus("There was a problem saving your template");
          });
    }

    return (
        <div>
            <NavigationBar />
            <br />
            <div className="container">
                <h1 className="text-center">Create a new template</h1>
                <br />
                <br />
                <div id='input-area'>
                    <h4> Set a name for this template </h4>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <br/>
                    {status}
                    <br/>
                </div>
                <br />
                <br />
                <Button onClick={onSubmit}> Save </Button>
                <br />
            </div>
        </div>
    );
}

export default CreateTemplate;