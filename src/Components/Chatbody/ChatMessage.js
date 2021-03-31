import React, {useRef, useEffect} from 'react'
import Message from './Message'
import { useStateValue } from "../../StateProvider";


const ChatMessage = ({ Messages}) => {
    const [state, dispatch] = useStateValue()

    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({behaviour : "smooth"})
    }
         useEffect(() => {
         scrollToBottom()
    }, [Messages])
    return (
        <div style={{marginTop:"70px"}} className="chatMessage">
             <div className="chat__message">
                { Messages.map(userMessage => {
                   
                    const { user, message, userImage, timeStamp, uid } = userMessage;
                    if (state.auth.user.uid !== uid) {
                        return (
                        
                            <Message key = {timeStamp}
                                user={user} uid={uid} userImage={userImage} message={message} right={"70px"} timeStamp={timeStamp} />
                        )
                    } else {
                        return (
                        
                            <Message key = {timeStamp}
                                user={user} uid={uid} userImage={userImage} message={message} color={" #49d5ff"} align = {"right"} left={"70px"} timeStamp={timeStamp} />
                        )
                    }
               })}
            </div>
            <div style={{height:"40px"}}
                ref={scrollToView }>
            </div>
        </div>
    )
}

export default ChatMessage
