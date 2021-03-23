import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption/SidebarOption'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SmsIcon from '@material-ui/icons/Sms';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { useState, useEffect } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import AddIcon from '@material-ui/icons/Add';
import db from "../../firebase"
import { Link } from 'react-router-dom'
import { useStateValue } from "../../StateProvider"
const Sidebar = () => {
    const [channels, setChannel] = useState([])
    const [{user}, dispatch] = useStateValue()
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setChannel(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name 
        })))
        ))
       
    }, [])
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
                   {user?.displayName}
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
                    <div className="sidebar__channelOption">
                        <SidebarOption key={id} title={name} id ={id} />
                    </div>
                )
            })}
          </div>      
            </div>
    )
}

export default Sidebar
