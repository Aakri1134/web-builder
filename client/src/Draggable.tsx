import React from 'react';
import {useDraggable} from '@dnd-kit/core';

interface DraggableProps {
    children: React.ReactNode;
}

export default function Draggable(props: DraggableProps): React.JSX.Element {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable',
    });
    const style: React.CSSProperties | undefined = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}