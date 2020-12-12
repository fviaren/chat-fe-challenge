import React from 'react';

const inputMessage = (props) => {
    return (
        <div>
            <input type="text"/>
            <button onClick={props.send}>Send</button>
        </div>
    )
}

export default inputMessage