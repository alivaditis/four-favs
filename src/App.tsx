import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Favs from './components/Favs/Favs'

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:username' element={<Favs/>}/>
    </Routes>
  )
}

export default App;
