import dino from '../assets/dinosaur.gif'
import mosca from '../assets/mosca.webp'
import arbusto from '../assets/arbusto.png'
import './GameBoard.css'
import { useState } from 'react'

const GameBoard = () => {
    const [isJump,setIsJump] = useState(false)

    const jump = (event)=>{
        if(event.code === 'Space'){
            setIsJump(true)

            setTimeout(()=>{
                setIsJump(false)
            },500)
        }
    }
  return (
    <div className="gameboard" tabIndex={0} onKeyDown={jump}>
        <img src={dino} alt="" className={isJump ? 'dino jumpDino' : 'dino'}/>
        <img src={mosca} alt="" className='mosca'/>
        <img src={arbusto} alt="" className='arbusto'/>
    </div>
  )
}

export default GameBoard