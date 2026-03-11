import { useEffect, useState } from "react"
import History from "../components/History"
import MovieList from "../components/MovieList"

export default function Home(){
  // State for det brukeren skriver i søkefeltet
const [search, setSearch] = useState("")

  // State for filmene som skal vises på siden
const [movies, setMovies] = useState([])

  // State for eventelle meldinger til brukeren
const [message, setMessage] = useState("")
  
  // State for å vise/skjule historikk når input er i fokus
const [focused, setFocused] = useState(false)

  // Henter tidligere søk fra localStorage
const storedHistory = localStorage.getItem("search")

const [history, setHistory] = useState(
    storedHistory ? storedHistory.split(",") : []
)

  // API - nøkkelen fra .env
const apiKey = import.meta.env.VITE_APP_API_KEY

  // Lagrer søkehistorikk hver gang history - staten oppdateres
useEffect(() => {
    localStorage.setItem("search", history.join(","))
}, [history])

  // Henter standardfilmene (James Bond) når siden lastes første gang
useEffect(() => {
    getDefaultMovies()
}, [])

const getDefaultMovies = async () => {
    try {

      // Henter James Bond - filmer som standardinnhold på forsiden
const response = await fetch(
    `https://www.omdbapi.com/?s=james bond&apikey=${apiKey}`
)

const data = await response.json()
// Sjekker at standardlister funker - forventer 10 filmer
// NS_BINDING_ABORTED/404 meldinger i konsollen = vanlige React + Firefox/Google Chrome (nettsteder), dev - problemer
console.log("James Bond data:", data)

if (data.Search) {
// Oppgaven krever minst 10 James Bond - filmer
    setMovies(data.Search.slice(0, 10))
    setMessage("")
} else {
    setMovies([])
    setMessage("Fant ingen filmer.")
}
} catch (err) {
  console.error(err)
  setMessage("Noe gikk galt.")
}
}

const getMovies = async () => {
// Søket skal ikke kjøre før bruker har skrevet minst 3 tegn
  if (search.trim().length < 3){
      setMessage("Skriv minst 3 tegn for å søke.")
  return
}

try {
// Søker etter filmer basert på tittel
  const response = await fetch(
  `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`
)
const data = await response.json()
// Bekrefter at søk gir treff
// NS_BINDING_ABORTED/404 meldinger i konsollen = vanlige React + Firefox/Google Chrome (nettsteder), dev - problemer
console.log("Søkeresultatet:", data)

if (data.Search) {
// Erstatter standardlisten med søkeresultatene
    setMovies(data.Search)
    setMessage("")
} else {
    setMovies([])
   setMessage("Fant ingen filmer.")
}
} catch (err) {
console.error(err)
setMessage("Noe gikk galt.")
}
}

// Oppdaterer search - state når bruker skriver
const handleChange = (e) => {
  setSearch(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
    

// Ekstra sjekk før søk kjøres
if (search.trim().length < 3) {
  setMessage("Skriv minst 3 tegn for å søke.")
  return
}

// Lagrer søket i historikk hvis det ikke finnes fra før
if (!history.includes(search)) {
    setHistory((prev) => [...prev, search])
}

getMovies()
}


return (
    <main>
      <header>
        <h1>Movie Search</h1>
      </header>

      <section>
        <h2>Søk etter film</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="search">Søk etter film</label>
          <input
          id="search"
          type="search"
          placeholder="Harry Potter"
          value={search}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          />

          {/* Viser tidligere søk når inputfeltet er i fokus*/}
          {focused ? (
            <History history={history} setSearch={setSearch} />
          ) : null}

          <button type="submit">Søk</button>
        </form>
      </section>

      {/* Viser melding hvis noe gikk galt eller søket er for kort*/}
      {message ? <p>{message}</p> : null}

      <section>
        <h2>Filmer</h2>
        {/* Sender filmlisten videre til eget komponent*/}
        <MovieList movies={movies} />
      </section>
    </main>
  )
}

   
   


 

