import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [favs, setFavs] = useState([
    {
      "adult": false,
      "backdrop_path": "/wDe8LzwuvHYYiuwyNfxdYQq8ti4.jpg",
      "genre_ids": [
        12,
        28,
        878
      ],
      "id": 1893,
      "original_language": "en",
      "original_title": "Star Wars: Episode I - The Phantom Menace",
      "overview": "Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.",
      "popularity": 38.898,
      "poster_path": "/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg",
      "release_date": "1999-05-19",
      "title": "Star Wars: Episode I - The Phantom Menace",
      "video": false,
      "vote_average": 6.5,
      "vote_count": 13621
    },
    {
        "adult": false,
        "backdrop_path": "/4qCqAdHcNKeAHcK8tJ8wNJZa9cx.jpg",
        "genre_ids": [
          12,
          28,
          878
        ],
        "id": 11,
        "original_language": "en",
        "original_title": "Star Wars",
        "overview": "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
        "popularity": 84.707,
        "poster_path": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        "release_date": "1977-05-25",
        "title": "Star Wars",
        "video": false,
        "vote_average": 8.2,
        "vote_count": 19263
      },
      {
        "adult": false,
        "backdrop_path": "/8BTsTfln4jlQrLXUBquXJ0ASQy9.jpg",
        "genre_ids": [
          12,
          28,
          878
        ],
        "id": 140607,
        "original_language": "en",
        "original_title": "Star Wars: The Force Awakens",
        "overview": "Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
        "popularity": 52.214,
        "poster_path": "/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
        "release_date": "2015-12-15",
        "title": "Star Wars: The Force Awakens",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 18429
      }, 
      {
        "adult": false,
        "backdrop_path": "/epVMXf10WqFkONzKR8V76Ypj5Y3.jpg",
        "genre_ids": [
          12,
          28,
          878
        ],
        "id": 181808,
        "original_language": "en",
        "original_title": "Star Wars: The Last Jedi",
        "overview": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
        "popularity": 60.72,
        "poster_path": "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
        "release_date": "2017-12-13",
        "title": "Star Wars: The Last Jedi",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 14373
      },
  ])

  const imgs = favs.map((fav, index) => <img className='poster' key={index} src={`https://image.tmdb.org/t/p/original/${fav.poster_path}`}/>)

  return (
    <div className='background'>
      <div className='App'>
        <h2 className='favs-header'>FAVORITE FILMS</h2>
        <div className="favs-container">
          {imgs}
        </div>
      </div>
    </div>
  );
}

export default App;
