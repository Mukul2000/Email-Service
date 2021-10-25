import React from 'react';
import './EmailDetail.css';

function EmailDetail(props) {
    console.log(props.location);
    return (
        <div className='container'>
            <br/>
            <h3> Subject </h3>
            <div className = 'subject'>
            {props.location.state.subject}
            </div>
            <br />
            <br />
            <br />
            <h3> Body </h3>
            <div className = 'body'>
            {props.location.state.body}
            </div>
            <br />
            <br />
        </div>
    );
}

export default EmailDetail;