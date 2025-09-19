import { useEffect, useRef, useState } from "react"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"

type InputCanvas = {
  pagesInit: Page[]
}

type Page = {
  id: string
  name: string
  height: number
  width: number
  center: {
    x: number
    y: number
  }
  element: React.ReactNode
}

type PageState = {
  [key: string]: Page
}

export default function Canvas({ pagesInit }: InputCanvas) {
  const [ratio, setRatio] = useState<number>(1)
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [pages, setPages] = useState<PageState>()
  const isRepositioning = useRef<boolean>(false)
  const pagesTemp = useRef<PageState>()

  // Keyboard zoom controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "=" || e.key === "+" || e.key === "-")) {
        e.preventDefault()
        e.stopPropagation()

        if (e.key === "=" || e.key === "+") {
          setRatio((x) => Math.max(x * 1.4, 0.01))
        } else if (e.key === "-") {
          setRatio((x) => Math.min(x / 1.4, 1))
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown, { capture: true })

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true })
    }
  }, [])

  useEffect(() => {
    let temp: PageState = {}
    pagesInit.forEach((page: Page) => {
      temp[page.id] = page
    })
    setPages(temp)
  }, [pagesInit])

  function calculateOrigin() {
    const currentPages = pages
    if (!currentPages) return

    let top = 0,
      bottom = 0,
      right = 0,
      left = 0

    Object.keys(currentPages).forEach((pageID) => {
      const page = currentPages[pageID]
      top = Math.max(top, page.center.y + page.height / 2)
      bottom = Math.min(bottom, page.center.y - page.height / 2)
      right = Math.max(right, page.center.x + page.width / 2)
      left = Math.min(left, page.center.x - page.width / 2)
    })

    const x_Dis = right - left + 50
    const y_Dis = top - bottom + 50

    const newRatio =
      x_Dis / 4 > y_Dis / 3
        ? (window.innerWidth * 7) / 10 / x_Dis
        : window.innerHeight / y_Dis

    setRatio(newRatio)
    setOrigin({
      x: (right + left) / 2,
      y: (top + bottom) / 2,
    })
  }

  useEffect(() => {
    if(!isRepositioning.current)
    calculateOrigin()
  }, [pages])

  function recenter() {
    if (pagesTemp.current) {
      setPages(pagesTemp.current)
      pagesTemp.current = undefined
    }
      calculateOrigin()
        const canvas = document.getElementById("canvas")
        if (canvas) {
          canvas.scrollTo({
            left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
            top: window.innerHeight * 2.5 - window.innerHeight / 2,
          })
        }
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas")
    if (canvas) {
      canvas.scrollTo({
        left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
        top: window.innerHeight * 2.5 - window.innerHeight / 2,
      })
    }
  }, [origin])

  if (!pages) {
    return null
  }

  const handleDragEnd = (e : DragEndEvent) => {
    const {active, delta} = e
    const {id} = active

    const pageID = id
    setPages((curr) => {
      if(!curr) return curr
      return ({
      ...curr, 
      [pageID] : {
        ...curr[pageID],
        center : {
          x : curr[pageID].center.x + delta.x,
          y : curr[pageID].center.y + delta.y
        }
      }
    })})
setTimeout(() => {
isRepositioning.current = false
}, 100)
    
  }

  return (
    <DndContext onDragStart={() => {isRepositioning.current = true}} onDragEnd={handleDragEnd}>
      <div
        id="canvas"
        style={{
          width: (window.innerWidth * 7) / 10,
          height: window.innerHeight,
          position: "relative",
          overflow: "scroll",
          boxSizing: "content-box",
        }}
        className="no-scrollbar bg-slate-900"
      >
        <div
          style={{
            transform: `translate(250vw, 250vh) scale(${ratio})`,
            transformOrigin: "0 0",
            backgroundColor: "rgba(0, 0, 0, 0)",
            width: "500vw",
            height: "500vh",
          }}
        >
          {Object.keys(pages).map((pageID: string) => {
            
            const page = pages[pageID]
            return (
              <>{page.name}</>
            )
          })}
        </div>
        <button
          className="fixed w-20 h-20 right-1/2 transform translate-x-20 bottom-0 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-white shadow-lg transition-colors duration-200"
          onClick={recenter}
        >
          Recenter
        </button>
      </div>
    </DndContext>
  )
}
