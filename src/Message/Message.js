import React from 'react';
import './Message.css'

const message = (props) => {
    let MessageStyle = "MessageContainer";
    let username = ''
    if (props.username !== 'Me') {
        MessageStyle= MessageStyle + ' MessageReceived';
        username = props.username
    } else {
        MessageStyle= MessageStyle + ' MessageSent';
    }
    return (
        <div className={MessageStyle}>
            <div className='MessageCard'>
                <p className="MessageInfo">{username}</p>
                <p>{props.messageText}</p>
                <p className="MessageInfo">{props.timestamp}</p>
            </div>
        </div>
    )
}

export default message