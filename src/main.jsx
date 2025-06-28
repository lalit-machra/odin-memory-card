import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { default as Characters } from './components/characters.jsx'

// console.log(rearrangeArr([2, 3, 5, 6, 8]));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Characters></Characters>
  </StrictMode>
)