import React, {useState, useEffect} from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import close from './imgs/close.png'
import edit from './imgs/pen.png'
import add from './imgs/plus.png'
import nullPoster from './imgs/null-poster.png'
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
} | null;



function App() {
  const [favs, setFavs] = useState<(Movie)[]>([null, null, null, null])
  const [editFavs, setEditFavs] = useState([...favs])
  const [options, setOptions] = useState<any[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [pos, setPos] = useState(0)

  const handleValueChange = (event:any, newValue:Movie, pos:number) => {
    if(newValue) {
      const newFavs = [...editFavs]
      newFavs.splice(pos, 1, newValue)
      console.log(newFavs)
      setEditFavs(newFavs)
    }
  }

  const handleQueryChange = (e: any) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`;
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    };
  

  fetch(url, fetchOptions)
    .then(res => res.json())
    .then(data => setOptions(data.results))
    .catch(err => console.error('error:' + err));
    }


  const posters = (!isEdit ? favs : editFavs).map((fav, index) => {
    return <div className={`poster-box ${fav && 'set-poster-hover'} ${isEdit && 'hovered-edit-poster'}`}>
        {isEdit && fav &&
        <button
          className='remove-poster-button'
          onClick={() => {
          const newFavs = [...editFavs]
          newFavs.splice(index, 1, null)
          setEditFavs(newFavs)
          }}
        >
          <img src={close}/>
        </button>}
        {isEdit &&
        <div className='poster-editing-icon'>
          <img src={fav ? edit : add} onClick={()=> setPos(index)}/>
        </div>}
        <div className='poster-overflow'>
          <img
            className='poster'
            onClick={()=> setPos(index)} key={index} src={fav ? `https://image.tmdb.org/t/p/original/${fav.poster_path}` : nullPoster}
          />
        </div>
      </div>
  })


  return (
    <div className='background'>
      <div className='App'>
        <div className='favs-header-container'>
          <h2 className='favs-header'>FAVORITE FILMS</h2>
          {!isEdit && <img className='edit-icon' onClick={() => setIsEdit(true)} src={edit}/>}
        </div>
        <div className="favs-container">
          {posters}
        </div>
        {isEdit && 
        <>
          <button onClick={()=>setIsEdit(false)}>Cancel</button>
          <button 
            onClick={()=> {
              const newFavs = [...editFavs]
              newFavs.sort((a, b) => {
                if (a === null && b !== null) {
                  return 1
                }
                if (a !== null && b === null) {
                  return -1
                }
                return 0
              })
              setFavs([...newFavs])
              setEditFavs([...newFavs])
              setIsEdit(false)
            }}>
            Save
          </button>
        </>
        }
        <ThemeProvider theme={darkTheme}>
          <Autocomplete
            disablePortal
            id="movies-select"
            options={options}
            getOptionLabel={(option) => {
              return `${option.title} (${option.release_date.slice(0, 4)})`}
            }
            sx={{
              width: 300,
            }}
            renderInput={(params) => <TextField {...params} onChange={(e)=>handleQueryChange(e)} label="Movie" />}
            onChange={(event, newValue) => handleValueChange(event,newValue, pos)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
