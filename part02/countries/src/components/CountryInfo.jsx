function CountryInfo({ countryData }) {
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
}

export default CountryInfo;
