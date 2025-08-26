import { auth, signOut } from '../firebase.js';

export function navbar(user, active='home'){
  const nav = document.createElement('div');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner container">
      <div class="brand">
        <img src="./public/logo.png" alt="logo"/>
        <span>Nova Chat</span>
        <span class="badge">${user ? 'Online' : 'Guest'}</span>
      </div>
      <div class="tabs">
        ${user ? tabs(active) : ''}
      </div>
      <div class="row">
        ${user ? `<span class="small" style="margin-right:10px">${user.email||''}</span><button id="logout" class="btn">Logout</button>` : ''}
      </div>
    </div>`;
  if(user){
    nav.querySelector('#logout').onclick = ()=> signOut(auth);
  }
  return nav;
}

function tabs(active){
  const make = (id,label)=>`<a href="#${id}" class="tab ${active===id?'active':''}">${label}</a>`;
  return [make('home','Home'), make('chats','Chats'), make('profile','Profile')].join('');
}
