import { auth, db, provider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from './firebase.js';
import { renderLogin } from './views/login.js';
import { renderSignup } from './views/signup.js';
import { renderHome } from './views/home.js';
import { renderChats } from './views/chats.js';
import { renderProfile } from './views/profile.js';
import { navbar } from './components/navbar.js';

export function initApp(){
  const root = document.getElementById('root');
  function route(user){
    root.innerHTML = '';
    root.appendChild(navbar(user));
    const container = document.createElement('div');
    container.className = 'container';
    root.appendChild(container);
    const hash = location.hash.replace('#','')||'home';
    if(!user && hash !== 'login' && hash !== 'signup'){
      location.hash = 'login'; return;
    }
    switch(hash){
      case 'login': renderLogin(container); break;
      case 'signup': renderSignup(container); break;
      case 'home': renderHome(container); break;
      case 'chats': renderChats(container); break;
      case 'profile': renderProfile(container); break;
      default: renderHome(container);
    }
  }
  onAuthStateChanged(auth,(u)=> route(u));
  window.addEventListener('hashchange', ()=> route(auth.currentUser));
}