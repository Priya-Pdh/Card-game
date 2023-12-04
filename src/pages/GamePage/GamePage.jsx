import { useSelector } from "react-redux";
import { useState } from "react";
import "./GamePage.css";
import smartphoneImage from "../../assets/mobile.svg";
import jeansImage from "../../assets/jeans.svg";

import bicycleImage from "../../assets/bicycle.svg";
import busImage from "../../assets/bus.svg";
import carImage from "../../assets/car.svg";
import flightImage from "../../assets/flight.svg";
import meatImage from "../../assets/meat.svg";
import sneakersImage from "../../assets/sneakers.svg";
import tShirtImage from "../../assets/tShirt.svg";
import trainImage from "../../assets/train.svg";
import defaultImage from "../../assets/qmark.svg"; // Note: put a question mark image here later
import TopCard from "../../components/TopCard/TopCard";
import InvisibleCard from "../../components/InvisibleCard/InvisibleCard";
import BackButton from "../../components/BackButton/BackButton";

const GamePage = () => {
  // Initialize state variables
  const cards = useSelector((state) => state.game.products);

   //random cards
   const randomCards = [...cards].sort(() => Math.random() - 0.5);

   const [bottomCards, setBottomCards] = useState(randomCards.slice(1, 10));
   const [topCards, setTopCards] = useState(randomCards.slice(0, 1));

  const [draggedCard, setDraggedCard] = useState();
  const [droppedCard, setDroppedCard] = useState();
  const [droppedLast, setDroppedLast] = useState(false);

  const [touchedCard, setTouchedCard] = useState(null);

  // Function to retrieve image path based on card's image
  const getImagePath = (img) => {
    switch (img) {
      case "../assets/smartphone.svg":
        return smartphoneImage;
      case "../assets/jeans.svg":
        return jeansImage;
      case "../assets/bicycle.svg":
        return bicycleImage;
      case "../assets/bus.svg":
        return busImage;
      case "../assets/car.svg":
        return carImage;
      case "../assets/flight.svg":
        return flightImage;
      case "../assets/sneakers.svg":
        return sneakersImage;
      case "../assets/meat.svg":
        return meatImage;
      case "../assets/train.svg":
        return trainImage;
      case "../assets/tShirt.svg":
        return tShirtImage;
      default:
        return defaultImage;
    }
  };

  // Function triggered when dragging starts
  const handleDragStart = (e) => {
    // Find the card being dragged based on the ID
    const card = bottomCards.find((card) => card.id == e.target.id);
    console.log("Drag Start:", card);
    // Set the dragged card and reset dropped indicators
    setDraggedCard(card);
    setDroppedCard(null);
    setDroppedLast(false);
  };

  // Function triggered when dragging over a target
  const handleDragOver = (e) => {
    // Find the card being dragged over based on the ID
    const card = topCards.find((card) => card.id == e.target.id);
    console.log("Drag over:", e.target.id);
    // Set the dropped card and update indicators
    setDroppedCard(card);
    setDroppedLast(e.target.id == "invisible");
    e.preventDefault();
  };

  // Function triggered when dragging ends
  const handleDragEnd = (e) => {
    // console.log("END", e.target.className);

    // Function for delayed sorting after a 2-second delay
    const sortTopCardsWithDelay = (cardsToSort) => {
      // Sorts the cards after a 2-second delay
      setTimeout(() => {
        // Sort the cards by CO2 property in ascending order
        const sortedCards = cardsToSort.slice().sort((a, b) => a.co2 - b.co2);
        // Update the state with the sorted cards
        setTopCards(sortedCards);
      }, 2000); // 2-second delay before sorting
    };

    // Check if a card is being dragged and dropped over a target
    if (draggedCard && (droppedCard || droppedLast)) {
      let updatedTopCards = [];

      // Determine the updated list of top cards after dragging ends
      if (droppedLast) {
        setTopCards([...topCards, { ...draggedCard, hidden: false }]);
        // If dropped at the last position, add the card to the end
        updatedTopCards = [...topCards, draggedCard];
        // Update state immediately to display the new card
        setTopCards(updatedTopCards);
      } else {
        // Calculate the index where the card is dropped
        const i = topCards.indexOf(droppedCard);
        updatedTopCards = [
          ...topCards.slice(0, i),
          { ...draggedCard, hidden: false },
          ...topCards.slice(i),
        ];
        // Update state immediately to display the new card
        setTopCards(updatedTopCards);
      }

      // Initiate sorting of top cards after a delay
      sortTopCardsWithDelay(updatedTopCards);
      // Filter out the dragged card from bottom cards
      setBottomCards(bottomCards.filter((card) => card != draggedCard));
    }
    // Reset dragged and dropped cards
    setDraggedCard(null);
    setDroppedCard(null);
  };

  console.log("Top Card:", topCards);
  console.log("Bottom Card:", bottomCards);

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
    handleDragEnd(e.changedTouches[0]);
    setTouchedCard(null);
  };

  return (
    <div className="game-page">
      <BackButton />
      <div className="top-section">
        <p className="top-item item-color">Lowest Emission</p>
        <p className="top-item score-color">
          Score 🏁<span>0</span>
        </p>
        <p className="top-item item-color">Highest Emission</p>
      </div>
      <hr className="horizontal-line" />
      <div
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
          className="board-container"
        >
          {topCards.map((card) => (
            <TopCard
              key={card.id}
              card={card}
              droppedCard={droppedCard}
              getImagePath={getImagePath}
            />
          ))}
          <InvisibleCard droppedLast={droppedLast} />
        </div>
        <div style={{ position: "relative", margin: "5% 0 0 45%" }}>
          {bottomCards.map((card, index) => (
            <div
              draggable
              onTouchStart={(e) => handleTouchStart(e)}
              onTouchMove={(e) => handleTouchMove(e)}
              onTouchEnd={(e) => handleTouchEnd (e)}
              id={card.id}
              key={card.id}
              className="bottom-cards card card-container"
              style={{
                opacity: card.id == draggedCard?.id ? 0.2 : 1.0,
                position: "absolute",
                left: `${index * 5}px`,
                top: `${index * 5}px`,
                backgroundColor: card.id === touchedCard ? "lightgray" : "",
              }}
            >
              <p className="product-item">{card.name}</p>
              {card.hidden ? <p>CO₂ ?</p> : <p>{card.co2}</p>}
              <img src={getImagePath(card.img)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
