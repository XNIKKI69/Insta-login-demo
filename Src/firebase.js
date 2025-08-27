// Firebase initialization and exports
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "...",
  authDomain: "swordex-login.firebaseapp.com",
  projectId: "swordex-login",
  storageBucket: "swordex-login.appspot.com",
  messagingSenderId: "...",
  appId: "..."
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

export {
  onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile,
  doc, setDoc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where
}
