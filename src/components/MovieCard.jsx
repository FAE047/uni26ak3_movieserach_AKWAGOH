import { Link } from "react-router-dom" // For navigasjon til filmside
import posternotfoundImg from "../assets/posternotfound.jpg"

export default function MovieCard({ movie }){
  // Lager slug fra filmtittelen
 const slug = movie.Title.replace(/\s/g,"-").toLowerCase()

 return(
  <li>
    <article>
      {/* Viser bilde hvis filmen har en gydlig poster */}
      {movie.Poster && movie.Poster !== "N/A" ? (
        <figure>
          <img src={movie.Poster} 
          alt={movie.Title} 
          loading="lazy" 
          onError={(e) => (e.target.src = posternotfoundImg)}
          />
          <figcaption>{movie.Title}</figcaption>
        </figure>
      ) : (
        <p>Ingen bilde tilgjengelig.</p> // Fallback for manglende bilde
      )}
      
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      <nav>
        {/* Lenken til den dynamiske filmsiden / James Bond */}
        <Link to={`/${slug}`}>Se mer</Link>
      </nav>
    </article>

  </li>
 )
}



