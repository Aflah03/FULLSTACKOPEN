import { useState } from "react";
import Note from "./components/Note"
const App = (props)=>{
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(' a new note.. ')
  const [showAll, setShowALl] = useState(true)  


  const addNote = (event)=>{
    event.preventDefault()
    const noteObj = {
      content: newNote,
      id:notes.length+1,
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(noteObj))
    setNewNote('')
  }
  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? notes : notes.filter(note=> note.important === true)
  return (
    <>
    <h1>Notes</h1>
      <ul>
      {notesToShow.map( note=>{
       return  <Note key={note.id} note={note}/>
      })}
      </ul>
      <button onClick={()=> setShowALl(!showAll)}>{showAll? "important" : "all" }</button>
      <form onSubmit={addNote}>
        <input value={newNote}  onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App