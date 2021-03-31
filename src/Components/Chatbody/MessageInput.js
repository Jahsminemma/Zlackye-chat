import React from 'react'
import Textarea from 'react-textarea-autosize'
import SendIcon from '@material-ui/icons/Send';
import './MessageInput.css'

const MessageInput = ({ sendMessage, setInputValue, inputValue }) => {
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    return (
        <div className="message_input">
            <form >
                <Textarea
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type a message..."
                    maxRows={4} />
                <button onClick={sendMessage} type="submit">
                    <SendIcon />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
