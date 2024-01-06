import { useState, useEffect } from 'react'
import axios from 'axios'

import Input from './components/Input'
import CountryInfo from './components/CountryInfo'
import Content from './components/Content'
import Button from './components/Button'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  //WeatherMap key that actually works: 665ecd56dfc08dbb50feb8b8f5034e28
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [apiAddress, setApiAddress] = useState ('')
  
  const [render, setRender] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [onSearch, setOnSearch] = useState('')

  //GET COUNTRIES
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
        })
      }
  useEffect(hook,[])

  //GET WEATHER
  const hook2 = () => {
    console.log('effect')
      axios
        .get(apiAddress)
        .then(response => {
          console.log('promise fulfilled')
          setWeather(response.data)
        }
    )
  }
  useEffect(hook2, [apiAddress])


  //HANDLE CLICK
  const handleClick = (name) => {
    setOnSearch(name)
    console.log(name)
  }

  //HANDLE SEARCH
  const handleSearch = (event) => {
        event.preventDefault()
        setOnSearch(event.target.value)
    }
  

  //FILTER
  useEffect(() => {
    setCountriesFiltered(countries.filter(country => {
      return country.name.common.toUpperCase().includes(onSearch.toUpperCase())
    }))
  }, [onSearch])

  //WEATHER CHANGE
  useEffect(() => {
    setRender(
      <div>
        {countriesFiltered.map(country => {
              console.log(weather)
              return <div>
                <CountryInfo country={country} weather={weather}/>
              </div>
          }
        )}
      </div>
    )
  },[weather])
    
  //CHOOSE RENDER
  useEffect(() => {
          if (countriesFiltered.length === 1){
            setApiAddress(`https://api.openweathermap.org/data/2.5/weather?lat=${countriesFiltered[0].capitalInfo.latlng[0]}&lon=${countriesFiltered[0].capitalInfo.latlng[1]}&units=metric&APPID=${api_key}`)
          } else if (countriesFiltered.length <= 10 && countriesFiltered.length > 1){
            setRender(
              <div>
                <ul>
                      {countriesFiltered.map(country =>
                      <li key={country.name.official}>{country.name.common}<Button handleClick={handleClick} name={country.name.common} text={'SHOW'}/></li>
                      )}
                </ul>
            </div>
            )
          } else {
            setRender(
            <div>
              <p>Too many countries match the filter. Write more in to the field</p>
              
            </div>
            
            )
        }
  }, [countriesFiltered])


  return (
    <div>
        <Input value={onSearch} handleSearch={handleSearch}/>
        <Content render={render}/>
    </div>
  )
}

export default App;
