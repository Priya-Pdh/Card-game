import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import instructions from "../../animations/instructions.json";
import "./Instructions.css";
import { useTranslation } from 'react-i18next';

const Instructions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const playGame = () => {
    navigate("/gamepage");
  };

  const style = { height: 200 };
  return (
    <>
      <div className="instructions">
        <Lottie animationData={instructions} style={style} />
        <ol>
          <li>
           {t('step_1')}
          </li>
          <li>
          {t('step_2')}
          </li>
          <li>
          {t('step_3')}
          </li>
        </ol>
        <p>
        {t('note')}
        </p>
        <button className="start-button" onClick={playGame}>
        {t('play_button')}
        </button>
      </div>
    </>
  );
};

export default Instructions;
