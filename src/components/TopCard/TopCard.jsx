import "./TopCard.css";
import { getImagePath } from "../../assets/getImagePath";
import { useTranslation } from "react-i18next";

const TopCard = ({ card, color }) => {
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
    <p className="top-card-heading">{t(card.name)}</p>
    <img className="top-image" draggable={false} src={getImagePath(card.img)} alt={card.name} />
    <p className="top-card-text">{card.co2} kg</p>
  </div>

 ) 

};

export default TopCard;
