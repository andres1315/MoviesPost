function ListMovies({movies}){
  return(
    <ul className="movies">
      {
        movies.map((movie) => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}


function ListMoviesEmpty(){
  return(
    <h2>No se encontrarons peliculas para mostrar</h2>
  )
}


export function Movies({movies}){
  const hasMovies = movies.length >0
  return (
    hasMovies
    ? <ListMovies movies={movies}/>
    : <ListMoviesEmpty/>
  )
}