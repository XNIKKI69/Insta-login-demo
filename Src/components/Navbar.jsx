import React from 'react'
import { auth, signOut } from '../firebase'

export default function Navbar({user}){
  return (
    <div className="navbar">
      <div className="brand"><img src="/public/logo.png" alt="logo"/><div>SwordEX</div></div>
      <div className="tabs">
        {user ? (
          <>
            <div className="tab"><a href="#home">Home</a></div>
            <div className="tab"><a href="#chats">Chats</a></div>
            <div className="tab"><a href="#profile">Profile</a></div>
          </>
        ) : (
          <>
            <div className="tab"><a href="#login">Login</a></div>
            <div className="tab"><a href="#signup">Signup</a></div>
          </>
        )}
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        {user && <div className="small">{user.email}</div>}
        {user && <button className="btn" onClick={() => signOut(auth)}>Logout</button>}
      </div>
    </div>
  )
}
