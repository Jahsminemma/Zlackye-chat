import React, {useState, useEffect} from 'react'
import ChatHeader from './ChatHeader'
import {useParams} from 'react-router-dom'
import MessageInput from './MessageInput'
import './UserChatScreen.css'
import db from '../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider'
import { userAction } from '../../user.reducer'
import UserChatMessage from './UserChatMessage'
import TimeAgo from "timeago-react"




const UserChatScreen = () => {
    const { userId } = useParams()
    const [userInfos, setUserInfos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [state, dispatch] = useStateValue()
    

    const updateMessage = (messageObj) => {
        db.collection("conversations").add({
            ...messageObj,
            isView: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),            
        }).catch(error => {
            console.log(error)
        })
    }

   const getRealTimeConversation = (userId, authUserId) => {
        db.collection("conversations")
            .where("authUserId", "in", [userId, authUserId])
            .orderBy("createdAt","asc")
            .onSnapshot(snapshot => {
                const conversation = []
                snapshot.forEach(doc => {
                    if ((doc.data().authUserId === authUserId && doc.data().userId === userId)
                    || (doc.data().authUserId === userId && doc.data().userId === authUserId)) {
                        conversation.push(doc.data())
                    }
                })
                dispatch({
                    type: userAction.REALTIME_CONVERSATION,
                    conversations : conversation
                 })
            })
    }

    const sendMessage = (e) => {
        e.preventDefault()

        const messageObj = {
            authUserId: state.auth.user.uid,
            userId: userId,
            message: inputValue,
        }
        if (inputValue) {
             db.collection("users").doc(state.auth.user.uid)
            .update({
            isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
            updateMessage(messageObj)
            setInputValue("")
        }
    }
    

    useEffect(() => {
        if (userId) {
            db.collection("users")
                .doc(userId).onSnapshot(doc => {
                setUserInfos(doc.data())
            })
        }
        getRealTimeConversation(userId, state.auth.user.uid)
    }, [userId])
    return (
        <div className="userChatScreen">
            <ChatHeader roomInfos={userInfos} image={userInfos?.photoURL}
                value={userInfos?.isOnline ? (
                    <p>Last seen : <TimeAgo datetime={userInfos?.isCreatedAt.toDate()}/></p>
                ):("offline") } />
            <UserChatMessage Messages = {state.users.conversations}/>
            <div className="message__input">
                <MessageInput sendMessage={sendMessage} inputValue ={inputValue} setInputValue={setInputValue} />
            </div>
        </div>
    )
}

export default UserChatScreen
