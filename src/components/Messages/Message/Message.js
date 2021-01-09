import React from 'react';
import classes from './Message.module.css';
import ClassNames from 'classnames';

const message = (props) => {
    
    let username = props.username || '';
    
    return (
        <div className={ClassNames({
            [classes.MessageContainer]: true,
            [classes.MessageReceived]: props.username !== 'Me',
            [classes.MessageSent]: props.username === 'Me'
        })}>
            <div className={classes.MessageCard}>
                <p className={classes.MessageInfo}>{username}</p>
                <p>{props.messageText}</p>
                <p className={classes.MessageInfo}>{props.timestamp}</p>
            </div>
        </div>
    )
}

export default message