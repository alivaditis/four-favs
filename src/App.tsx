import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import Favs from './components/Favs/Favs'
import { parseJwt } from './helpers'
import './App.css';

function App() {
  const [user, setUser] = useState(parseJwt(localStorage.token))

  useEffect(() => {
    setUser(parseJwt(localStorage.token))
  }, [localStorage.token])
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/:username' element={<Favs user={user}/>}/>
    </Routes>
  )
}

export default App;
