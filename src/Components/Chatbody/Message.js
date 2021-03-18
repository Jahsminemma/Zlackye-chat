import React from 'react'
import './Message.css'
const Message = ({message, user, userImage, timeStamp}) => {
    return (
        <div className="message">
            <div className="message__content">
                <img src={userImage} alt={user} />
                <div className="message__item">
                    <h4>{user} { new Date(timeStamp?.toDate()).toLocaleTimeString()}</h4>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
