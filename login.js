import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from '../firebase.js';
export function renderLogin(root){
  root.innerHTML = `<div class="card" style="max-width:520px;margin:0 auto">
    <h2>Sign in to SwordEX</h2>
    <div class="space"></div>
    <input id="email" class="input" placeholder="Email" />
    <input id="pass" class="input" placeholder="Password" type="password" />
    <div style="display:flex;gap:8px;margin-top:8px">
      <button id="btnLogin" class="btn primary">Login</button>
      <button id="btnGoogle" class="btn">Sign in with Google</button>
    </div>
    <div class="small" style="margin-top:8px">Don't have account? <a href="#signup">Create</a></div>
  </div>`;
  root.querySelector('#btnGoogle').onclick = async ()=>{
    try{ await signInWithPopup(auth, provider); location.hash='home'; } catch(e){ alert(e.message); }
  };
  root.querySelector('#btnLogin').onclick = async ()=>{
    const e = root.querySelector('#email').value.trim();
    const p = root.querySelector('#pass').value.trim();
    try{ const res = await signInWithEmailAndPassword(auth,e,p); if(!res.user.emailVerified){ alert('Please verify email first'); } location.hash='home'; } catch(e){ alert(e.message); }
  };
}