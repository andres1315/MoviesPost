import { useState, useRef, useMemo,useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search,sort}){
  const [movies, setMovies] = useState([]) 
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch =useRef(search)

  const getMovies = useCallback( ({search}) => {
      if(previousSearch.current === search) return
      if(!search) return
      previousSearch.current = search
      setLoading(true)
      setError(null)
      searchMovies({search})
        .then(movies => setMovies(movies))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    },[])

  const sortedMovies=useMemo(()=>{
    console.log('sorting movies')
    return sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
  },[movies,sort])


  


  return {movies:sortedMovies, getMovies,error, loading}
}