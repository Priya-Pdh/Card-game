import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import flag from "../../animations/flag.json";
import { getImagePath } from "../../assets/getImagePath";

import {
  initializeCards,
  setTopCards,
  setBottomCards,
  setDraggedCard,
  setDropzone,
  setCorrectPlacedId,
  setWrongPlacedId,
  setCorrectCount,
  setIsOpenModal,
} from "../../reducers/game";
import "./GamePage.css";

import TopCard from "../../components/TopCard/TopCard";
import BackButton from "../../components/BackButton/BackButton";
import EmissionScale from "../../components/EmissionScale/EmissionScale";

import Modal from "../../components/Modal/Modal";

import "drag-drop-touch";
import { useTranslation } from "react-i18next";
import i18next from "../../i18n";

const GamePage = () => {
  // const cards = useSelector((state) => state.game.products);

  // Select states from Redux
  const bottomCards = useSelector((state) => state.game.bottomCards);
  const topCards = useSelector((state) => state.game.topCards);
  const draggedCard = useSelector((state) => state.game.draggedCard);
  const dropzone = useSelector((state) => state.game.dropzone);
  const correctPlacedId = useSelector((state) => state.game.correctPlacedId);
  const wrongPlacedId = useSelector((state) => state.game.wrongPlacedId);
  const correctCount = useSelector((state) => state.game.correctCount);
  const isOpenModal = useSelector((state) => state.game.isOpenModal);
  const totalCards = 10; // Total number of cards
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [touchedCard, setTouchedCard] = useState(null);

  const [showDescription, setShowDescription] = useState(true);

  //Styles for animation
  const style = {
    height: 70,
  };

  useEffect(() => {
    // Dispatch the initializeCards action when the component mounts
    dispatch(initializeCards());
  }, []);

  // Function triggered when dragging starts
  const handleDragStart = (e) => {
    // Find the card being dragged based on the ID
    const card = bottomCards.find((card) => card.id == e.target.id);

    // Set the dragged card and reset dropped indicators
    dispatch(setDraggedCard(card));
    // setTimeout(() => {
    //   e.target.style.visibility = "hidden";
    // }, 1);
    dispatch(setDropzone(null));
  };

  // Function triggered when dragging over a target
  const handleDragOver = (e) => {
    //Find the card being dragged based on the divs that have a classname called "dropzone"
    if (e.target.className.includes("dropzone")) {
      dispatch(setDropzone(e.target.textContent));
      e.preventDefault();
    } else {
      dispatch(setDropzone(null));
    }
  };

  // Function triggered when dragging ends
  const handleDrop = (e) => {
    // Function for delayed sorting after a 2-second delay
    const sortTopCardsWithDelay = (cardsToSort) => {
      // Sorts the cards after a 2-second delay

      // Sort the cards by CO2 property in ascending order
      const sortedCards = cardsToSort.slice().sort((a, b) => a.co2 - b.co2);

      setTimeout(() => {
        // Update the state with the sorted cards
        dispatch(setTopCards(sortedCards));
        setTimeout(() => {
          dispatch(setCorrectPlacedId(""));
          dispatch(setWrongPlacedId([]));

          if (bottomCards.length === 1) {
            dispatch(setIsOpenModal(true));
          }
        }, 1000);
      }, 1000);
      return sortedCards;
    };

    // Check if a card is being dragged and dropped over a target
    if (draggedCard && dropzone) {
      // Determine the updated list of top cards after dragging ends
      let updatedTopCards = [
        ...topCards.slice(0, dropzone),
        draggedCard,
        ...topCards.slice(dropzone),
      ];
      // Dispatch the setTopCards action with the updatedTopCards
      dispatch(setTopCards(updatedTopCards));

      // Initiate sorting of top cards after a delay
      const sortedCards = sortTopCardsWithDelay(updatedTopCards);

      // Check if the user's placement is correct
      const isCorrectPlacement = updatedTopCards.every(
        (card, index) => card.id === sortedCards[index].id
      );

      if (isCorrectPlacement) {
        dispatch(setCorrectPlacedId(draggedCard.id));
        // Update correct count
        dispatch(setCorrectCount(correctCount + 1));
      } else {
        dispatch(setWrongPlacedId(draggedCard.id));
      }

      // Dispatch the setBottomCards action with the updated bottomCards
      dispatch(
        setBottomCards(bottomCards.filter((card) => card !== draggedCard))
      );

      // Check if it's the first time a card is being placed at the top
      if (showDescription) {
        setShowDescription(false); // Hide the description box
      }
    }
    // Reset dragged and dropped cards
    dispatch(setDraggedCard(null));
    dispatch(setDropzone(null));
  };

  // for mobile version
  const handleTouchStart = (e) => {
    const touchedId = e.target.id;
    setTouchedCard(touchedId);
    handleDragStart(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    handleDragOver(e.touches[0]);
  };

  const handleTouchEnd = (e) => {
    handleDrop(e.changedTouches[0]);
    setTouchedCard(null);
  };

  const handleRestart = () => {
    // Dispatch the initializeCards action to get a new random order
    dispatch(initializeCards());
    dispatch(setDraggedCard(null));
    dispatch(setDropzone(null));
    dispatch(setCorrectPlacedId(null)); // Reset correct placed ID
    dispatch(setWrongPlacedId([])); // Reset wrong placed IDs
    dispatch(setCorrectCount(0)); // Reset correct count
    dispatch(setIsOpenModal(false)); // Close the modal if open

    setTouchedCard(null); // Reset touched card
    setShowDescription(true);
  };

  return (
    <div className="game-page">
      <div className="rotate-device">
        <div className="phone"></div>
        <div className="message">
          <p>Please rotate your device to play the game!</p>
        </div>
      </div>
      <BackButton />
      <div className="top-section">
        <div
          className="top-item score-color score"
          style={{ alignItems: "center", margin: "0" }}
        >
          {t("score")} <Lottie animationData={flag} style={style} className="flag" />{" "}
          <span
            style={{ alignSelf: "center" }}
          >{`${correctCount}/${totalCards}`}</span>
        </div>
      </div>
      <EmissionScale />
      <div
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="board-container"
        >
          {topCards.map((card, index) => (
            <React.Fragment key={`${card.name}-${index}`}>
              <div
                className={`dropzone ${dropzone == index ? "selected" : ""}`}
              >
                {index}
              </div>
              <TopCard
                key={card.id}
                card={card}
                getImagePath={getImagePath}
                color={
                  card.id == correctPlacedId
                    ? "green"
                    : card.id == wrongPlacedId
                    ? "red"
                    : "default"
                }
              />
              {showDescription && (
                <div
                  className={`dropzone ${
                    topCards.length == dropzone ? "selected" : ""
                  }`}
                >
                  {topCards.length}
                </div>
              )}
              {showDescription && (
                <div className="description-container">
                  {topCards.map((card) => (
                    <div key={card.id} className="description-box top-description-box">
                      <p className="description">{t(card.description)}</p>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          {!showDescription && (
            <div
              className={`dropzone ${
                topCards.length == dropzone ? "selected" : ""
              }`}
            >
              {topCards.length}
            </div>
          )}
        </div>
        <div className="card_and_description_container">
          <div className="bottom-container">
            <div className="deck-container">
              {bottomCards.map((card, index, array) => (
                <div
                  {...(index === array.length - 1 ? { draggable: true } : {})}
                  id={card.id}
                  key={`${card.id}-${index}`}
                  className={`bottom-cards card-container ${
                    index === array.length - 1 ? "current-card" : ""
                  }`}
                  style={{
                    position: "absolute",
                    marginLeft: `${index * 5}px`,
                    marginTop: `${index * 5}px`,
                  }}
                >
                  <p className="card-heading">{t(card.name)}</p>
                  <img draggable={false} src={getImagePath(card.img)} />

                  {card.hidden ? (
                    <p className="card-text" id="co_text">
                      CO₂ <span>?</span>
                    </p>
                  ) : (
                    <p className="card-text carbon">{card.co2}</p>
                  )}
                </div>
              ))}
            </div>
            {bottomCards.length === 0 && (
              <button className="restartBtn" onClick={handleRestart}>
                {t("restart")}
              </button>
            )}
            <div className="description-container">
              {bottomCards.map((card) => (
                <div key={card.id} className="description-box">
                  <p className="description">{t(card.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          setIsOpen={() => dispatch(setIsOpenModal(false))}
          correctCount={correctCount}
          totalCards={totalCards}
        />
      )}
    </div>
  );
};

export default GamePage;
