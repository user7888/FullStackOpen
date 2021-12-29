import ReactDOM from 'react-dom'
import App from './App.js'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

// mitähän täälä tapahtuu? setPersons..
axios
  .get('http://localhost:3001/persons')
  .then(response => {
      const notes = response.data
      console.log('Promise fulfilled', notes)
//      setPersons(response.data)
})

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
