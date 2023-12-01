import { useDraggable } from "@dnd-kit/core"

const Draggable = ({ id, name, co2, img, draggableCards, setDraggableCards }) => {

    // Hook to enable draggable functionality
    const { attributes, listeners, isDragging, transform, transition, setNodeRef } = useDraggable({
        id: id.toString(),
        onDragEnd: () => {
            // When drag ends, filter out the dragged card from draggableCards
            const updatedDraggableCards = draggableCards.filter(card => card.id !== Number(id));
            // Update draggableCards state to remove the dragged card
            setDraggableCards(updatedDraggableCards);
        }
    });
    const style = {
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab', // Change cursor when dragging
    };


    const handleDragEnd = () => {
        const updatedDraggableCards = draggableCards.filter(card => card.id !== Number(id));
        setDraggableCards(updatedDraggableCards);
    };


    return (
        <div className="card" ref={setNodeRef} style={style} {...listeners} {...attributes} onDragEnd={handleDragEnd}>
            {id.children}
            <h4>{name}</h4>
            <p>{co2}</p>
        </div>
    );
};

export default Draggable;