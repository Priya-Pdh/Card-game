import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Lottie from "lottie-react";
import footprint from "../../animations/footprint_co2.json";


const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = () => {
    navigate("/gamepage");
  };

  const style = {
    height: 220,
  };
  return (
    <>
      <div style={{ marginBottom: "-14rem" }}>
        <Lottie animationData={footprint} style={style} />
      </div>
      <div className="home-container home-page">
        <section>
          <h1 className="heading">Welcome to Footprint Flip Card Game</h1>
          <h1 className="heading">
            Play and Learn about different products impact on the environment!
          </h1>
          <button className="start-button" onClick={handleNavigation}>
            {t('start')}
          </button>
          <Link to="/instructions">
            <p className="instruction-text">{t('check_instruction')}</p>
          </Link>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Home;
