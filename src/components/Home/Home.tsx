import { Button } from '@mui/material'
import {useNavigate, Link} from 'react-router-dom'
import userIcon from '../../imgs/user.png'
import './Home.css'

type propTypes = {
  user: {
    iat: number
    id: string
    username: string
  } | undefined
}

const Home = ({user}: propTypes) => {
  const navigate = useNavigate()

  return (
    <div className='background'>
      <div className='app'>
        <div className='popcorn'>
          <div className='popcorn-button-container'>
            <Button
              variant='contained'
              size='large'
              onClick={()=>navigate(`/${!user ? "sign-in" : user.username}`)}
            >
              {!user ? "sign-in" : user.username}
           </Button>
          </div>
        </div>
        <div>
          <h2 className='featured-users-heading'>Featured Users</h2>
          <div className='featured-users-container'>
              <Link to='/demo1' className='featured-user'>
                <img src={userIcon}/>
                <p>demo1</p>
              </Link>
              <Link to='/Grace' className='featured-user'>
                <img src={userIcon}/>
                <p>demo2</p>
              </Link>
              <Link to='/demo3' className='featured-user'>
                <img src={userIcon}/>
                <p>demo3</p>
              </Link>
              <Link to='/demo4' className='featured-user'>
                <img src={userIcon}/>
                <p>demo4</p>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home