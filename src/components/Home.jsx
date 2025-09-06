import dino from "../assets/dinosaur.gif"
import "./Home.css"

const Home = ({setStage}) => {
  return (
    <div className="home">
        <h1>Dino Game</h1>
        <img src={dino} alt="" />
        <button className="btn-play" onClick={()=>(setStage("game"))}>Pressione para jogar</button>
    </div>
  )
}

export default Home