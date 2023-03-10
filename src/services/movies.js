const API_KEY='1cfd74a0'
export const searchMovies = ({search})=>{
  try{
    //setResponseMovies(exampleData)
    return fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then(response => response.json())
    .then(data => {
      const movies=data.Search
      return movies?.map(movie =>(
        {
          id:movie.imdbID,
          title:movie.Title,
          year:movie.Year,
          poster:movie.Poster,
          type:movie.Type
        }
      )) || []
    })
  }catch(error){
    throw new Error('Errro searching movies')
  }
}