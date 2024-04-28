import { useEffect, useState } from 'react'

function Home() {
  const [searchLine, setSearchLine] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://www.omdbapi.com?apikey=3c746546&s=${searchLine}&page=${page}`)
      .then(res =>
        res.json()
      )
      .then(data => {
        setSearchResult(data.Search);
      })
      .catch(err => {
        console.error(err);
      });
    return () => { }
  }, [searchLine, page]);

  function handleChange(event) {
    const { value } = event.target;
    setSearchLine(value);
    setPage(1);
  }

  function turnPage(event) {
    if (searchResult) {
      if (event.target.id == 'turnLeft' && page > 1) { setPage(p => p -= 1) }
      else if (event.target.id == 'turnRight') { setPage(p => p += 1) }
      else { return }
    }
  }

  return (
    <div>
      <h1>Search for any movie</h1>
      <div className="search">
        <div className="search-input">
          <h3>Search</h3>
          <input type="text" value={searchLine} onChange={handleChange} />
        </div>

        <div className="search-list">
          {searchResult ?
            searchResult.map((card, id) => {
              return (
                <div className="card" key={id}>
                  <div className="card-image">
                    <img src={`${card.Poster}`} alt="poster" />
                  </div>
                  <h3>Title: {card.Title}</h3>
                  <h4>Type: {card.Type}</h4>
                  <h4>Year: {card.Year}</h4>
                </div>
              )
            })
            : <h2>Too many results</h2>}
        </div>
        {searchResult && (
          <div className="turn-page" onClick={turnPage} >
            <button id='turnLeft'>{'<'}</button>
            <button id='turnRight'>{'>'}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
