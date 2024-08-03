import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountry = countries.filter((country) => {
    return (
      country.name &&
      country.name.official &&
      country.name.official.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      find countries:
      <input value={search} onChange={handleSearchChange} />
      <div>
        {filteredCountry.length === 1 ? (
          <>
            <h2>{filteredCountry[0].name.official}</h2>
            <p>capital: {filteredCountry[0].capital}</p>
            <p>area: {filteredCountry[0].area}</p>
            <br />

            <h3>languages</h3>
            <ul>
              {Object.keys(filteredCountry[0].languages).map((language, i) => (
                <li key={i}>{filteredCountry[0].languages[language]}</li>
              ))}
            </ul>
            <img
              src={filteredCountry[0].flags.svg}
              alt={`flag of ${filteredCountry[0].name.official}`}
            />
          </>
        ) : filteredCountry.length >= 10 ? (
          "Too many matches, be more specify"
        ) : (
          filteredCountry.map((country, i) => (
            <p key={i}>{country.name.official}</p>
          ))
        )}
      </div>
    </>
  );
}

export default App;
