import { useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import Draggable from "../../components/TestDND/Draggable"
import Droppable from "../../components/TestDND/Droppable"
import { useState } from 'react';
import Board from '../../components/Board/Board';

const TestPage = () => {
    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (

        //This is where we show the card pile and doing the logic for wich card that comes next.
        <Draggable >
            <div className='drag_item'>
                Drag me
            </div>
        </Draggable>
    );

    return (
        <>
            <div>TestPage</div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='droppable'>
                    {/* <Board>
                    {isDropped ? draggableMarkup : 'Drop here'}
                    </Board> */}
                    <Droppable>
                        {isDropped ? draggableMarkup : 'Drop here'}
                    </Droppable>
                </div>
                <div className='draggable'>
                    {/* instead of "null" we add logic to show the next card in the pile*/}
                    {!isDropped ? draggableMarkup : null}
                </div>
            </DndContext>

        </>
    );
    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    };
};

export default TestPage;