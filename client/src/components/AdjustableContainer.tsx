import { useDraggable } from "@dnd-kit/core"
import { useState, useRef, useCallback, useEffect } from "react"

type InputAdjustableDiv = {
  children: React.ReactNode
  style?: React.CSSProperties
  onResize?: (width: number, height: number, direction: string) => void
  ratio?: number // <--- NEW: pass zoom ratio
  pageID : string
  pageName  : string
}

export default function AdjustableContainer({
  children,
  style = {},
  onResize,
  ratio = 1,
  pageID,
  pageName
}: InputAdjustableDiv) {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>("")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: 0, height: 0 })
  const startOffset = useRef({ left: 0, top: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!containerRef.current) return

    // ✅ Use style.width/height (world units), not getBoundingClientRect()
    const cs = window.getComputedStyle(containerRef.current)
    startSize.current = {
      width: parseFloat(cs.width),
      height: parseFloat(cs.height),
    }
    startOffset.current = {
      left: parseFloat(cs.left) || 0,
      top: parseFloat(cs.top) || 0,
    }
    startPos.current = { x: e.clientX, y: e.clientY }

    setIsResizing(true)
    setResizeDirection(direction)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const deltaX = (e.clientX - startPos.current.x) / ratio // ✅ normalize
      const deltaY = (e.clientY - startPos.current.y) / ratio

      let newWidth = startSize.current.width
      let newHeight = startSize.current.height
      let newLeft = startOffset.current.left
      let newTop = startOffset.current.top

      switch (resizeDirection) {
        case "right":
          newWidth = Math.max(50, startSize.current.width + deltaX)
          break
        case "left":
          newWidth = Math.max(50, startSize.current.width - deltaX)
          newLeft = startOffset.current.left + deltaX
          break
        case "bottom":
          newHeight = Math.max(50, startSize.current.height + deltaY)
          break
        case "top":
          newHeight = Math.max(50, startSize.current.height - deltaY)
          newTop = startOffset.current.top + deltaY
          break
        case "top-left":
          newWidth = Math.max(50, startSize.current.width - deltaX)
          newLeft = startOffset.current.left + deltaX
          newHeight = Math.max(50, startSize.current.height - deltaY)
          newTop = startOffset.current.top + deltaY
          break
        case "top-right":
          newWidth = Math.max(50, startSize.current.width + deltaX)
          newHeight = Math.max(50, startSize.current.height - deltaY)
          newTop = startOffset.current.top + deltaY
          break
        case "bottom-left":
          newWidth = Math.max(50, startSize.current.width - deltaX)
          newLeft = startOffset.current.left + deltaX
          newHeight = Math.max(50, startSize.current.height + deltaY)
          break
        case "bottom-right":
          newWidth = Math.max(50, startSize.current.width + deltaX)
          newHeight = Math.max(50, startSize.current.height + deltaY)
          break
      }

      // ✅ Directly apply world size
      containerRef.current.style.width = `${newWidth}px`
      containerRef.current.style.height = `${newHeight}px`
      containerRef.current.style.left = `${newLeft}px`
      containerRef.current.style.top = `${newTop}px`

      if (onResize) {
        onResize(newWidth, newHeight, resizeDirection)
      }
    },
    [isResizing, resizeDirection, onResize, ratio]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    setResizeDirection("")
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const {setNodeRef, listeners, attributes, transform} = useDraggable({
    id : pageID
  })

  const dragstyle : React.CSSProperties= transform ? {
    transform : `translate(${transform.x}px, ${transform.y}px)`
  } : {}

  const combinedRef = useCallback((node: HTMLDivElement | null) => {
  containerRef.current = node;
  setNodeRef(node);
}, [setNodeRef]);

  return (
    <div ref={combinedRef} style={{...style, ...dragstyle}} className="group absolute">
      <h1 {...listeners} {...attributes} className=" text-white cursor-grab">{pageName}</h1>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        {/* Resize handles */}
        <div
          className="absolute right-0 h-full w-[2px] cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100 z-20"
          onMouseDown={(e) => handleMouseDown(e, "right")}
        />
        <div
          className="absolute bottom-0 w-full h-[2px] cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100 z-20"
          onMouseDown={(e) => handleMouseDown(e, "bottom")}
        />
        <div
          className="absolute left-0 h-full w-[2px] cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100 z-20"
          onMouseDown={(e) => handleMouseDown(e, "left")}
        />
        <div
          className="absolute top-0 w-full h-[2px] cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100 z-20"
          onMouseDown={(e) => handleMouseDown(e, "top")}
        />
        {/* Corners */}
        <div
          className="absolute top-0 left-0 w-3 h-3 bg-blue-500 cursor-nw-resize opacity-0 group-hover:opacity-100 z-30"
          onMouseDown={(e) => handleMouseDown(e, "top-left")}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 bg-blue-500 cursor-ne-resize opacity-0 group-hover:opacity-100 z-30"
          onMouseDown={(e) => handleMouseDown(e, "top-right")}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 cursor-sw-resize opacity-0 group-hover:opacity-100 z-30"
          onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize opacity-0 group-hover:opacity-100 z-30"
          onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
        />
        {/* Content wrapper */}
        <div
          id="AdjustableDiv"
          className="relative z-10 no-scrollbar min-w-[400px]"
          style={{ containerType: "inline-size", overflow: "scroll", height: "100%" }}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
