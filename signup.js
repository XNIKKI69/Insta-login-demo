import { auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, db, doc, setDoc, serverTimestamp } from '../firebase.js';
export function renderSignup(root){
  root.innerHTML = `<div class="card" style="max-width:520px;margin:0 auto">
    <h2>Create SwordEX account</h2>
    <input id="name" class="input" placeholder="Full name" />
    <input id="email" class="input" placeholder="Email" />
    <input id="pass" class="input" placeholder="Password" type="password" />
    <div style="display:flex;gap:8px;margin-top:8px">
      <button id="btnSignup" class="btn primary">Sign up</button>
    </div>
    <div class="small" style="margin-top:8px">Already registered? <a href="#login">Login</a></div>
  </div>`;
  root.querySelector('#btnSignup').onclick = async ()=>{
    const name=root.querySelector('#name').value.trim(); const email=root.querySelector('#email').value.trim(); const pass=root.querySelector('#pass').value.trim();
    if(!name||!email||!pass) return alert('Fill all');
    try{
      const { user } = await createUserWithEmailAndPassword(auth,email,pass);
      await updateProfile(user,{ displayName: name });
      await setDoc(doc(db,'users',user.uid),{ uid:user.uid, name, email, bio:'', photo:'', createdAt: serverTimestamp() });
      await sendEmailVerification(user);
      alert('Account created. Verification email sent. Check inbox.');
      location.hash='login';
    }catch(e){ alert(e.message); }
  };
}