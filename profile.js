import { auth, db, doc, getDoc, updateDoc } from '../firebase.js';
const avatar = (n)=>`https://ui-avatars.com/api/?name=${encodeURIComponent(n||'User')}&background=0D1220&color=E8EEF7`;
export async function renderProfile(root){
  const u = auth.currentUser;
  const ref = doc(db,'users',u.uid); const snap = await getDoc(ref); const d = snap.exists()? snap.data(): { name:u.displayName||u.email, bio:'', photo:'' };
  root.innerHTML = `<div class="card"><h2>Profile</h2><div style="display:flex;gap:12px;align-items:center"><img id="photo" class="avatar" src="${d.photo||avatar(d.name)}"/><div><div style="font-weight:700">${d.name}</div><div class="small">${u.email||''}</div></div></div></div><div class="space"></div><div class="card"><h3>Edit</h3><input id="name" class="input" value="${d.name||''}" placeholder="Name"/><input id="bio" class="input" value="${d.bio||''}" placeholder="Bio"/><input id="photoUrl" class="input" value="${d.photo||''}" placeholder="Photo URL (no storage)"/><div style="display:flex;gap:8px;margin-top:8px"><button id="save" class="btn primary">Save</button></div></div>`;
  root.querySelector('#save').onclick = async ()=>{ const name=root.querySelector('#name').value.trim(); const bio=root.querySelector('#bio').value.trim(); const photo=root.querySelector('#photoUrl').value.trim(); await updateDoc(ref,{ name, bio, photo }); alert('Saved'); };
}