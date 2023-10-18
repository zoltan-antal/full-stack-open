import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const countryNames = useRef(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        countryNames.current = response.data.map(
          (country) => country.name.common
        );
      });
  }, []);

  useEffect(() => {
    if (matches.length !== 1) {
      setCountryData(null);
      setWeatherData(null);
      return;
    }

    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${matches[0]}`
      )
      .then((response) => {
        const data = response.data;
        const lat = data.capitalInfo.latlng[0];
        const lon = data.capitalInfo.latlng[1];

        setCountryData(data);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
          )
          .then((response) => {
            setWeatherData(response.data);
          });
      });
  }, [matches]);

  function findResults(query) {
    if (!query) {
      setMatches([]);
      return;
    }

    setMatches(
      countryNames.current.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  return (
    <>
      <p>
        find countries{' '}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            findResults(e.target.value);
          }}
        />
      </p>
      {(() => {
        if (matches.length > 10) {
          return <p>Too many matches, specify another filter</p>;
        }

        if (matches.length === 1) {
          return null;
        }

        return (
          <>
            {matches.map((match) => (
              <div
                key={match}
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <p>{match}</p>
                <button
                  onClick={() => {
                    setMatches([match]);
                    setQuery('');
                  }}
                >
                  Show
                </button>
              </div>
            ))}
          </>
        );
      })()}
      {(() => {
        if (countryData) {
          return (
            <>
              <h1>{countryData.name.common}</h1>
              <p>capital {countryData.capital}</p>
              <p>area {countryData.area}</p>
              <h3>languages:</h3>
              <ul>
                {Object.values(countryData.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img
                src={countryData.flags.png}
                alt={`Flag of ${countryData.name.common}`}
              />
            </>
          );
        }
      })()}
      {(() => {
        if (weatherData) {
          return (
            <>
              <h2>Weather in {countryData.capital[0]}</h2>
              <p>temperate {weatherData.main.temp} Celsius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather.description}
              />
              <p>wind {weatherData.wind.speed} m/s</p>
            </>
          );
        }
      })()}
    </>
  );
}

export default App;
