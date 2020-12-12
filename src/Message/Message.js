import React from 'react';

const message = (props) => {
    return (
        <div>
            <p>{props.username}</p>
            <p>{props.messageText}</p>
            <p>{props.timestamp}</p>
        </div>
    )
}

export default message