import React, { useEffect } from 'react'
import NewJoke from './components/NewJoke'
import Jokes from './components/Jokes'


const App = () => {
  return (
    <div>
      <h2>Jokes</h2>
      <Jokes />
      <NewJoke />
    </div>
  )
}

export default App