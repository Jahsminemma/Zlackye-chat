import React, {useRef, useEffect} from 'react'
import { useStateValue } from "../../StateProvider";
import "./Message.css"



const UserChatMessage = ({Messages}) => {
     const [state, dispatch] = useStateValue()
      
    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({behaviour : "smooth"})
    }
         useEffect(() => {
         scrollToBottom()
    }, [Messages])
    return (
        <div style={{marginTop:"100px", textAlign:"left"}} className="chatMessage">
             <div className="chat__message">
                { Messages.map(userMessage => {
                   
                    const { authUserId, userId, createdAt, message} = userMessage;
                    if (state.auth.user.uid == authUserId) {
                        return (
                            <div style={{ textAlign : "right", marginLeft:"70px" }} key= {createdAt} className="message">
                            <div style={{ backgroundColor:"#49d5ff"}} className="message__content">
                                <div className="message__item">
                                    <p>{message}</p>
                                     <small style={{fontSize:"10px", float:"right"}}>{ new Date(createdAt?.toDate()).toLocaleTimeString()}</small>
                                </div>
                            </div>
                        </div>
                        )
                    } else {
                        return (
                         <div style={{  marginRight:"70px" }} key= {createdAt} className="message">
                            <div className="message__content">
                                <div className="message__item">
                                    <p>{message}</p>
                                     <small style={{fontSize:"10px", float:"right"}}>{ new Date(createdAt?.toDate()).toLocaleTimeString()}</small>
                                </div>
                            </div>
                        </div>
                        )
                    }
               })}
            </div>
            <div style={{height:"60px"}}
                ref={scrollToView }>
            </div>
        </div>
    )
}

export default UserChatMessage

