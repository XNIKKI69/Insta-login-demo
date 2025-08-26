import { auth, onAuthStateChanged } from './firebase.js';
import { renderLogin } from './pages/Login.js';
import { renderSignup } from './pages/Signup.js';
import { renderHome } from './pages/Home.js';
import { renderChats } from './pages/Chats.js';
import { renderProfile } from './pages/Profile.js';
import { navbar } from './components/Navbar.js';

const app = document.getElementById('app');

function route() {
  const hash = location.hash.replace('#','') || 'home';
  const user = auth.currentUser;
  app.innerHTML = '';
  app.appendChild(navbar(user, hash));
  const container = document.createElement('div');
  container.className = 'container';
  app.appendChild(container);

  if (!user && (hash !== 'login' && hash !== 'signup')) {
    location.hash = 'login';
    return;
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

window.addEventListener('hashchange', route);
onAuthStateChanged(auth, ()=> route());
route();
