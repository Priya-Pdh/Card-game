import { useNavigate} from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
       navigate("/gamepage");
    }
  return (
    <div className="home-container home-page">
      <section>
     <h1 className="heading">Welcome to Card Game</h1>
     <h1 className="heading">Play and Learn about products impact to environment!</h1>
     <button className="start-button" onClick={handleNavigation}>Let start</button>
     <p className="instruction-text">CHECKOUT INSTRUCTIONS</p>
     </section>
    </div>
  )
}

export default Home
