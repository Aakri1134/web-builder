import { useEffect, useRef, useState } from "react"
import AdjustableContainer from "./AdjustableContainer"

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
  const pageResizingTimeout = useRef<number>()
  const pagesTemp = useRef<PageState>()

  // Keyboard zoom controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "=" || e.key === "+" || e.key === "-")) {
        e.preventDefault() 
        e.stopPropagation() 

        if (e.key === "=" || e.key === "+") {
          setRatio((x) => Math.max(x / 1.4, 0.01))
        } else if (e.key === "-") {
          setRatio((x) => Math.min(x * 1.4, 1))
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
    const currentPages = pagesTemp.current || pages
    if (!currentPages) return

    let top = 0, bottom = 0, right = 0, left = 0

    Object.keys(currentPages).forEach((pageID) => {
      const page = currentPages[pageID]
      top = Math.max(top, page.center.y + page.height / 2)
      bottom = Math.min(bottom, page.center.y - page.height / 2)
      right = Math.max(right, page.center.x + page.width / 2)
      left = Math.min(left, page.center.x - page.width / 2)
    })

    const x_Dis = right - left + 5
    const y_Dis = top - bottom + 5

    const newRatio = x_Dis / 4 > y_Dis / 3 
      ? x_Dis / ((window.innerWidth * 7) / 10)
      : y_Dis / window.innerHeight

    setRatio(newRatio)
    setOrigin({
      x: (right + left) / 2,
      y: (top + bottom) / 2,
    })
  }

  // Recalculate origin when pages change (but not during resize)
  useEffect(() => {
    if (!pageResizingTimeout.current) {
      calculateOrigin()
    }
  }, [pages])

  // Recenter function
  function recenter() {
    // Clear any pending resize timeout
    if (pageResizingTimeout.current) {
      clearTimeout(pageResizingTimeout.current)
      pageResizingTimeout.current = undefined
    }
    
    if (pagesTemp.current) {
      setPages(pagesTemp.current)
    }
    
    // Recalculate origin with current state
    setTimeout(() => {
      calculateOrigin()
      
      // Then scroll to center
      setTimeout(() => {
        const canvas = document.getElementById("canvas")
        if (canvas) {
          canvas.scrollTo({
            left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
            top: window.innerHeight * 2.5 - window.innerHeight / 2,
          })
        }
      }, 100)
    }, 0)
  }

  // Auto-center on origin change
  useEffect(() => {
    const canvas = document.getElementById("canvas")
    if (canvas) {
      canvas.scrollTo({
        left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
        top: window.innerHeight * 2.5 - window.innerHeight / 2,
      })
    }
  }, [origin])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pageResizingTimeout.current) {
        clearTimeout(pageResizingTimeout.current)
      }
    }
  }, [])

  if (!pages) {
    return null
  }

  return (
    <div
      id="canvas"
      style={{
        width: (window.innerWidth * 7) / 10,
        height: window.innerHeight,
        position: "relative",
        overflow: "scroll",
        boxSizing: "content-box",
      }}
      className="bg-slate-900"
    >
      <div
        style={{
          transform: "translate(250vw, 250vh)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          width: "500vw",
          height: "500vh",
        }}
      >
        {Object.keys(pages).map((pageID: string) => {
          const page = pages[pageID]
          return (
            <AdjustableContainer
              key={page.id}
              style={{
                position: "absolute",
                width: `${page.width / ratio}px`,
                height: `${page.height / ratio}px`,
                left: `${(page.center.x - origin.x - page.width / 2) / ratio}px`,
                top: `${(page.center.y - origin.y - page.height / 2) / ratio}px`,
              }}
              onResize={(w, h, d) => {
                if (!pages) return
                
                // Clear any existing timeout
                if (pageResizingTimeout.current) {
                  clearTimeout(pageResizingTimeout.current)
                }
                
                const currentPage = pages[page.id]
                
                switch (d) {
                  case "right":
                    pagesTemp.current = {
                      ...pages,
                      [page.id]: {
                        ...currentPage,
                        width: w * ratio,
                        height: h * ratio,
                        center: {
                          x: currentPage.center.x + (w * ratio - currentPage.width) / 2,
                          y: currentPage.center.y,
                        },
                      },
                    }
                    break
                    
                  case "left":
                    pagesTemp.current = {
                      ...pages,
                      [page.id]: {
                        ...currentPage,
                        width: w * ratio,
                        height: h * ratio,
                        center: {
                          x: currentPage.center.x - (w * ratio - currentPage.width) / 2,
                          y: currentPage.center.y,
                        },
                      },
                    }
                    break
                    
                  case "bottom":
                    pagesTemp.current = {
                      ...pages,
                      [page.id]: {
                        ...currentPage,
                        width: w * ratio,
                        height: h * ratio,
                        center: {
                          x: currentPage.center.x,
                          y: currentPage.center.y + (h * ratio - currentPage.height) / 2,
                        },
                      },
                    }
                    break
                    
                  case "top":
                    pagesTemp.current = {
                      ...pages,
                      [page.id]: {
                        ...currentPage,
                        width: w * ratio,
                        height: h * ratio,
                        center: {
                          x: currentPage.center.x,
                          y: currentPage.center.y - (h * ratio - currentPage.height) / 2,
                        },
                      },
                    }
                    break
                }
                
                // Debounce the page update for smooth preview during resize
                pageResizingTimeout.current = window.setTimeout(() => {
                  setPages(pagesTemp.current || pages)
                }, 50)
              }}
            >
              {page.element}
            </AdjustableContainer>
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
  )
}