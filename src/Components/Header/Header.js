import React from 'react'
import "./Header.css"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import{ Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import {useStateValue} from '../../StateProvider'
import {actionType} from '../../reducer'
import db from '../../firebase'



const Header = () => {


    const [state, dispatch] = useStateValue()

    const logout = () => {
             db.collection("users")
            .doc(state.auth.user.uid)
            .update({
            isOnline: false
            }).then(() => {
             localStorage.clear()
                dispatch({
                type: actionType.SET_LOGOUT
        })
            }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <div className="header">
            <div className="header__left">
                <Avatar className="header__avatar" src={state.auth.user?.photoURL} alt= {state.auth.user?.name} />
                <AccessTimeIcon/>
            </div>
            <div className="header__search">
                <SearchIcon />
                <input type="text" placeholder="search Jahsminemma channel" />
                
            </div>
            
            <div onClick ={logout} className="header__help">
                <SettingsIcon />
                <h2>logout</h2>
            </div>
            </div>
            
    )
}

export default Header
