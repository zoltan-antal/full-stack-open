import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import CountryInfo from './components/CountryInfo';
import Matches from './components/Matches';

function App() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = useRef(import.meta.env.VITE_API_KEY);
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
        const lat = data.capitalInfo.latlng
          ? data.capitalInfo.latlng[0]
          : data.latlng[0];
        const lon = data.capitalInfo.latlng
          ? data.capitalInfo.latlng[1]
          : data.latlng[1];

        setCountryData(data);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey.current}`
          )
          .then((response) => {
            setWeatherData(response.data);
          });
      });
  }, [matches, apiKey]);

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
      <Matches matches={matches} setMatches={setMatches} setQuery={setQuery} />
      <CountryInfo countryData={countryData} />
      <Weather weatherData={weatherData} countryData={countryData} />
    </>
  );
}

export default App;
