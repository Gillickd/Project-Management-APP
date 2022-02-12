import React from 'react';

//Hooks
import { useCollection } from '../hooks/useCollection'

//components

import Avatar from './Avatar';


//Styles

import './OnlineUsers.css'



export default function OnlineUsers() {
const { error, documents } = useCollection('users')

  return (
  <div className="user-list">
      <h2>All Users</h2>
      {/**If we have an error  */}
      {error &&<div className="error">{error}</div>}
      {/**Only map through documents if we have them  */}
      {documents && documents.map(user => (
          <div key ={user.id} className="user-list-item">
              {user.online &&<span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL}/>

          </div>

       ) )
            }
  </div>
  )
}
