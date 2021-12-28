import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

// hakee datan palvelimelta.
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const numberObject = {
      name: newName,
      number : newNumber
    }
    // else-rakenne / totuusarvot?
    if (isInArray(numberObject)) {
      console.log('Nimi löytyi listasta..')
      return
    }
    setPersons(persons.concat(numberObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    console.log('Event-olion kenttä', event.target.value)
    setNewName(event.target.value)
  }
  // Kun event tapahtuu, muutetaan tilaa.
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  // haun listalta tietyllä attribuutilla voi tehdä
  // myös .some metodilla. (ilman boolean-muunnosta?)
  const isInArray = (element) => {
    console.log(element.name)
    const nameFound = Boolean(persons.find(person => person.name === element.name))
    if (nameFound) {
      window.alert(`${element.name} is already added to phone book`)
      return true
    }
    return false
  }
  const displayNumbers = (newSearch) => {
    console.log('Hakusana: ', newSearch)
    if (newSearch.length === 0) {
      return persons
    }
    return persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newSearch={newSearch} handleChange={handleSearchChange}/>
      <h2>add a new</h2>
        <AddNewNumber addNumber={addNumber}
                        newName={newName}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}
                        newNumber={newNumber}/>
      <h2>Numbers</h2>
        <DisplayPhonebook displayNumbers={displayNumbers}
                          newSearch={newSearch}/>
    </div>
  )
}

const Numbers = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Filter = (props) => {
  return (
    <div> filter numbers: <input
            value={props.newSearch}
            onChange={props.handleChange}/>
    </div>
  )
}

const AddNewNumber = (props) => {
  return (
    <form onSubmit={props.addNumber}>
        <div> name: <input 
            value={props.newName}
            onChange={props.handleNameChange}/>
        </div>
        <div>
           number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const DisplayPhonebook = (props) => {
  return (
    <div>
    {props.displayNumbers(props.newSearch).map(person =>
      <div key={person.name}>
        <Numbers name={person.name} number={person.number}/>
      </div>)
    }
    </div>
  )
}

export default App
