import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, auth } from './firebase'
import Navbar from './components/Navbar'
import PageHome from './pages/Home'
import PageChats from './pages/Chats'
import PageProfile from './pages/Profile'
import PageLogin from './pages/Login'
import PageSignup from './pages/Signup'

export default function App(){
  const [user, setUser] = useState(null)
  const [route, setRoute] = useState(window.location.hash.replace('#','') || 'home')

  useEffect(()=>{
    onAuthStateChanged(auth, u => setUser(u))
    const onHash = () => setRoute(window.location.hash.replace('#','') || 'home')
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  if(!user && route !== 'login' && route !== 'signup') {
    window.location.hash = 'login'
    return null
  }

  return (
    <div>
      <Navbar user={user} />
      <main className="container">
        {route === 'home' && <PageHome user={user} />}
        {route === 'chats' && <PageChats user={user} />}
        {route === 'profile' && <PageProfile user={user} />}
        {route === 'login' && <PageLogin />}
        {route === 'signup' && <PageSignup />}
      </main>
    </div>
  )
}
