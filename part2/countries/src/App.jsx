import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const ALL = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    fetch(ALL)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Impossible fecth data", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null); // Reset selected country when search changes
  };

  const filteredCountry = countries.filter((country) => {
    return (
      country.name &&
      country.name.official &&
      country.name.official.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleShowInfo = (country) => {
    setSelectedCountry(country);
  };

  function CountryInfo({ country }) {
    const [weather, setWeather] = useState({});

    useEffect(() => {
      const API_KEY = import.meta.env.VITE_SOME_KEY;
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));
    }, [country]);

    const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

    return (
      <>
        <h2>{country.name.official}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <br />

        <h3>Languages</h3>
        <ul>
          {Object.keys(country.languages).map((language, i) => (
            <li key={i}>{country.languages[language]}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`flag of ${country.name.official}`}
          className="flag"
        />
        <h3>{`Weather in ${country.capital}`}</h3>
        {weather && weather.main ? (
          <>
            <p>{`temperature: ${kelvinToCelsius(weather.main.temp)} °C`}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="icon"
            />
          </>
        ) : (
          <p>Loading weather data</p>
        )}
      </>
    );
  }

  return (
    <>
      find countries:
      <input value={search} onChange={handleSearchChange} />
      <div>
        {selectedCountry ? (
          <CountryInfo country={selectedCountry} />
        ) : filteredCountry.length === 1 ? (
          <CountryInfo country={filteredCountry[0]} />
        ) : filteredCountry.length >= 10 ? (
          "Too many matches, be more specific"
        ) : (
          filteredCountry.map((country, i) => (
            <div key={i}>
              <p>{country.name.official}</p>
              <button onClick={() => handleShowInfo(country)}>Show info</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
