import { Link } from 'react-router-dom'
import cross from '../../imgs/cross.png'

type propTypes = {
  user: {
    iat: number
    id: string
    username: string
  } | undefined,
  openNav: () => void,
  updateUser: () => void
}

const Menu = ({openNav, user, updateUser}: propTypes) => {

  const signOut = () => {
      localStorage.removeItem('token')
      updateUser()
    }

  return (
    <nav className='menu'>
      <button className='menu-cross' onClick={openNav}>
        <img className='menu-cross-img' alt='close button' src={cross}/>
      </button>
        <ul>
          {user &&
            <>
              <Link to={`/${user.username}`} onClick={openNav}>
                  <li>
                    {user.username}
                  </li>
              </Link>
              <Link to='/'>
                <li onClick={() => {
                  openNav()
                  signOut()
                }}
                >
                  Sign Out
                </li>
              </Link>
            </>
          }
          {!user &&
            <>
              <Link to='/sign-in' onClick={openNav}>
                  <li>
                    Sign In
                  </li>
              </Link>
              <Link to='/sign-up' onClick={openNav}>
                  <li>
                    Sign Up
                  </li>
              </Link>
            </>
          }
        </ul>
    </nav>
  )
}

export default Menu