import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])  

  const handleChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleSearchTerm = (event)=>{
    const value = event.target.value
    setSearchTerm(value) // we have to do this becsuse in the slice line , search term may not get updated , as setState is async
   const MatchingContacts = value === ''? [] : (persons.filter((person)=>{
      return person.name.toLowerCase().startsWith(value.toLowerCase())
    })
  )
    setSearchResult(MatchingContacts)
}
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(newName ===''|| newNumber===''){
      alert('please fill in both fields')
      return
    }
    if(persons.some( (person)=>{
      return person.name.toLowerCase() === newName.toLowerCase()
    })){
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      return 
    }
    const newObj = {
      name: `${newName}`,
      id: persons.length+1,
      number:newNumber
    }
    setNewNumber('')
    setNewName('')
    setPersons(persons.concat(newObj)) 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchResult={searchResult} handleSearchTerm={handleSearchTerm} searchTerm={searchTerm}  />
      <h2>Add A new Contact</h2>

     <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit}  handleNumberChange={handleNumberChange} handleChange={handleChange}/> 

      <h2>Numbers</h2>

      <Persons persons={persons}/>
    <div>
    </div>
    </div>

  )
}

export default App