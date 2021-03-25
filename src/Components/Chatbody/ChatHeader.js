import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom'
import{ Avatar} from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import avatar from '../../assets/images/avatar.png'
import  "./ChatHeader.css";
const ChatHeader = ({ roomInfos, messages }) => {
    return (
        <div className="chat__header">
                <div className="chat__details">
                    <Link to="/" className="chat__backBtn">
                        <ArrowBackIosIcon/>   
                    </Link>
                <div className="channel__avatar">
                        <Avatar src ={avatar}/>
                 </div>
                    <div className="channel__info">
                        
                        <h3>#{ roomInfos?.name}</h3>
                    <p>{messages?.length} messages</p>
                </div>
                </div>
                <div className="channel__icons">
                    <ExploreIcon />
                    <MoreVertIcon/>  
                </div>
            </div>
    )
}
export default ChatHeader