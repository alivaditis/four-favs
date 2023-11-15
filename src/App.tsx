import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Favs from './components/Favs/Favs'

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Favs/>
  )
}

export default App;
