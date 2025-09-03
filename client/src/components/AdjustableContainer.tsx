import { useState, useRef, useCallback, useEffect } from 'react'

type InputAdjustableDiv = {
  children: React.ReactNode
  style?: React.CSSProperties
  onResize?: (width: number, height: number, direction : string) => void
}

export default function AdjustableContainer({
  children,
  style = {},
  onResize
}: InputAdjustableDiv) {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: 0, height: 0 })
  const startOffset = useRef({ left: 0, top: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(containerRef.current)
    
    startPos.current = { x: e.clientX, y: e.clientY }
    startSize.current = { width: rect.width, height: rect.height }
    startOffset.current = {
      left: parseFloat(computedStyle.left) || 0,
      top: parseFloat(computedStyle.top) || 0
    }
    
    setIsResizing(true)
    setResizeDirection(direction)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return
    
    const deltaX = e.clientX - startPos.current.x
    const deltaY = e.clientY - startPos.current.y
    
    let newWidth = startSize.current.width
    let newHeight = startSize.current.height
    let newLeft = startOffset.current.left
    let newTop = startOffset.current.top
    
    switch (resizeDirection) {
      case 'right':
        newWidth = Math.max(50, startSize.current.width + deltaX)
        break
      case 'left':
        newWidth = Math.max(50, startSize.current.width - deltaX)
        newLeft = startOffset.current.left + deltaX
        if (newWidth === 50) {
          newLeft = startOffset.current.left + (startSize.current.width - 50)
        }
        break
      case 'bottom':
        newHeight = Math.max(50, startSize.current.height + deltaY)
        break
      case 'top':
        newHeight = Math.max(50, startSize.current.height - deltaY)
        newTop = startOffset.current.top + deltaY
        if (newHeight === 50) {
          newTop = startOffset.current.top + (startSize.current.height - 50)
        }
        break
    }
    
    containerRef.current.style.width = `${newWidth}px`
    containerRef.current.style.height = `${newHeight}px`
    containerRef.current.style.left = `${newLeft}px`
    containerRef.current.style.top = `${newTop}px`
    
    if (onResize) {
      onResize(newWidth, newHeight, resizeDirection)
    }
  }, [isResizing, resizeDirection, onResize])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    setResizeDirection('')
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  return (
    <div ref={containerRef} style={style} className="group">
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <div 
          className="absolute right-0 h-full bg-gray-100 z-[2000] w-[2px] cursor-col-resize opacity-0 hover:bg-blue-500  group-hover:opacity-100 transition-opacity duration-75"
          onMouseDown={(e) => handleMouseDown(e, 'right')}
        />
        <div 
          className="absolute bottom-0 w-full bg-gray-100 z-[2000] h-[2px] cursor-row-resize opacity-0 hover:bg-blue-500  group-hover:opacity-100 transition-opacity duration-75"
          onMouseDown={(e) => handleMouseDown(e, 'bottom')}
        />
        <div 
          className="absolute left-0 h-full bg-gray-100 z-[2000] w-[2px] cursor-col-resize hover:bg-blue-500  opacity-0 group-hover:opacity-100 transition-opacity duration-75"
          onMouseDown={(e) => handleMouseDown(e, 'left')}
        />
        <div 
          className="absolute top-0 w-full bg-gray-100 z-[2000] h-[2px] hover:bg-blue-500 cursor-row-resize opacity-0 group-hover:opacity-100 transition-opacity duration-75"
          onMouseDown={(e) => handleMouseDown(e, 'top')}
        />
        <div
          id="AdjustableDiv"
          style={{ containerType: "inline-size", overflow: "scroll", height: "100%" }}
          className="no-scrollbar min-w-[400px]"
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
