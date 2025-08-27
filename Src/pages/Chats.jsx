import React, { useEffect, useState } from 'react'
import { db, collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, auth } from '../firebase'

export default function Chats(){
  const [users,setUsers] = useState([]); const [groups,setGroups] = useState([]); const [active,setActive] = useState(null); const [msgs,setMsgs] = useState([]); const [text,setText] = useState('')
  useEffect(()=>{
    const qU = query(collection(db,'users')); const unsubU = onSnapshot(qU,(s)=> setUsers(s.docs.map(d=>({id:d.id,...d.data()}))))
    const qG = query(collection(db,'groups'), orderBy('createdAt','desc')); const unsubG = onSnapshot(qG,(s)=> setGroups(s.docs.map(d=>({id:d.id,...d.data()}))))
    return ()=>{ unsubU(); unsubG(); }
  },[])
  useEffect(()=>{
    if(!active) return; const q = query(collection(db, active.type==='dm' ? 'dmMessages' : 'groupMessages'), orderBy('createdAt')); const unsub = onSnapshot(q,(s)=> setMsgs(s.docs.map(d=>d.data()))); return ()=> unsub()
  },[active])
  const openDM = (u)=> setActive({ type:'dm', id:[auth.currentUser.uid,u.id].sort().join('_'), title:u.name })
  const openGroup = (g)=> setActive({ type:'group', id:g.id, title:g.name })
  const send = async ()=>{ if(!text||!active) return; await addDoc(collection(db, active.type==='dm' ? 'dmMessages' : 'groupMessages'), { uid:auth.currentUser.uid, name:auth.currentUser.displayName||auth.currentUser.email, text, createdAt: serverTimestamp(), ...(active.type==='dm'?{threadId:active.id}:{gid:active.id}) }); setText('') }
  return (
    <div className="grid">
      <div className="card"><h3>Users</h3><div className="list">{users.filter(u=>u.id!==auth.currentUser.uid).map(u=>(<div className="item" key={u.id} onClick={()=>openDM(u)}><img className="avatar" src={u.photo||`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=0D1220&color=E8EEF7`} /><div><div style={{fontWeight:700}}>{u.name}</div><div className="small">{u.email}</div></div></div>))}</div></div>
      <div className="card"><h3>{active?active.title:'Open a chat'}</h3><div className="chat"><div className="messages">{msgs.map((m,i)=>(<div key={i} className={'bubble '+(m.uid===auth.currentUser.uid?'me':'')}>{m.text}<div className='small'>{m.name} • {new Date(m.createdAt?.toDate?.()||Date.now()).toLocaleTimeString()}</div></div>))}</div><div style={{display:'flex',gap:8}}><input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" /><button className="btn primary" onClick={send}>Send</button></div></div></div>
    </div>
  )
}
