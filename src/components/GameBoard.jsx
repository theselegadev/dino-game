import dino from '../assets/dinosaur.gif'
import mosca from '../assets/mosca.webp'
import arbusto from '../assets/arbusto.png'
import egg from '../assets/egg.png'
import clouds from '../assets/clouds.webp'
import './GameBoard.css'
import {useEffect, useRef, useState } from 'react'

const GameBoard = () => {
    const [isJump,setIsJump] = useState(false)
    const [showMosca, setShowMosca] = useState(false)
    const [animateArbusto,setAnimateArbusto] = useState(true)
    const [loser,setLoser] = useState(false)
    const [score,setScore] = useState(0)
    const arbustoRef = useRef(null)
    const dinoRef = useRef(null)
    const moscaRef = useRef(null)
    
    const renderMosca = ()=>{
        const arbustoPosition = arbustoRef.current.getBoundingClientRect();
        const dinoPosition = dinoRef.current.getBoundingClientRect();

        if(arbustoPosition.right <= dinoPosition.right + 500 && score > 1000){
            const randomNumber = Math.floor(Math.random() * 10) + 1;

            if(randomNumber === 4){
                setShowMosca(true)
    
                setTimeout(()=>{
                    setShowMosca(false)
                },1500)
            }
        }
    }

    const loserImpact = () =>{
        const dinoRect = dinoRef.current.getBoundingClientRect();
        const arbustoRect = arbustoRef.current.getBoundingClientRect();
        const arbustoRight = window.getComputedStyle(arbustoRef.current).right
        const moscaRect = moscaRef.current.getBoundingClientRect()

        const arbustoHitbox = {
            top: arbustoRect.top + 60,
            left: arbustoRect.left + 60,
            bottom: arbustoRect.bottom, 
            right: arbustoRect.right - 60 
        }

        const moscaHitbox = {
            top: moscaRect.top + 100,
            left: moscaRect.left + 100,
            bottom: moscaRect.bottom,
            right: moscaRect.right - 100
        }

        const collidedMosca = 
            dinoRect.left < moscaHitbox.right &&
            dinoRect.right > moscaHitbox.left &&
            dinoRect.top < moscaHitbox.bottom &&
            dinoRect.bottom > moscaHitbox.top

        const collidedArbusto =
            dinoRect.left < arbustoHitbox.right &&
            dinoRect.right > arbustoHitbox.left &&
            dinoRect.top < arbustoHitbox.bottom &&
            dinoRect.bottom > arbustoHitbox.top

        if (collidedArbusto || collidedMosca){
            dinoRef.current.src = egg;
            setAnimateArbusto(false)
            setShowMosca(false)
            setLoser(true)
            arbustoRef.current.style.right = arbustoRight
        }
    }

    useEffect(()=>{
        const myInterval = setInterval(()=>{
            loserImpact()
            renderMosca()
            
            if(!loser){
                setScore(prev => prev + 10)
            }
        },100)
        return () => clearInterval(myInterval)
    },[loser,score])

    const jump = (event)=>{
        if(event.code === 'Space' && !loser){
            setIsJump(true)

            setTimeout(()=>{
                setIsJump(false)
            },500)
        }
    }

  return (
    <div className="gameboard" tabIndex={0} onKeyDown={jump}>
        <div className='score'>
            <p>Pontos: {score}</p>
            <p>Melhor score:</p>
        </div>
        <img src={clouds} alt="" className='clouds'/>
        <img src={dino} alt="" className={isJump ? 'dino jumpDino' : 'dino'} ref={dinoRef}/>
        <img src={mosca} alt="" className={showMosca ? 'mosca showMosca' : 'mosca'} ref={moscaRef}/>
        <img src={arbusto} alt="" className={animateArbusto ? 'arbusto animateArbusto' : 'arbusto'} ref={arbustoRef}/>
    </div>
  )
}

export default GameBoard