import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../api'
import userIcon from '../../imgs/user.png'
import './Users.css'

const Users = () => {
  const [users, setUsers] = useState<
    {
      id: string;
      username: string;
    }[]>([])
  const [error, setError] = useState(false)
  
  useEffect(() => {
    getUsers()
      .then(res => setUsers(res))
      .catch(e => setError(true))
  }, [])

  const userList = users.map(user => {
    return (
    <li>
      <Link className='user-in-list' key={user.id} to={`/${user.username}`}>
        <img className='user-in-list-pic' src={userIcon} alt='user-icon'/>
        <p className='username-in-list'>{user.username}</p>
      </Link>
    </li>)
  })

  if (error) {
    return (
      <div className='background'>
      <div className='app'>
        <p className='error-text'>Could not load users</p>
      </div>
    </div>
    )
  }

  return (
    <div className='background'>
      <div className='app'>
        <ul className='users-list'>
          {userList}
        </ul>
      </div>
    </div>
  )
}

export default Users