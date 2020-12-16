import React from 'react';
import './InputMessage.css';

const inputMessage = (props) => {
    return (
        <div className="InputBlock">
            <input 
                className="MessageField" 
                type="text"
                placeholder="Message"
                onChange={props.change}
                value={props.value}
            />
            <button 
                className="SendButton" 
                onClick={props.send}  
                >Send</button>
        </div>
    )
}

export default inputMessage