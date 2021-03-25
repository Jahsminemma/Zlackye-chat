import React, {useState,useEffect, useRef} from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import db from "../../firebase"
import MessageInput from "./MessageInput";
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'



const Chat = () => {

    const { roomId } = useParams()
    const [roomInfos, setRoomInfos] = useState([])
    const [channelMessages, setChannelMessages] = useState([])

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
            <ChatHeader roomInfos={roomInfos} messages={ channelMessages}/>
            <ChatMessage Messages={ channelMessages}/>
             <div className="message__input">
                < MessageInput/>
                </div>
        </div>
    )
}

export default Chat
