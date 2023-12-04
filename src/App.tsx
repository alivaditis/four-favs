import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Nav from './components/Nav/Nav'
import Favs from './components/Favs/Favs'
import { parseJwt } from './helpers'
import './App.css';

function App() {
  const [user, setUser] = useState(parseJwt(localStorage.token))

  const updateUser = () => {
    setUser(parseJwt(localStorage.token))
  }

  let {pathname} = useLocation()

  return (
    <>
      {pathname !== ('/sign-in') && pathname !== ('/sign-up') && <Nav user={user} updateUser={updateUser}/>}
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/sign-in' element={<SignIn user={user} updateUser={updateUser}/>}/>
        <Route path='/sign-up' element={<SignUp user={user} updateUser={updateUser}/>}/>
        <Route path='/:username' element={<Favs user={user} updateUser={updateUser}/>}/>
      </Routes>
    </>
  )
}

export default App;
