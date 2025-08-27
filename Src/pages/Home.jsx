import React, { useEffect, useState } from 'react'
import { db, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, auth } from '../firebase'

export default function Home(){
  const [text,setText] = useState(''); const [posts,setPosts] = useState([])
  useEffect(()=>{
    const q = query(collection(db,'posts'), orderBy('createdAt','desc'))
    const unsub = onSnapshot(q,(snap)=> setPosts(snap.docs.map(d=>({id:d.id,...d.data()}))))
    return ()=> unsub()
  },[])
  return (
    <div>
      <div className="card"><h2>Home</h2><div style={{display:'flex',gap:8}}><input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Share something"/><button className="btn primary" onClick={async ()=>{ if(!text) return; await addDoc(collection(db,'posts'),{ uid:auth.currentUser.uid, name:auth.currentUser.displayName||auth.currentUser.email, text, createdAt: serverTimestamp() }); setText('') }}>Post</button></div></div>
      <div className="space"></div>
      <div className="card"><h3>Feed</h3><div className="list">{posts.map(p=>(<div className="item" key={p.id}><div><div style={{fontWeight:700}}>{p.name}</div><div className="small">{p.text}</div><div className="small">{new Date(p.createdAt?.toDate?.()||Date.now()).toLocaleString()}</div></div></div>))}</div></div>
    </div>
  )
}
