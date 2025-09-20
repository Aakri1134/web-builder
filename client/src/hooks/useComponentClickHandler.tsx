import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../types/DSL"
import { currentComponentID } from "../recoil/atoms/component"
import { useEffect, useRef, useState } from "react"

type ID = DSLComponent["id"]

export default function useComponentClickHandler(parents: ID[]) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const setActiveComponent = useSetRecoilState(currentComponentID)
  const shiftPressed = useRef<boolean>(false)
  const handleComponentClick = (e: React.MouseEvent<HTMLElement>) => {
    // called on single click
    e.stopPropagation()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (shiftPressed.current) {
      setActiveComponent((x) => {
        if (x && x.includes(parents[parents.length - 1]))
          return x.filter((id) => {
            return id !== parents[parents.length - 1]
          })
        return [...(x ?? []), parents[parents.length - 1]]
      })
    } else {
      timeoutRef.current = setTimeout(() => {
        const newIndex = 0
        setIndex(newIndex)
        setActiveComponent((x) => {
          if (x) return null
          return [parents[parents.length - 1 - newIndex]]
        })
      }, 250)
    }
  }

  const handleParentSelect = (e: React.MouseEvent<HTMLElement>) => {
    // called on Double Click
    e.stopPropagation()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (parents.length - 1 - index <= 0) {
      setIndex(0)
      setActiveComponent(null)
    } else {
      setIndex((x) => x + 1)
      setActiveComponent([parents[parents.length - 2 - index]])
    }
  }

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        shiftPressed.current = true
      }
    }

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        shiftPressed.current = false
      }
    }

    document.addEventListener("keydown", handleKeydown, { capture: true })
    document.addEventListener("keyup", handleKeyup, { capture: true })

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      document.removeEventListener("keydown", handleKeydown, { capture: true })
      document.removeEventListener("keyup", handleKeyup, { capture: true })
    }
  })
  return { handleComponentClick, handleParentSelect }
}
