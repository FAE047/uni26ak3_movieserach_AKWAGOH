export default function History ({history, setSearch}){

  // Setter valgt tidligere søk inn i inputfeltet igjen
  const handleChange = (e) => {
    setSearch(e.target.value) // Oppdaterer søkefeltet med gammelt søk
  }

  return (
    <select onChange={handleChange}> {/* Viser når input har fokus */}
    <option value="">Tidligere søk</option> {/* Placeholder */}

    {/* Skriver ut alle tidligere søk som valg i listen */}
    {history.map((item, i) => (
      <option key={i} value={item}>
        {item}
      </option>
    ))}
    </select>
  )
}

