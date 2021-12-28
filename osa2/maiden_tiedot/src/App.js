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
/*
  // haku tietokannasta:
  const filterCountries = (newSearch) => {
    console.log('Hakusana: ', newSearch)
    // if (newSearch.length === 0) {
    //  return countryData
    // }
    let countries = countryData.filter(country => 
      country.name['common'].toLowerCase().includes(newSearch.toLowerCase()))
    return []
  }
*/

  return (
    <div>
      <h1>Country data</h1>
        <Filter newSearch={newSearch}
                handleChange={handleSearchChange}/>
      <div>
        <DisplayCountries 
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

const Languages = (props) => {
  return (
    <li> {props.language} </li>
  )
}

// lenght typo. Automaattinen ehdotus väärä?
// kuva: coatOfArms. png-file
const DisplayCountries = (props) => {
  let countries = props.countryData.filter(country => 
    country.name['common'].toLowerCase().includes(props.newSearch.toLowerCase()))
  console.log(countries.lenght)
  console.log('New search=', props.newSearch)
  console.log('New Search lenght=', props.newSearch.length)
// newest
// Kuinka iteroida lista ja palauttaa HTML li-elementtejä?
  if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name['common']}</h1>
          <p> capital {countries[0].capital} </p>
          <p> population {countries[0].population}</p>
        <h3> Languages </h3>
        <ul>
          {Object.entries(countries[0].languages).map( ([key, value]) =>
            <div key={value}>
            <Languages language={value}/>
            </div>)}
        </ul>
        <img src={countries[0].flags['png']}/>
      </div>
    )
  }
  if (props.newSearch.length === 0) {
    return (
      <div>
        Too many matches, specify an other filter
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify an other filter
      </div>
    )
  }
  return (
    <div>
      {countries.map(country =>
      <div key={country.name['common']}>
        <Country name={country.name['common']}/>
      </div>)
    }
    </div>
  )
}

export default App