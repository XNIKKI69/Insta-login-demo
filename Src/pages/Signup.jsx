import React, { useState } from 'react'
import { auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, doc, setDoc, db, serverTimestamp } from '../firebase'

export default function Signup(){
  const [name,setName] = useState(''); const [email,setEmail]=useState(''); const [pass,setPass]=useState('')
  return (
    <div className="card" style={{maxWidth:520,margin:'0 auto'}}>
      <h2>Create SwordEX account</h2>
      <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input className="input" value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" />
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn primary" onClick={async ()=>{ try{ const { user } = await createUserWithEmailAndPassword(auth,email,pass); await updateProfile(user,{ displayName:name }); await setDoc(doc(db,'users',user.uid),{ uid:user.uid, name, email, bio:'', photo:'', createdAt: serverTimestamp() }); await sendEmailVerification(user); alert('Verification sent'); window.location.hash='login' }catch(e){ alert(e.message) } }}>Sign up</button>
      </div>
    </div>
  )
}
