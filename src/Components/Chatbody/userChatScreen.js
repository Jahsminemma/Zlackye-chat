import React from 'react'
import ChatHeader from './ChatHeader'
import {useParams} from 'react-router-dom'

const UserChatScreen = () => {
    const {userId} = useParams() 
    return (
        <div className="userChatScreen">
           <ChatHeader/> 
        </div>
    )
}

export default UserChatScreen
