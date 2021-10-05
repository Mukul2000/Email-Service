import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getAuthHeader } from '../utils/authutils';

function DropDown(props) {
    const [templates, setTemplates] = useState([]);
    const [display, setDisplay] = useState("None");

    useEffect(() => {
        axios.get('http://localhost:8000/api/user_templates', {
            headers: getAuthHeader()
        }).
            then(response => {
                setTemplates(response.data.templates);
                console.log(templates);
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                {display}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    props.setBody("");
                    props.setSubject("");
                    setDisplay("None")
                }}> None </Dropdown.Item>
                {templates.map(item => <Dropdown.Item key={item._id} onClick={() => {
                    props.setSubject(item.email.subject);
                    props.setBody(item.email.body);
                    setDisplay(item.name);
                }}> {item.name} </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDown;