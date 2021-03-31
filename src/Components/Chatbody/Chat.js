import React, {useState,useEffect} from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import db from "../../firebase"
import MessageInput from "./MessageInput";
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import avatar from '../../assets/images/avatar.png'
import firebase  from 'firebase'
import { useStateValue } from "../../StateProvider";



const Chat = () => {

    const { roomId } = useParams()
    const [roomInfos, setRoomInfos] = useState([])
    const [channelMessages, setChannelMessages] = useState([])

    const [inputValue, setInputValue] = useState("")
    const [state] = useStateValue()
    const sendMessage = (e) => {
        e.preventDefault()
        e.target.value = ""
        if (roomId && inputValue) {
            db.collection('rooms').doc(roomId).collection("messages").add({
                message: inputValue,
                user: state.auth.user.displayName,
                userImage: state.auth.user.photoURL,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid:state.auth.user.uid
            })
            setInputValue("")
        }
    }

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomInfos(snapshot.data())
            })
            
            db.collection('rooms').doc(roomId).collection("messages")
                .orderBy("timeStamp").onSnapshot(snapshot => {
                setChannelMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    
    return (
        <div className="chat">
            <ChatHeader roomInfos={roomInfos} value={`${channelMessages?.length} messages`} image={ avatar }/>
            <ChatMessage hash ={"#"} Messages={ channelMessages}/>
             <div className="message__input">
                < MessageInput sendMessage={sendMessage}  setInputValue={setInputValue} inputValue={inputValue} />
                </div>
        </div>
    )
}

export default Chat
