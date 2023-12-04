import {useState} from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import './Nav.css'
import logo from '../../imgs/letterboxd-dots-neg-tight.png'
import menu from '../../imgs/menu.png'
import { PropTypes } from '@mui/material'

type propTypes = {
  user: {
    iat: number
    id: string
    username: string
  } | undefined,
  updateUser: () => void
}

const Nav = ({user, updateUser}: propTypes) => {
  const [isOpen, setIsOpen] = useState(false)


  const openNav = () => setIsOpen(!isOpen)
  
  return (
    <div className='nav-background'>
      <nav className='nav'>
        <Link to='/'>
          <img className='home-logo' src={logo}/>
        </Link>
        <img className='burger' src={menu} onClick={openNav}/>
      </nav>
      {isOpen && <Menu openNav={openNav} user={user} updateUser={updateUser}/>}
    </div>
  )
}

export default Nav