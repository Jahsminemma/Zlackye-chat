import React from 'react'
import "./Header.css"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import{ Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import {useStateValue} from '../../StateProvider'
import { initialState } from '../../reducer';
import {actionType} from '../../reducer'
import db, { auth } from '../../firebase'
import { Link } from 'react-router-dom'


const Header = () => {


    const [{ user }, dispatch] = useStateValue()

    const logout = () => {
        localStorage.clear()
        dispatch({
            type: actionType.SET_LOGOUT
        })
    }

    return (
        <div className="header">
            <div className="header__left">
                <Avatar className="header__avatar" src={user?.photoURL} alt= {user?.name} />
                <AccessTimeIcon/>
            </div>
            <div className="header__search">
                <SearchIcon />
                <input type="text" placeholder="search Jahsminemma channel" />
                
            </div>
            <Link  to="#">
            <div onClick ={logout} className="header__help">
                <SettingsIcon />
                <h2>logout</h2>
            </div>
            </Link>
            </div>
            
    )
}

export default Header
