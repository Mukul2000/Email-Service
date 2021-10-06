import React from 'react';

function EmailDetail(props) {
    console.log(props.location);
    return (
        <div className='container'>
            <h3> Subject </h3>
            {props.location.state.subject}
            <br/>
            <br/>
            <br/>
            <h3> Body </h3>
            {props.location.state.body}
            <br/>
            <br/>
        </div>
    );
}

export default EmailDetail;