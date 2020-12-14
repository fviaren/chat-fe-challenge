import React from 'react';
import './Message.css'

const message = (props) => {
    return (
        <div className="Message">
            <p className="MessageInfo">{props.username}</p>
            <p>{props.messageText}</p>
            <p className="MessageInfo">{props.timestamp}</p>
        </div>
    )
}

export default message