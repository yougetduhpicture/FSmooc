import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import communicationService from './services/Communication'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([ ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [onSearch, setOnSearch] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const hook = () => {
    communicationService
      .getAll()
      .then(initialPeople => {
        console.log('promise fulfilled')
          setPersons(initialPeople)
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

//  HANDLE CLICK / DELETE PERSON
const handleClick = (id) => {
   console.log(persons.findIndex(person => person.id ===id))
  if (window.confirm(`Do you really want to delete ${persons.filter(person => person.id === id)[0].name}`)) {
    communicationService
      .remove(id)
      .then(response => {console.log(response)})
      .then(() => {setPersons(persons.filter(person => person.id !== id))})
      .then(() => {
        setMessage(`${persons.find(person => person.id ===id).name} has been deleted.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
     } )
  }
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
              id: (Math.max(persons.map(person => person.id)) + 1),
              number: newNumber,
            }

          communicationService
            .create(personObject)
            .then(returnedPeople => {
              console.log(returnedPeople)
              setPersons(persons.concat(returnedPeople))
            })
            .then(() => {
              setMessage(`${newName} has been added.`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
           } )
           
// CHANGE NUMBER
    } else if (persons.some(person => person.name === newName)){
        if (window.confirm(`${persons.filter(person => person.name === newName)[0].name} has already been added to the phonebook. Would you like to replace the old number with the new one?`)){
          
          const person = persons.find(person => person.name === newName)

          const changedPerson = {
            name: newName,
            id: person.id,
            number: newNumber,
          }
          console.log(person)
          communicationService
          .update(persons.filter(person => person.name === newName)[0].id, changedPerson)
          .then(returnedPerson => {setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))})
          .then(() => {
            setMessage(`${person.name}'s number has been changed.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
         } )
          .catch(() => {
            setErrorMessage(
              `Error 404: '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== changedPerson.id))
          })
        }

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
      <Notification message={errorMessage} className={"error"}/>
      <Notification message={message} className={"confirmation"}/>
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
      <h2>Numbers:</h2>
        <div>
           <People persons={persons} 
                   onSearch={onSearch}
                   handleClick={handleClick}
                  />
        </div>
  </div>
  )

}

export default App