import React from 'react';
import { useDraggable, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import "./DraggableCard.css";

const DraggableCard = ({ id, name, co2, img }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                width: '20%',
                transform: CSS.Transform.toString(transform),
                transition,
                cursor: 'grab',
                
            }}
            {...attributes}
            {...listeners}
            className='draggable-card'
        >
            <p>{name}</p>
            <p>{co2}</p>
            <img src={img} alt={name} style={{ width: '100%' }} />
        </div>
    );
};

export default DraggableCard;
