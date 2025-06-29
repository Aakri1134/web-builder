import {useDroppable} from '@dnd-kit/core';
import React from 'react';
import type { ReactNode } from 'react';

interface DroppableProps {
    children: ReactNode;
}

const Droppable: React.FC<DroppableProps> = (props) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style: React.CSSProperties = {
        color: isOver ? 'green' : undefined,
    };
    
    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
};

export default Droppable