import React, { useRef, useState, useEffect } from "react";

const AdjustableDiv = ({children} : {children : React.ReactNode}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  // Start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === resizeRef.current) return; // skip if resizing
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Start resizing
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  // Stop dragging/resizing
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Move or resize div
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }

    if (isResizing) {
      const newWidth = e.clientX - position.x;
      const newHeight = e.clientY - position.y;
      setSize({
        width: Math.max(newWidth, 300),
        height: Math.max(newHeight, 600),
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      ref={divRef}
      onMouseDown={handleMouseDown}
      style={{
        containerType : "inline-size",
        position: "relative",
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        minWidth : "300px",
        minHeight : "600px",
        border: "2px solid black",
        cursor: isDragging ? "grabbing" : "grab",
        overflow: "scroll",
      }}
    >
      {children}
      <div
        ref={resizeRef}
        onMouseDown={handleResizeMouseDown}
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          bottom: 0,
          right: 0,
          borderRadius : 3,
          backgroundColor: "darkblue",
          cursor: "nwse-resize",
        }}
      />
    </div>
  );
};

export default AdjustableDiv;
