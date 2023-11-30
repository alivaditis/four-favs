import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Movie } from '../../types'
import { Autocomplete, TextField, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Modal } from '@mui/joy';
import { validate } from '../../helpers'
import { getMovieById, getUser, getOptions, putFavs } from '../../api'
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
  user: {
    iat: number
    id: string
    username: string
  } | undefined
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

  const isValidated = validate(user?.username, username)
  
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
    getOptions(e.target.value)
      .then(data => setOptions(data.results))
      .catch(e => console.error('error:' + e))
  }
  
  const updateFavs = (username: string | undefined, favs: Movie[]) => {
    const filteredIds = favs.filter(movie => movie !== null).map(movie => movie?.id)
    putFavs(username, filteredIds)
  }

  useEffect(() => {    
    getUser(username)
      .then((data) => Promise.all(data.fourFavs.map((id:number) => getMovieById(id))))
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
          <Button 
            onClick={
              ()=> {
                setEditFavs([...favs])
                setIsEdit(false)
              }
              }>
            Cancel
          </Button>
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
                let releaseDate = ''
                if (option?.release_date) {
                  releaseDate = `(${option?.release_date.slice(0, 4)})`
                }
                return `${option?.title} ${releaseDate}`
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