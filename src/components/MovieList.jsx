import MovieCard from "./MovieCard"

export default function MovieList({movies}){
  return (
    <ul>
      {/* Mapper gjennom alle filmer og sender movie-objekt + unik key til MovieCard komponentet 
      imdbID+i gir unik key seøv om duplikater
      */}
      {movies.map((movie, i) => (
        <MovieCard key={movie.imdbID + i} movie={movie} />
      ))}
    </ul>
  )
}



