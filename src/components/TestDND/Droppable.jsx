import { useDroppable } from '@dnd-kit/core';
import Board from '../Board/Board';

const Droppable = ({ children }) => {

    // Hook to define a droppable area
    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });

    // Style to change color when an item is dragged over
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div className="droppable" ref={setNodeRef} style={style}>
            <h3 style={{ color: isOver ? 'green' : 'inherit' }}>Drop here</h3>
            {children}
        </div>
    );
}

export default Droppable;