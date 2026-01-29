import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// promise.then(response =>{
//   console.log(response);
  
// })

const root = document.getElementById("root");
createRoot(root).render(<App />)