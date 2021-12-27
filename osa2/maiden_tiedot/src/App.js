import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [newSearch, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryData(response.data)
      })
  }, [])
  console.log('render', countryData.length, 'countries')

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  // haku tietokannasta:
  const filterCountries = (newSearch) => {
    console.log('Hakusana: ', newSearch)
    // if (newSearch.length === 0) {
    //  return countryData
    // }
    let countries = countryData.filter(country => 
      country.name['common'].toLowerCase().includes(newSearch.toLowerCase()))
    if (countries.length <= 10)
      return countries
    return []
  }

  return (
    <div>
      <h1>Country data</h1>
        <Filter newSearch={newSearch}
                handleChange={handleSearchChange}/>
      <div>
        <DisplayCountries filterCountries={filterCountries}
                          newSearch={newSearch}
                          countryData={countryData}/>
      </div>
        
    </div>
  )
}

const Country = (props) => {
  return (
    <p>{props.name}</p>
  )
}

const Filter = (props) => {
  return (
    <div> filter countries: <input
            value={props.newSearch}
            onChange={props.handleChange}/>
    </div>
  )
}

const DisplayCountries = (props) => {
  let countries = props.countryData.filter(country => 
    country.name['common'].toLowerCase().includes(props.newSearch.toLowerCase()))
  console.log(countries.lenght)

  if (countries.lenght < 10) {
    return (
      <div>
        Too many matches, specify an other filter
      </div>
    )
  }
  return (
    <div>
      {props.filterCountries(props.newSearch).map(country =>
      <div key={country.name['common']}>
        <Country name={country.name['common']}/>
      </div>)
    }
    </div>
  )
}

export default App