import React, {useState, useEffect} from 'react';
import { Autocomplete, TextField, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import edit from './imgs/edit-document.png'
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
};



function App() {
  const [favs, setFavs] = useState<(Movie | null)[]>([
null,
    {
      "adult": false,
      "backdrop_path": "/6N1uy1r66mXHefU3gG9ePZgijCW.jpg",
      "genre_ids": [
        28,
        80,
        18
      ],
      "id": 949,
      "original_language": "en",
      "original_title": "Heat",
      "overview": "Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
      "popularity": 48.584,
      "poster_path": "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
      "release_date": "1995-12-15",
      "title": "Heat",
      "video": false,
      "vote_average": 7.908,
      "vote_count": 6618
    },
    {
      "adult": false,
      "backdrop_path": "/k7j5EQGs9fhW0kf7Ts0eN1FGEls.jpg",
      "genre_ids": [
        28,
        14,
        10749
      ],
      "id": 39915,
      "original_language": "cn",
      "original_title": "青蛇",
      "overview": "A mischievous snake who assumes human form interferes with the romance between her reptilian sister and a hapless man.",
      "popularity": 21.577,
      "poster_path": "/qU5lu66AJFopMd5XxELxCkKzRRP.jpg",
      "release_date": "1993-11-04",
      "title": "Green Snake",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 83
    },
    {
      "adult": false,
      "backdrop_path": "/tAwgmXKnQ6WVczwcIq5LKFr0LDb.jpg",
      "genre_ids": [
        18
      ],
      "id": 25538,
      "original_language": "zh",
      "original_title": "一一",
      "overview": "Each member of a family in Taipei asks hard questions about life's meaning as they live through everyday quandaries. NJ is morose: his brother owes him money, his mother is in a coma, his wife suffers a spiritual crisis when she finds her life a blank and his business partners make bad decisions.",
      "popularity": 15.907,
      "poster_path": "/hTPkCpK9SLGDMXRbUwzoep0MxOx.jpg",
      "release_date": "2000-09-20",
      "title": "Yi Yi",
      "video": false,
      "vote_average": 7.883,
      "vote_count": 465
    }
  ])
  const [options, setOptions] = useState<any[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [pos, setPos] = useState(0)

  const handleValueChange = (event:any, newValue:any, pos:number) => {
    if(newValue) {
      const newFavs = [...favs]
      newFavs.splice(pos, 1, newValue)
      console.log(newFavs)
      setFavs(newFavs)
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


  const posters = favs.map((fav, index) => {
    return <div className='poster-box'>
        {isEdit && 
        <button
          className='remove-poster-button'
          onClick={() => {
          const newFavs = [...favs]
          newFavs.splice(index, 1, null)
          setFavs(newFavs)
          }}
          >
          close
        </button>}
        {isEdit &&
        <div className='poster-editing-icon'>
          <img src={fav ? edit : add} onClick={()=> setPos(index)}/>
        </div>}
        <img className='poster' onClick={()=> setPos(index)} key={index} src={fav ? `https://image.tmdb.org/t/p/original/${fav.poster_path}` : nullPoster}/>
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
