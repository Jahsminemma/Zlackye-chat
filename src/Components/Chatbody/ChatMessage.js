import React, { useRef, useEffect } from 'react'
import Message from './Message'
import { useStateValue } from "../../StateProvider";
import Loader from "react-loader-spinner";
import './UserChatMessage.css'

const ChatMessage = ({ Messages, progress }) => {
    const [state, dispatch] = useStateValue()
    if (progress) {
        console.log(parseInt(progress))
    }

    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({ behaviour: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [Messages])
    return (
        <div style={{ marginTop: "70px" }} className="chatMessage">
            <div className="chat__message">
                {Messages.map(userMessage => {

                    const { user, message, userImage, timeStamp, uid, imageUrl, pdfUrl, pdfName, audioUrl, audioName } = userMessage;
                    if (state.auth.user.uid !== uid) {
                        return (

                            <Message key={timeStamp}
                                user={user} imageUrl={imageUrl} uid={uid} userImage={userImage} message={message} audioUrl={audioUrl}
                                right={"100px"} left={"20px"} progress={progress} timeStamp={timeStamp} pdfName={pdfName} pdfUrl={pdfUrl} audioName={audioName} />
                        )
                    } else {
                        return (

                            <Message key={timeStamp}
                                user={user} progress={progress} imageUrl={imageUrl} uid={uid} userImage={userImage} pdfName={pdfName} pdfUrl={pdfUrl} audioName={audioName}
                                message={message} color={" #49d5ff"} align={"right"} left={"170px"} right={"20px"} timeStamp={timeStamp} audioUrl={audioUrl} />
                        )
                    }
                })}
            </div>
            {
                progress && parseInt(progress) < 100 ? <div className="loader">
                    <Loader type="Bars" color="#00BFFF"
                        height={60} width={80} />
                    <p style={{ color: "#00BFFF", fontWeight: "600" }}>Audio....{Math.round(progress)}%</p>
                </div> : null

            }
            <div style={{ height: "40px" }}
                ref={scrollToView}>
            </div>
        </div>
    )
}

export default ChatMessage
