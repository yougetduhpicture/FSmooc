import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

const App = () => {
  const [persons, setPersons] = useState([ ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [onSearch, setOnSearch] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


// NAME CHANGE HANDLING
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

// NUMBER CHANGE HANDLING
const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

// SEARCH INPUT HANDLING
const handleSearch = (event) => {
    setOnSearch(event.target.value)
}

  // ADD PERSON
  const addPerson = (event) => {
    event.preventDefault()
      if (newName.length === 0 | newNumber.length === 0){
         alert(`Fill in the both fields`)
      } else if ((persons.some(person => person.name === newName)
       || persons.some(person => person.number === newNumber)) === false) {
        
            const personObject = {
              name: newName,
              id: (persons.length + 1),
              number: newNumber,
            }

            setPersons(persons.concat(personObject))
    } else {
            alert(`${newName} has already been added to phonebook`)
            console.log(persons.some(person => person.name === newName))
    }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
            <Filter onSearch={onSearch} handleSearch={handleSearch}/>
        </div>
      <h2>Add A New Person:</h2>
        <div>
            <Form addPerson={addPerson} 
                  handleNameChange={handleNameChange} 
                  newName={newName}
                  handleNumberChange={handleNumberChange}
                  newNumber={newNumber}
                  />
        </div>
      <h2>Numbers</h2>
        <div>
           <People persons={persons} 
                  onSearch={onSearch}/>
        </div>
  </div>
  )

}

export default App