import PlayedCard from "../PlayedCard/PlayedCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DraggableCard from "../DraggableCard/DraggableCard";

const Board = () => {
  const cards = useSelector((state) => state.game.products);
  //This state represents an array of cards that is on the board. The initial state is the first randomized card always displayed in the beginning
  // const [playedCards, setPlayedCards] = useState([{
  //     "id": "1",
  //     "name": "Smartphone",
  //     "co2": "18kg",
  //     "img": "./assets/smartphone.svg"
  // },
  // {
  //     "id": "2",
  //     "name": "Jeans",
  //     "co2": "22kg",
  //     "img": "./assets/jeans.svg"
  // },
  // {
  //     "id": "3",
  //     "name": "Cotton T-shirt",
  //     "co2": "6kg",
  //     "img": "./assets/"
  // }
  // ]);
  const [playedCards, setPlayedCards] = useState(cards);

  //setting the initial played card index to random value
  // const [playedCardsIndex, setPlayedCardsIndex] = useState(0);

  // useEffect(() => {
  //     setPlayedCardsIndex(() => Math.floor(Math.random() * playedCards.length))
  // }, [playedCards])

  const handleDragEnd = (event) => {
    //Event to occur when card is released. Tell if it's correct or wrong and sort the cards. The "onDragEnd" provides an event
    console.log("Drag and called");
    const { active, over } = event;
    console.log("ACTIVE:" + active.id);
    console.log("OVER:" + over.id);

    const oldIndex = playedCards.findIndex((card) => card.id === active.id);
    const newIndex = playedCards.findIndex((card) => card.id === over.id);
    console.log("Old Index:", oldIndex);
    console.log("New Index:", newIndex);

    const updatedGameDeck = arrayMove(playedCards, oldIndex, newIndex);

    setPlayedCards(updatedGameDeck);
  };
  // if (active.id !== over.id) {
  //   setPlayedCards((card) => {
  //     const activeIndex = items.indexOf(active.id)
  //     const overIndex = items.indexOf(over.id)
  //     console.log(arrayMove(items, activeIndex, overIndex));

  //     return arrayMove(items, activeIndex, overIndex)
  //     //items: [2, 3, 1] 0 -> 2
  //     // [1, 2, 3] oldIndex: 0 newIndex: 2 -> [2, 3, 1]
  //   })
  // }

  console.log("All cards:", playedCards);
  const filteredCards = playedCards.filter((card) => card.id === 9);
  console.log("Filtered cards:", filteredCards);

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <h1>GamePage</h1>
        <div className="card-board">
          <SortableContext
            items={playedCards}
            strategy={horizontalListSortingStrategy}
          >
            {/* We need components that use the useSortable hook */}
            {/* {playedCards.map((card) => (
                            <PlayedCard key={card.name} card={card} />
                        ))} */}
            {filteredCards.map((filteredCard) => (
              <PlayedCard key={filteredCard.id} card={filteredCard} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default Board;
