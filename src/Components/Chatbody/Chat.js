import React, {useState,useEffect, useRef} from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import{ Avatar} from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import db from "../../firebase"
import Message from './Message'
import MessageInput from "./MessageInput";



const Chat = () => {

    const { roomId } = useParams()
    const [roomInfos, setRoomInfos] = useState([])
    const [channelMessages, setChannelMessages] = useState([])
    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({behaviour : "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
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
            <div className="chat__header">
                <div className="chat__details">
                <div className="channel__avatar">
                        <Avatar />
                 </div>
                    <div className="channel__info">
                        
                        <h3>#{ roomInfos?.name}</h3>
                    <p>{channelMessages?.length} messages</p>
                </div>
                </div>
                <div className="channel__icons">
                    <ExploreIcon />
                    <MoreVertIcon/>  
                </div>
            </div>
            <div className="chat__message">
                {channelMessages.map(channelMessage => {
                   
                    const { user, message, userImage, timeStamp } = channelMessage;
                    return (
                         <Message
                            user={user} userImage={userImage} message={message} timeStamp={ timeStamp}/>
                    )
               })}
            </div>
            <div style={{ float: "left", clear: "both" , height:"100px", backgroundColor:"black"}}
                ref={scrollToView }>
            </div>
             <div className="message__input">
                < MessageInput ref={ scrollToView}/>
                </div>
        </div>
    )
}

export default Chat
