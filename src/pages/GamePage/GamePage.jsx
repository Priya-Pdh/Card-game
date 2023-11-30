import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useSelector, useDispatch } from 'react-redux';
import { moveCard } from '../../reducers/game';
import Board from '../../components/Board/Board';
import DraggableCard from '../../components/DraggableCard/DraggableCard';
import "./GamePage.css";
import BackButton from '../../components/BackButton/BackButton';

const GamePage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.game.products);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set the initial currentIndex to a random value
    setCurrentIndex(() => Math.floor(Math.random() * products.length));
  }, [products]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over) {
      dispatch(moveCard({ from: parseInt(active.id, 10), to: parseInt(over.id, 10) }));
      
      //Note: we can see if it will work Set the next card index to a random value
      setCurrentIndex(() => Math.floor(Math.random() * products.length));
    }
  };

  const randomizeCard = () => {
    // Set the next card index to a random value
    setCurrentIndex(() => Math.floor(Math.random() * products.length));
  };

  return (
    <>
    <div className='game-page'>
      <BackButton />
      <Board />
      <DndContext onDragEnd={handleDragEnd}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            {products.length > 0 && (
              <>
               {products[currentIndex].id !== 9 && (
                 <DraggableCard
                 key={products[currentIndex].id}
                 id={products[currentIndex].id}
                 name={products[currentIndex].name}
                 co2={products[currentIndex].co2}
                 img={products[currentIndex].img}
               />
               )}
              </>
            
            )}
          </div>
          
          <button onClick={randomizeCard}>Randomize Card</button>
        </div>
      </DndContext>
      </div>
    </>
  );
};

export default GamePage;
