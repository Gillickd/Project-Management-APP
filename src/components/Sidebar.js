import { NavLink } from 'react-router-dom'
import  Avatar from './Avatar'
import Datetime from './Datetime'
import { useAuthContext } from '../hooks/useAuthContext'


//Styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

import React from 'react';

export default function Sidebar() {
    const { user } = useAuthContext()
  return (
<div className="sidebar">
    <div className='sidebar-content'>
        <div className="user">
            {/*avatar and username here later */}
            <Avatar src={user.photoURL}/>
            <p>Hello, {user.displayName} </p>
            <Datetime/>
                    

        </div>
        <nav className="links">
            <ul>
                <li>
                    {/*exact will the the NavLink an active class. You must also have "/" */}
                    <NavLink exact to= "/">
                        <img src={DashboardIcon} alt = "dashboard icon" />
                        <span>Dashboard</span>

                    </NavLink>
                    <NavLink to= "/create">
                        <img src={AddIcon} alt = "Add project icon" />
                        <span>Create New Project</span>

                    </NavLink>

                </li>
            </ul>

        </nav>
        
    </div>




</div>

  )
  
  
  
}
