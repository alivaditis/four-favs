import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/demo1')
  }, [])
  
  return <></>
}

export default Home