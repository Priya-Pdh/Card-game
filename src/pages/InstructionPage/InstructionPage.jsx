import { useNavigate } from "react-router-dom";
import "./InstructionPage.css";
import { useTranslation } from "react-i18next";

const InstructionPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const playGame = () => {
    navigate("/gamepage");
  };

  return (
    <>
      <div className="instructions">
        <h1 className="instruction-heading">{t("instr")}</h1>
        <ol>
          <li>{t("step_1")}</li>
          <li>{t("step_2")}</li>
          <li>{t("step_3")}</li>
        </ol>
        <p className="note">{t("note")}</p>
        <p className="note">{t("disclaimer")}</p>
        <button className="start-button" onClick={playGame}>
          {t("play_button")}
        </button>
      </div>
    </>
  );
};

export default InstructionPage;
