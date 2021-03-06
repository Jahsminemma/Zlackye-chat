import React, { useEffect } from 'react'
import './SidebarOption.css'
import db from "../../../firebase";
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../../StateProvider';


const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export const readMessage = (userId, authUserId) => {
    db.collection("conversations")
        .where("authUserId", "in", [authUserId, userId])
        .where("authUserId", "==", userId)
        .where("userId", "==", authUserId)
        .where("isView", "==", false)
        .get()
        .then(snapshot => {
            if (snapshot.size > 0) {
                snapshot.forEach(message => {
                    db.collection("conversations").doc(message.id).update({ isView: true })
                })
            }
        })
}


const SidebarOption = ({ Icon, unreadMessage, title, id, uid, getUnreadMessage, addChannelOption, photoURL, color, Indicator, isOnline }) => {
    const history = useHistory()
    const MuiCoreClass = useStyles()
    const [state] = useStateValue()

    useEffect(() => {
        if (uid) {
            getUnreadMessage(uid, state.auth.user.uid)

            if (state.users.messages.authUserId === uid) {
                console.log(uid)
            }
        }

    }, [])


    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`)
        }
        if (uid) {
            readMessage(uid, state.auth.user.uid)
            history.push(`/user/${uid}`)
        }

    }

    const addNewChannel = () => {
        const channelName = prompt("Please provide a channel name");
        if (channelName) {
            db.collection("rooms").add({
                name: channelName
            })
        }
    }

    return (
        <div style={{ color: `${color}` }} className="sidebarOption">
            <div className="sidebarOption__details" onClick={addChannelOption ? addNewChannel : selectChannel}>
                {Icon && <Icon src={photoURL} alt={title} className={` sidebarOption__icon ${MuiCoreClass.small}`} />}
                {isOnline ? (
                    <span className="sidebarOption__userPresence">
                        {Indicator && <Indicator />}
                    </span>
                ) : (
                    <span className="sidebarOption__offline">
                        {Indicator && <Indicator />}
                    </span>
                )}
                {Icon ? <h4>{title}</h4>
                 :
                    (
                        <h4 className="sidebarOption__channel">
                            <span className="sidebarOption__hash">#</span>
                            {
                                title?.slice(0, 15) + "..."
                            }
                        </h4>
                    )}
                {unreadMessage ? <p>{ unreadMessage.length}</p>: null }
            </div>
        </div>
    )
}

export default SidebarOption
