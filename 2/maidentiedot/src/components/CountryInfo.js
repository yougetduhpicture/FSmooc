const CountryInfo = (props) => {
    return(
        <div>
          <h1 key={props.country.car.cca2}>{props.country.name.common}</h1>
          <p>Capital: {props.country.capital} <br/>
              Area: {props.country.area}
          </p>
          <p>Languages: </p>
          <ul>
            {Object.values(props.country.languages).map(language => {
              return <li key={language}>{language}</li>
            })}
          </ul>
          <img src={props.country.flags.png} alt='Flag'></img>
          <h2>Weather in {props.country.capital}</h2>
          <p>Temperature: {props.weather.main.temp} °C</p>
          <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt='Weather Icon'></img>
          <p>Wind: {props.weather.wind.speed} m/s</p>
      </div>
    )
}
export default CountryInfo