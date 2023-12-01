import { useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import Draggable from "../../components/TestDND/Draggable"
import Droppable from "../../components/TestDND/Droppable"
import { useState } from 'react';
import Board from '../../components/Board/Board';

const TestPage = () => {
    const cards = [
        {
            "id": 1,
            "name": "Smartphone",
            "co2": "18kg",
            "img": "./assets/smartphone.svg"
        },
        {
            "id": 2,
            "name": "Jeans",
            "co2": "22kg",
            "img": "./assets/jeans.svg"
        },
        {
            "id": 3,
            "name": "Cotton T-shirt",
            "co2": "6kg",
            "img": "./assets/"
        }
    ];

    // State to manage draggable cards
    const [draggableCards, setDraggableCards] = useState([]);

    // Function to handle drag end event
    const handleDragEnd = (event) => {
        const { over, active } = event;

        // If a draggable card is dropped over a droppable area
        if (over && active) {
            const activeId = Number(active.id);

            // Filter out the dragged card from draggableCards
            const updatedDraggableCards = draggableCards.filter(card => card.id !== activeId);

            // Update the draggableCards state
            setDraggableCards(updatedDraggableCards);
        }
    };
    console.log("Draggable", draggableCards)
    console.log("Draggable", draggableCards)
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Droppable>

            </Droppable>
            {cards.map(({ id, name, co2, img }) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Draggable key={id} id={id.toString()} co2={co2} name={name} img={img} draggableCards={draggableCards}
                    setDraggableCards={setDraggableCards}>
                    {name}
                </Draggable>
            ))}
        </DndContext>
    );

    // function handleDragEnd(event) {
    //     const { over } = event;
    //     if(over === true) {
    //         parent === id ? 
    //     }
    //     // If the item is dropped over a container, set it as the parent
    //     // otherwise reset the parent to `null`
    //     setParent(over ? over.id : null);
    // }
};

export default TestPage;