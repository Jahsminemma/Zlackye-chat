import React from 'react'
import './SidebarOption.css'
import db from "../../../firebase";
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
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

const SidebarOption = ({ Icon, title, id, uid, addChannelOption, photoURL, color, Indicator, isOnline }) => {
    const history = useHistory()
    const MuiCoreClass = useStyles()

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`)
        }
        if (uid) {
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
                {Icon ? (
                    <h4>{title}</h4>
                ) :
                    (
                        <h4 className="sidebarOption__channel">
                            <span className="sidebarOption__hash">#</span>
                            {
                                title?.slice(0, 10) + "..."
                            }
                        </h4>
                    )}
            </div>
        </div>
    )
}

export default SidebarOption
