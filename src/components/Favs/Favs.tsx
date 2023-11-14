import React, { useState, useEffect } from 'react';
import { Movie } from '../../types'
import { Autocomplete, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Modal } from '@mui/joy';
import close from '../../imgs/close.png'
import edit from '../../imgs/pen.png'
import add from '../../imgs/plus.png'
import nullPoster from '../../imgs/null-poster.png'
import '../../App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Favs = () => {
  const [favs, setFavs] = useState<(Movie)[]>([null, null, null, null])
  const [editFavs, setEditFavs] = useState(favs)
  const [options, setOptions] = useState<Movie[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(0)

  const getFavs = (username:string) => {
    return fetch(`http://localhost:3001/api/v0/user/demo1`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => data.user.fourFavs)
  }
  
  const openModal = (index: number) => {
    setPos(index)
    if(isEdit) {
      setOpen(true)
    }
  }
  
  const handleValueChange = (event: React.SyntheticEvent<Element, Event>, newValue:Movie, pos:number) => {
    if(newValue) {
      const newFavs = [...editFavs]
      newFavs.splice(pos, 1, newValue)
      console.log(newFavs)
      setEditFavs(newFavs)
      setOpen(false)
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`;
    
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    }

    fetch(url, fetchOptions)
      .then(res => res.json())
      .then(data => setOptions(data.results))
      .catch(err => console.error('error:' + err))
  }

  const getMovieById = (id: number) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const fetchOtions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    }

    return fetch(url, fetchOtions)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error('error:' + err))
  }
  
  useEffect(() => {    
    getFavs('demo1')
      .then((data) => Promise.all(data.map((id:number) => getMovieById(id))))
      .then(data => setFavs(data))
  }, [])

  useEffect(() => {
    setEditFavs(favs)
  }, favs)

  const posters = (!isEdit ? favs : editFavs).map((fav, index) => {
    return <div key={index} className={`poster-box ${fav && 'set-poster-hover'} ${isEdit && 'hovered-edit-poster'}`}>
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
          <img
            src={fav ? edit : add}
            onClick={() => openModal(index)}
          />
        </div>}
        <div className='poster-overflow'>
          <img
            className='poster'
            onClick={() => openModal(index)}
            src={fav ? `https://image.tmdb.org/t/p/original/${fav.poster_path}` : nullPoster}
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
        <div className='save-button-container'>
          <Button onClick={()=>setIsEdit(false)}>Cancel</Button>
          <Button 
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
          </Button>
        </div>
        }
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <ThemeProvider theme={darkTheme}>
            <Autocomplete
              disablePortal
              id="movies-select"
              options={options}
              getOptionLabel={(option) => {
                return `${option?.title} (${option?.release_date.slice(0, 4)})`
              }}
              sx={{
                width: 300,
              }}
              renderInput={(params) => <TextField {...params} onChange={(e)=>handleQueryChange(e)} label="Movie" />}
              onChange={(event, newValue) => handleValueChange(event,newValue, pos)}
            />
          </ThemeProvider>
        </Modal>
      </div>
    </div>
  );
  }

export default Favs