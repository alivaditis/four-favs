const checkOk = (res: Response) => {
  if (!res.ok) {
    throw new Error
  } else {
    return res.json()
  }
}

const signIn = (username: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
  return fetch('https://four-favs-be.onrender.com/api/v0/signin', {
    'method': 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        'username': username,
        'password': password
      }
    )
  })
  .then(res => checkOk(res))
}

const signUp = (username: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
  return fetch('https://four-favs-be.onrender.com/api/v0/user', {
    'method': 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        'username': username,
        'password': password
      }
    )
  })
  .then(res => checkOk(res))
}


const getMovieById = (id: number) => {
  const fetchOtions = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  }

  return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, fetchOtions)
  .then(res => checkOk(res))
}

const getUser = (username:string|undefined) => {
  return fetch(`https://four-favs-be.onrender.com/api/v0/user/${username}`)
    .then(res => checkOk(res))
    .then(data => {
      return data.user
    })
}

const getOptions = (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      
  const fetchOptions = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  }

  return fetch(url, fetchOptions)
  .then(res => checkOk(res))
}

const putFavs = (username: string | undefined, ids: (number|undefined)[]) => {
  return fetch(`https://four-favs-be.onrender.com/api/v0/user/${username}/favs`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      fourFavs: ids,
    })
  })
  .then(res => checkOk(res))
}

export { signIn, signUp, getMovieById, getUser, getOptions, putFavs }