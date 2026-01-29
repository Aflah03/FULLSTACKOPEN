import axios from "axios";
import noteService from './services/notes'
import { useState, useEffect } from "react";
import Note from "./components/Note"
import Notification from "./components/Notifications";
import Footer from './components/Footer'


const App = (props)=>{
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(' a new note.. ')
  const [showAll, setShowALl] = useState(true)  
  const [errorMessage, setErrorMessage] = useState('some error happend....')

  const hook = ()=>{
  console.log('effect');
    noteService.getAll().then(response=>{
    console.log('promise fulfilled');
    setNotes(response.data)
    })
  }
 useEffect(hook, [])
  console.log('render', notes.length, 'notes');
 

 const toggleImportanceOf = (id)=>{
  const url = `http://localhost:3001/notes/${id}`
  const note  = notes.find(n => n.id === id)
  const changedNote = {...note, important: !note.important}
  axios.put(url, changedNote)
  .then( response =>{
    const newFullNotes = notes.map(note => note.id === id ? response.data : note)
    console.log(newFullNotes);
    setNotes(newFullNotes)
  }).catch(error =>{
    setErrorMessage(`Note ${note.content} as alrady removed from server`)
    setTimeout(()=>{
      setErrorMessage(null)
    }, 5000)
    setNotes(notes.filter(n=> n.id !== id))
  })
  
  
 } 

  const addNote = (event)=>{
    event.preventDefault()
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5
    }
    //its better to let server handle the id for our resource 
    axios
      .post('http://localhost:3001/notes', noteObj)
      .then (response=>{
        console.log(response);
        setNotes(notes.concat(response.data))
        setNewNote('')
        
      })
    // setNotes(notes.concat(noteObj))
        // setNewNote('')
  }
  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter(note=> note.important === true)
  console.log(notes);
  
  return (
    <>
    <h1>Notes</h1>
    <Notification message={errorMessage}/>
      <ul>
      {/* {notes.map(note =>{
        if(note.important ===true){
          return <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)}></Note>
        }
      })} */}
      {notesToShow.map( note=>{
       return  <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
      })}
      </ul>
      <button onClick={()=> setShowALl(!showAll)}>{showAll? "important" : "all" }</button>
      <form onSubmit={addNote}>
        <input value={newNote}  onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </>
  )
}

export default App