import React, { useEffect, useState } from 'react'
import { auth, db, doc, getDoc, updateDoc } from '../firebase'

export default function Profile(){
  const [data,setData] = useState({name:'',bio:'',photo:''}); useEffect(()=>{ const u=auth.currentUser; const ref=doc(db,'users',u.uid); getDoc(ref).then(s=>{ if(s.exists()) setData(s.data()); else setData({name:u.displayName||'',bio:'',photo:''}) }) },[])
  return (
    <div>
      <div className="card"><h2>Profile</h2><div style={{display:'flex',gap:12,alignItems:'center'}}><img className="avatar" src={data.photo||`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0D1220&color=E8EEF7`} /><div><div style={{fontWeight:700}}>{data.name}</div><div className="small">{auth.currentUser.email}</div></div></div></div>
      <div className="space"></div>
      <div className="card"><h3>Edit</h3><input className="input" defaultValue={data.name} id="name"/><input className="input" defaultValue={data.bio} id="bio"/><input className="input" defaultValue={data.photo} id="photo"/><div style={{display:'flex',gap:8,marginTop:8}}><button className="btn primary" onClick={async ()=>{ const ref=doc(db,'users',auth.currentUser.uid); await updateDoc(ref,{ name:document.getElementById('name').value, bio:document.getElementById('bio').value, photo:document.getElementById('photo').value }); alert('Saved') }}>Save</button></div></div>
    </div>
  )
}
