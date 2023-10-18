function Weather({ weatherData, countryData }) {
  if (weatherData) {
    return (
      <>
        <h2>
          Weather in{' '}
          {countryData.capitalInfo.latlng
            ? countryData.capital[0]
            : weatherData.name
            ? weatherData.name
            : countryData.name.common}
        </h2>
        <p>temperature {weatherData.main.temp} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather.description}
        />
        <p>wind {weatherData.wind.speed} m/s</p>
      </>
    );
  }
}

export default Weather;
