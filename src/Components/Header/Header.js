import React from 'react'
import "./Header.css"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import{ Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import {useStateValue} from '../../StateProvider'

const Header = () => {
    const [{user}, dispatch] = useStateValue()
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
            <div className="header__help">
             <SettingsIcon />
            </div>
        </div>
    )
}

export default Header
