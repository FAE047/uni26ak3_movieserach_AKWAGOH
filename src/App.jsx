// App.jsx bestemmer hvilke sider brukeren kan gå til, og hvilke komponenter som skal vises.
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Movie from "./pages/Movie"

function App(){
  return(

    <Routes>
      {/* Forside */}
      <Route index element={<Home />} />

      {/* Dynamisk route for valgt film */}
      <Route path=":movie" element={<Movie />} />
    </Routes>
  )
}

export default App



