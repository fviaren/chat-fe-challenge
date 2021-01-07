import React from 'react';
import classes from './Message.module.css'

const message = (props) => {
    let MessageStyle = [classes.MessageContainer]
    let username = ''
    if (props.username !== 'Me') {
        MessageStyle.push(classes.MessageReceived);
        username = props.username
    } else {
        MessageStyle.push(classes.MessageSent);
    }
    return (
        <div className={MessageStyle.join(' ')}>
            <div className={classes.MessageCard}>
                <p className={classes.MessageInfo}>{username}</p>
                <p>{props.messageText}</p>
                <p className={classes.MessageInfo}>{props.timestamp}</p>
            </div>
        </div>
    )
}

export default message