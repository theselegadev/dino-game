import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Home from './components/Home'

function App() {
  const [stage,setStage] = useState("home")

  return (
    <div className='App'>
      {stage === "home" && <Home setStage={setStage}/>}
      {stage === "game" && <GameBoard/>}
    </div>
  )
}

export default App
