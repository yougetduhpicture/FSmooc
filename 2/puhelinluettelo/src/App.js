import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: '040-121244' },
    { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
    { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [onSearch, setOnSearch] = useState('')

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
           <People persons={persons} onSearch={onSearch}/>
        </div>
  </div>
  )

}

export default App