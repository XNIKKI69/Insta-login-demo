// Firebase SDK setup (modular via CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { 
  getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, onSnapshot,
  query, where, orderBy, limit, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: "AIzaSyBoco0HmEDwL8ffXt5UJgWJgDyz2KghcFU",
  authDomain: "swordex-login.firebaseapp.com",
  databaseURL: "https://swordex-login-default-rtdb.firebaseio.com",
  projectId: "swordex-login",
  storageBucket: "swordex-login.firebasestorage.app",
  messagingSenderId: "633212760179",
  appId: "1:633212760179:web:ba64d2b8812ab5c134ba06"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export {
  signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, sendEmailVerification, signOut, updateProfile,
  doc, getDoc, setDoc, updateDoc, collection, addDoc, onSnapshot,
  query, where, orderBy, limit, serverTimestamp
};
