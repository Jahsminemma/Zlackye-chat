import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption/SidebarOption'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SmsIcon from '@material-ui/icons/Sms';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleIcon from '@material-ui/icons/People';
import { useState, useEffect } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core'
import db from "../../firebase"
import { Link } from 'react-router-dom'
import { useStateValue } from "../../StateProvider"
import { userAction } from '../../user.reducer';
const Sidebar = () => {
    const [channels, setChannel] = useState([])
    const [state, dispatch] = useStateValue()
    
    const getDbUsers = () => {
        db.collection("users")
            .onSnapshot(snapshot => {
            const userData = []
            snapshot.forEach(doc => {
                if (state.auth.user.uid !== doc.id) {
                    userData.push(doc.data())
                }
            })
                dispatch({
                    type: userAction.REALTIME_USER,
                    user : userData

                })
        })
        
    }


    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setChannel(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            })))))
        getDbUsers()
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__content">
            <div className="sidebar__top">
                    <div className="sidebar__details">
                         <Link style ={{"textDecoration":"none", color:"lightgrey"}} to ="/">
                        <h4>
                            <img src="https://cdn.dribbble.com/users/1937255/screenshots/12209747/media/416371432c05a98dee1a0b3347659008.png?compress=1&resize=800x600" alt="" />
                                <p>Zlackye</p>
                            </h4>
                        </Link>
                        <h5>
                    <FiberManualRecordIcon /> 
                   {state.auth.user.displayName}
                </h5>
                </div>
            </div>
            <SidebarOption Icon={MailOutlineIcon} title={"Inbox"} value={10} />
            <SidebarOption Icon={SmsIcon} title={"Threads"} value={5} />
            <SidebarOption Icon={PeopleOutlineIcon} title={"Groups"} />
            <SidebarOption Icon={AttachFileIcon} title={"File storage"} />
            <hr/>
            <SidebarOption Icon={AddIcon} addChannelOption title={"Add channel"} />

                {channels.map(channel => {
                const {name, id} = channel
                return (
                    <div key={id} className="sidebar__channelOption">
                        <SidebarOption  title={name} id ={id} />
                    </div>
                )
                })}
                <SidebarOption color={"lightblue"} Icon={PeopleIcon} title={"Direct message"} />
                
                {state.users.user.map((userData) => {
                    const { photoURL, uid, displayName, isOnline } = userData;
                return(
                    <div key={uid} className="Sidebar__userOption">
                        <SidebarOption isOnline ={isOnline} Indicator={FiberManualRecordIcon} Icon={Avatar} photoURL ={photoURL} title={displayName}  uid={uid}/>
                    </div>
                )
                })}
          </div>      
            </div>
    )
}

export default Sidebar
