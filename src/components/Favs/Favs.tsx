import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Movie } from '../../types'
import { Autocomplete, TextField, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Modal } from '@mui/joy';
import { validate } from '../../helpers'
import close from '../../imgs/close.png'
import edit from '../../imgs/pen.png'
import add from '../../imgs/plus.png'
import nullPoster from '../../imgs/null-poster.png'
import '../../App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type propTypes = {
  user: string | undefined
}

const Favs = ({user}:propTypes) => {
  const [favs, setFavs] = useState<(Movie)[]>([null, null, null, null])
  const [editFavs, setEditFavs] = useState([...favs])
  const [options, setOptions] = useState<Movie[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(0)
  
  const navigate = useNavigate()

  const {username} = useParams()

  const isValidated = validate(user, username)

  const getFavs = (username:string|undefined) => {
    return fetch(`https://four-favs-be.onrender.com/api/v0/user/${username}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => {
        return data.user.fourFavs
      })
  }
  
  const openModal = (index: number) => {
    setPos(index)
    setOpen(true)
  }

  const handlePosterClick = (fav: Movie, index: number) => {
    if (isEdit) {
      openModal(index)
      return
    } else if (fav) {
      window.location.href = `https://www.themoviedb.org/movie/${fav.id}`
    }
  }
  
  const handleValueChange = (event: React.SyntheticEvent<Element, Event>, newValue:Movie, pos:number) => {
    if(newValue) {
      const newFavs = [...editFavs]
      newFavs.splice(pos, 1, newValue)
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
  
  const updateFavs = (username: string | undefined, favs: Movie[]) => {
  
    const filteredIds = favs.filter(movie => movie !== null).map(movie => movie?.id)
    
     return fetch(`https://four-favs-be.onrender.com/api/v0/user/${username}/favs`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        fourFavs: filteredIds,
      })
    })
  }

  useEffect(() => {    
    getFavs(username)
      .then((data) => Promise.all(data.map((id:number) => getMovieById(id))))
      .then(data => {
        while (data.length < 4) {
          data.push(null)
        }
        setFavs(data)
        setEditFavs(data)
      })
  }, [])

  const posters = (!isEdit ? favs : editFavs).map((fav, index) => {
    return <div key={index} className={`poster-box ${fav && 'set-poster-hover'} ${isEdit && 'hovered-edit-poster'}`}>
        {isEdit && fav &&
        <img
          className='remove-poster-button'
          src={close}
          onClick={() => {
            const newFavs = [...editFavs]
            newFavs.splice(index, 1, null)
            setEditFavs(newFavs)
          }}
        />}
        {isEdit &&
        <div className='poster-editing-icon'>
          <img
            src={fav ? edit : add}
            onClick={() => openModal(index)}
            />
        </div>}
        <div className='poster-overflow'>
          <img
            onClick={() => handlePosterClick(fav, index)}
            className='poster'
            src={fav ? `https://image.tmdb.org/t/p/original/${fav.poster_path}` : nullPoster}
          />
        </div>
      </div>
  })


  return (
    <div className='background'>
      <div className='App'>
        {isValidated && <button
          onClick={() => {
            localStorage.clear()
            navigate('/sign-in')
          }}>
          log out
        </button>}
        <div className='favs-header-container'>
          <h2 className='favs-header'>FAVORITE FILMS</h2>
          {!isEdit && isValidated && <img className='edit-icon' onClick={() => setIsEdit(true)} src={edit}/>}
        </div>
        <div className="favs-container">
          {posters}
        </div>
        {isEdit && isValidated &&
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
              updateFavs(username, newFavs)
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
              openText={'nooo'}
              id="movies-select"
              options={options}
              getOptionLabel={(option) => {
                return `${option?.title} (${option?.release_date.slice(0, 4)})`
              }}
              sx={{
                width: 300,
              }}
              renderInput={(params) => <TextField {...params} autoFocus={true} onChange={(e)=>handleQueryChange(e)} label="Movie" />}
              onChange={(event, newValue) => handleValueChange(event,newValue, pos)}
            />
          </ThemeProvider>
        </Modal>
      </div>
    </div>
  );
  }

export default Favs