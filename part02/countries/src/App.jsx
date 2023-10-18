import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [countryData, setCountryData] = useState(null);

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
      return;
    }

    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${matches[0]}`
      )
      .then((response) => {
        setCountryData(response.data);
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
          <ul>
            {matches.map((match) => (
              <li key={match}>{match}</li>
            ))}
          </ul>
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
    </>
  );
}

export default App;
