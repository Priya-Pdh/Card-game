import "./TopCard.css";
import { useTranslation } from 'react-i18next';

const TopCard = ({ card, droppedCard, getImagePath, color }) => {
  const { t } = useTranslation();
 return (
  <div
    id={card.id}
    className="top-container"
    style={{
      backgroundColor:
        color === "green" ? "green" : color === "red" ? "red" : "",
    }}
  >
    <p className="card-heading">{t(card.name)}</p>
    <img draggable={false} src={getImagePath(card.img)} alt={card.name} />
    <p className="card-text">{card.co2} kg</p>
  </div>

 ) 
};

export default TopCard;
