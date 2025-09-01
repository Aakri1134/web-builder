import { useEffect, useState } from "react"
import AdjustableContainer from "./AdjustableContainer"

type InputCanvas = {
  pages: Page[]
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

export default function Canvas({ pages }: InputCanvas) {
  const [ratio, setRatio] = useState<number>(1)
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // calculate the maximum distance on all 4 sides

    let top = 0,
      bottom = 0,
      right = 0,
      left = 0

    pages.forEach((page) => {
      top = Math.max(top, page.center.y + page.height / 2)
      bottom = Math.min(bottom, page.center.y - page.height / 2)
      right = Math.max(right, page.center.x + page.width / 2)
      left = Math.min(left, page.center.x - page.width / 2)
    })

    const x_Dis = right - left
    const y_Dis = top - bottom

    // canvas ratio 3 : 4 = h(y) : w(x)

    // const y_for_xDis = 3 / 4 * x_Dis
    // const x_for_yDis = 4 / 3 * y_Dis

    if (x_Dis / 4 > y_Dis / 3) {
      setRatio(x_Dis / ((window.innerWidth * 7) / 10))
    } else {
      setRatio(y_Dis / window.innerHeight)
    }

    setOrigin({
      x: (right + left) / 2,
      y: (top + bottom) / 2,
    })
  }, [])

  function recenter () {
    const canvas = document.getElementById("canvas")
    if (canvas)
      canvas.scrollTo({
        left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
        top: window.innerHeight * 2.5 - window.innerHeight / 2,
      })
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas")
    if (canvas)
      canvas.scrollTo({
        left: window.innerWidth * 2.5 - (window.innerWidth * 7) / 20,
        top: window.innerHeight * 2.5 - window.innerHeight / 2,
      })
  }, [origin])

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
      className=" bg-gray-600"
    >
      <div
        style={{
          transform: "translate(250vw, 250vh)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          width: "500vw",
          height: "500vh",
        }}
      >
        {pages.map((page: Page) => {
          return (
            <AdjustableContainer
              key={page.id}
              style={{
                position: "absolute",
                width: `${page.width / ratio}px`,
                height: `${page.height / ratio}px`,
                left: `${
                  (page.center.x - origin.x - page.width / 2) / ratio
                }px`,
                top: `${
                  (page.center.y - origin.y - page.height / 2) / ratio
                }px`,
              }}
            >
              {page.element}
            </AdjustableContainer>
          )
        })}
        
      </div>
      <button className=" fixed w-20 h-20 right-1/2 transform translate-x-20 bottom-0 bg-amber-500" onClick={recenter}>
        Recenter
      </button>
    </div>
  )
}
