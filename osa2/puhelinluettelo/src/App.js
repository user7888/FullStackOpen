import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div> name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
           number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
        <div key={person.name}>
          <Numbers name={person.name} number={person.number}/>
        </div>)
        }
    </div>
  )
}

const Numbers = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

export default App
