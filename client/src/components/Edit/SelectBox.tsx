import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import { useEffect, useRef, useState } from "react"

export default function Selector() {
  const curr = useRecoilValue(currentComponentID)
  const lastPosition = useRef<{
    [key: string]: { top: number; left: number; right: number; bottom: number }
  }>({})

  const [, forceUpdate] = useState({})

  useEffect(() => {
    console.log("Selected Elements : " + curr)
    if (!curr || curr.length === 0) {
      lastPosition.current = {}
      console.log("No elements")
      return
    }

    let animationId: number

    const checkPosition = () => {
      lastPosition.current = {}
      let hasChanged = false

      curr.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const currentPos = {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
          }

          if (
            !lastPosition.current[id] ||
            lastPosition.current[id].top !== currentPos.top ||
            lastPosition.current[id].left !== currentPos.left ||
            lastPosition.current[id].right !== currentPos.right ||
            lastPosition.current[id].bottom !== currentPos.bottom
          ) {
            lastPosition.current[id] = currentPos
            hasChanged = true
          }
        }
      })

      if (hasChanged) {
        forceUpdate({})
      }
      animationId = requestAnimationFrame(checkPosition)
    }

    animationId = requestAnimationFrame(checkPosition)

    return () => cancelAnimationFrame(animationId)
  }, [curr])

  if (
    !curr ||
    curr.length === 0 ||
    Object.keys(lastPosition.current).length === 0
  ) {
    return null
  }
  let right: number = -Infinity
  let left: number = Infinity
  let bottom: number = -Infinity
  let top: number = Infinity

  Object.keys(lastPosition.current).forEach((id) => {
    const pos = lastPosition.current[id]
    right = Math.max(right, pos.right)
    left = Math.min(left, pos.left)
    bottom = Math.max(bottom, pos.bottom)
    top = Math.min(top, pos.top)
  })
  const width = right - left
  const height = bottom - top

  return (
    <div
      style={{
        position: "fixed",
        top: top - 2,
        left: left - 2,
        width: width + 4,
        height: height + 4,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      className="border-[1px] border-blue-600 z-30 rounded-sm"
    >
      {Object.keys(lastPosition.current).length > 1 && Object.keys(lastPosition.current).map((id) => {
        const { right, left, bottom, top } = lastPosition.current[id]
        const width = right - left
        const height = bottom - top
        return  (<div style={{
        position: "fixed",
        top: top,
        left: left,
        width: width,
        height: height,
        pointerEvents: "none",
      }} className="border-[1px] border-blue-300 z-30 rounded-xs"/>)
      })}
    </div>
  )
}
