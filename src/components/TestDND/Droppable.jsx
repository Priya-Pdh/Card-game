import { useDroppable } from '@dnd-kit/core';
import Board from '../Board/Board';

const Droppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'blue' : undefined,
    };


    return (
        <>
            <Board />
            <div ref={setNodeRef} style={style}>
                {props.children}
            </div>
        </>
    );
}

export default Droppable;