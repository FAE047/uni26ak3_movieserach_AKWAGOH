import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import posternotfoundImg from "../assets/posternotfound.jpg"

export default function Movie(){
  // Henter slug fra URL - en
  const { movie } = useParams()

  // State for data om valgt film
  const [data, setData] = useState(null)

  // State for melding ved feil eller tomt resultat
  const [message, setMessage] = useState("")

  // Henter API - nøkkel fra .env
  const apiKey = import.meta.env.VITE_APP_API_KEY

  // Kjører nytt API - kall hvis URL - parameteren endres
  useEffect(() => {
    getMovie()
  }, [movie])

  const getMovie = async () => {
    try {
        // Gjør slug om til vanlig tekst igjen
        const movieTitle = movie?.replace(/-/g, " ")

        // Henter en spesifikk film basert på tittel (t=)
        const response = await fetch(
            `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`
        )
        const result = await response.json()

        // Hvis filmen finnes lagres den i state
        if (result.Response === "True"){
            setData(result)
            setMessage("")
        } else {
            // Hvis ikke viser vi feilmelding
            setData(null)
            setMessage("Fant ikke filmen")
        }
    } catch (err){
        console.error(err)
        setMessage("Noe gikk galt.")
    }
  }

  return(
    <main>
        <header>
            {/* Viser filmens tittel hvis data finnes, ellers slug fra URL*/}
            <h1>{data ? data.Title : movie}</h1>
        </header>

        {/* Viser melding hvis noe gikk galt*/}
        {message ? <p>{message}</p> : null}

        {/* Viser filmens innhold bare hvis data er hentet*/}
        {data ? (
            <article className="single-movie">
                {/* Viser bilde hvis filmen har poster*/}
                {data.Poster && data.Poster !== "N/A" ? (
                    <figure>
                        <img src={data.Poster} alt={data.Title} loading="lazy"
                        onError={(e) => { 
                            e.target.src = posternotfoundImg;
                        }}
                       />
                        <figcaption>{data.Title}</figcaption>
                    </figure>
                ) : (
                    <p>Ingen bilde tilgjengelig</p>
                )}
                <section>
                    <h2>Detaljer</h2>
                    <p><strong>Tittel:</strong> {data.Title}</p>
                    <p><strong>År:</strong> {data.Year}</p>
                    <p><strong>Genre:</strong> {data.Genre}</p>
                    <p><strong>Regissør:</strong> {data.Director}</p>
                    <p><strong>Skuespillere:</strong> {data.Actors}</p>
                    <p><strong>Handling:</strong> {data.Plot}</p>
                    <p><strong>Spilletid:</strong> {data.Runtime}</p>
                    <p><strong>IMDB-rating:</strong> {data.imdbRating}</p>
                </section>
                
                <nav>
                    <Link to="/">Tilbake</Link>
                </nav>
            </article>
        ): null}
    </main>
  )
}






