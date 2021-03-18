import React, {useState,useEffect} from 'react'
import "./Chat.css"
import { useParams } from "react-router-dom"
import{ Avatar, TextareaAutosize } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import db from "../../firebase"
import Message from './Message'
import SendIcon from '@material-ui/icons/Send';
import Textarea from 'react-textarea-autosize'

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
             <div className="message__input">
                        <form action="">
                    <Textarea  placeholder= "Type a message" maxRows={5} />
                            <button type="submit"><SendIcon/> </button>
                    </form>
                </div>
        </div>
    )
}

export default Chat
