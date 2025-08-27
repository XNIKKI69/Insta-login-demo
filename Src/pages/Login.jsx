import React, { useState } from 'react'
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from '../firebase'

export default function Login(){
  const [email,setEmail] = useState(''); const [pass,setPass] = useState('')
  return (
    <div className="card" style={{maxWidth:520,margin:'0 auto'}}>
      <h2>Sign in to SwordEX</h2>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input className="input" value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" />
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn primary" onClick={async ()=>{ try{ const res = await signInWithEmailAndPassword(auth,email,pass); if(!res.user.emailVerified){ alert('Please verify email'); } window.location.hash='home' }catch(e){ alert(e.message) } }}>Login</button>
        <button className="btn" onClick={async ()=>{ try{ await signInWithPopup(auth, provider); window.location.hash='home' }catch(e){ alert(e.message) } }}>Google</button>
      </div>
    </div>
  )
}
