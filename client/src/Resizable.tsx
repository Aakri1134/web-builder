import { useState, useRef, useEffect } from "react"
import ContextModal from "./components/ContextModal"
import Heading from "./components/Heading"

export default function ResizableCard() {
  const [width, setWidth] = useState(300) // initial width
  const isDragging = useRef(false)

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [positionModal, setPositionModal] = useState<[string, string]>([
    "0",
    "0",
  ])

  const handleMouseDown = () => {
    isDragging.current = true
  }

  interface MouseMoveEvent extends MouseEvent {}

  const handleMouseMoveDiagonal = (e: MouseMoveEvent) => {
    if (isDragging.current) {
      setWidth(Math.max(150, e.clientX)) // minimum width = 150px
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const modalVisibilityToggle = () => {
    setIsVisible((c) => !c)
  }
  const rightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible((x) => !x)
    setPositionModal([e.pageX.toString(), e.pageY.toString()])
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveDiagonal)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveDiagonal)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div style={{ display: "flex", height: "300px" }}>
      {isVisible && (
        <ContextModal
          style={{
            left: `${positionModal[0]}px`,
            top: `${positionModal[1]}px`,
          }}
          visibilityToggle={modalVisibilityToggle}
          option1={() => {
            alert("He;;p")
          }}
        />
      )}
      <div
        onContextMenu={rightClick}
        style={{
          width: `${width}px`,
          background: "#f4f4f4",
          padding: "16px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          maxWidth: "1200px",
          minWidth: "300px",
        }}
      >
        <Heading initialValue="ResizableCard" />
        <p>You can resize this card by dragging the handle.</p>
      </div>
      <div
        onMouseDown={handleMouseDown}
        style={{
          cursor: "col-resize",
          width: "10px",
          background: "rgba(0,0,0,0)",
        }}
      />
    </div>
  )
}
