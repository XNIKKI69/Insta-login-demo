export function navbar(user){
  const nav = document.createElement('div');
  nav.className = 'nav';
  nav.innerHTML = `<div class="container"><div class="nav"><div class="brand"><img src="./public/logo.png" /> <div>SwordEX</div></div>
  <div class="tabs">
    ${user ? `<a href="#home" class="tab">Home</a><a href="#chats" class="tab">Chats</a><a href="#profile" class="tab">Profile</a>` : `<a href="#login" class="tab">Login</a><a href="#signup" class="tab">Signup</a>`}
  </div>
  <div style="display:flex;gap:8px;align-items:center">
    ${user ? `<div class="small">${user.email}</div><button id="logout" class="btn">Logout</button>` : ''}
  </div></div></div>`;
  if(user){
    nav.querySelector('#logout').onclick = ()=> signOutUser();
  }
  return nav;
}

function signOutUser(){ import('./firebase.js').then(m=> m.signOut(m.auth)); }
