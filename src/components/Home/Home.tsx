import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   navigate('/sign-in')
  // }, [])

  return (
    <div className='background'>
      <div className='app'>
        yo
      </div>
    </div>
  )
}

export default Home