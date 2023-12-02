import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Favs from './components/Favs/Favs'
import { parseJwt } from './helpers'
import './App.css';

function App() {
  const [user, setUser] = useState(parseJwt(localStorage.token))

  const updateUser = () => {
    setUser(parseJwt(localStorage.token))
  }

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<SignIn updateUser={updateUser}/>}/>
      <Route path='/sign-up' element={<SignUp updateUser={updateUser}/>}/>
      <Route path='/:username' element={<Favs user={user} updateUser={updateUser}/>}/>
    </Routes>
  )
}

export default App;
