import React, {useState} from 'react'
import Textarea from 'react-textarea-autosize'
import SendIcon from '@material-ui/icons/Send';
import './MessageInput.css'
import db from '../../firebase';
import firebase  from 'firebase'
import { useStateValue } from "../../StateProvider";
import {useParams} from "react-router-dom"
const MessageInput = () => {

    const { roomId }=  useParams()
     const [inputValue, setInputValue] = useState("")
    const [{user}, dispatch] = useStateValue()
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const sendMessage = (e) => {
        e.preventDefault()
        e.target.value = ""
        if (roomId) {
            db.collection('rooms').doc(roomId).collection("messages").add({
                message: inputValue,
                user: user.displayName,
                userImage: user.photoURL,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            document.body.scrollHeight(`${40}px`)
            setInputValue("")
        }
    }
    return (
        <div className="message_input">
             <form action="">
                <Textarea
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type a message"
                    maxRows={4} />
                <button onClick={sendMessage} type="submit">
                    <SendIcon />
                </button>
                </form>
        </div>
    )
}

export default MessageInput