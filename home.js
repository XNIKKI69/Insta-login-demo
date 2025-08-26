import { db, auth, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from '../firebase.js';
export function renderHome(root){
  root.innerHTML = `<div class="grid"><div class="card"><h2>Home Feed</h2>
    <div style="display:flex;gap:8px"><input id="postText" class="input" placeholder="Share something (text only)"/> <button id="postBtn" class="btn primary">Post</button></div>
    <div class="space"></div><div id="feed" class="list"></div></div>
    <aside class="card"><h3>Your profile</h3><div id="mini" class="small">—</div></aside></div>`;

  const feedEl = root.querySelector('#feed');
  const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
  onSnapshot(q,(snap)=>{ feedEl.innerHTML=''; snap.forEach(p=>{ const d=p.data(); const el=document.createElement('div'); el.className='item'; el.innerHTML=`<div><div style="font-weight:700">${d.name||'User'}</div><div class="small">${d.text||''}</div><div class="meta">${new Date(d.createdAt?.toDate?.()||Date.now()).toLocaleString()}</div></div>`; feedEl.appendChild(el); }); });

  root.querySelector('#postBtn').onclick = async ()=>{
    const text = root.querySelector('#postText').value.trim(); if(!text) return;
    const u = auth.currentUser;
    await addDoc(collection(db,'posts'),{ uid:u.uid, name:u.displayName||u.email, text, createdAt: serverTimestamp() });
    root.querySelector('#postText').value='';
  };
}