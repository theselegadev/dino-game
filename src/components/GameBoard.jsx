import dino from '../assets/dinosaur.gif'
import mosca from '../assets/mosca.webp'
import arbusto from '../assets/arbusto.png'
import './GameBoard.css'
import { useEffect, useRef, useState } from 'react'

const GameBoard = () => {
    const [isJump,setIsJump] = useState(false)
    const [showMosca, setShowMosca] = useState(false)
    const arbustoRef = useRef(null)
    const dinoRef = useRef(null)
    
    const renderMosca = ()=>{
        if(arbustoRef.current && dinoRef.current){
            const arbustoPosition = arbustoRef.current.getBoundingClientRect();
            const dinoPosition = dinoRef.current.getBoundingClientRect();

            if(arbustoPosition.right < dinoPosition.right){
                const randomNumber = Math.floor(Math.random() * 10) + 1;

                if(randomNumber === 4){
                    setShowMosca(true)

                    setTimeout(()=>{
                        setShowMosca(false)
                    },2000)
                }
            }
        }
    }

    useEffect(()=>{
        const myInterval = setInterval(()=>{
            renderMosca()
        },100)

        return () => clearInterval(myInterval)
    },[])

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
        <img src={dino} alt="" className={isJump ? 'dino jumpDino' : 'dino'} ref={dinoRef}/>
        <img src={mosca} alt="" className={showMosca ? 'mosca showMosca' : 'mosca'}/>
        <img src={arbusto} alt="" className='arbusto' ref={arbustoRef}/>
    </div>
  )
}

export default GameBoard