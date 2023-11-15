import { Routes, Route } from 'react-router-dom'
import Favs from './components/Favs/Favs'

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/:username' element={<Favs/>}/>
    </Routes>
  )
}

export default App;
