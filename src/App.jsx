import './App.css'
import { useState,useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort ]= useState(false)
  const {search, setSearch,error} =  useSearch()
  const {movies, getMovies,loading} = useMovies({search,sort})

  const debounceGetMovies = useCallback(
    debounce(search=>{
      getMovies({search})
    },500)
  ,[getMovies])

  const handleSubmit = (e)=>{
    e.preventDefault()
    getMovies({search})
  }

  const handleSort = ()=>{
    setSort(!sort)
  }

  const handleChange = (e)=>{
    const newSearch= e.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form  className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" name="query" placeholder='Matrix, avangers, jhon wick' />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button  type='submit'>Buscar</button>
        </form>
      </header>
      {error && <p style={{color:'red'}}>{error}</p>}
      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies}/>}
       
      </main>
    </div>
  )
}

export default App
