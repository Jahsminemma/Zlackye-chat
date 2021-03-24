import React, {useState,useEffect, useRef} from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import{ Avatar} from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import db from "../../firebase"
import Message from './Message'
import MessageInput from "./MessageInput";
import avatar from '../../assets/images/avatar.png'
import { useStateValue } from "../../StateProvider";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'


const Chat = () => {

    const { roomId } = useParams()
    const [roomInfos, setRoomInfos] = useState([])
    const [channelMessages, setChannelMessages] = useState([])
    const [{user}, dispatch] = useStateValue()
    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({behaviour : "smooth"})
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

     useEffect(() => {
         scrollToBottom()
    }, [channelMessages])
    
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__details">
                    <Link to="/" className="chat__backBtn">
                        <ArrowBackIosIcon/>   
                    </Link>
                <div className="channel__avatar">
                        <Avatar src ={avatar}/>
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
                { channelMessages.map(channelMessage => {
                   
                    const { user, message, userImage, timeStamp } = channelMessage;
                    return (
                         <Message 
                            user={user} userImage={userImage} message={message} timeStamp={ timeStamp}/>
                    )
               })}
            </div>
            <div style={{height:"80px"}}
                ref={scrollToView }>
            </div>
             <div className="message__input">
                < MessageInput/>
                </div>
        </div>
    )
}

export default Chat
