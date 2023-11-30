import { useDraggable } from "@dnd-kit/core"

const Draggable = (props) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <>
            <div className="card" ref={setNodeRef} style={style} {...listeners} {...attributes}>
                {props.children}
            </div>
        </>
    );
};

export default Draggable;