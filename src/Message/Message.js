import React, { useState } from 'react';
import './Message.css'

const message = (props) => {
    let MessageStyle = "Message";
    if (props.username) {
        MessageStyle= MessageStyle + ' MessageReceived'
    } else {
        MessageStyle= MessageStyle + ' MessageSent'
    }
    return (
        <div className={MessageStyle}>
            <p className="MessageInfo">{props.username}</p>
            <p>{props.messageText}</p>
            <p className="MessageInfo">{props.timestamp}</p>
        </div>
    )
}

export default message