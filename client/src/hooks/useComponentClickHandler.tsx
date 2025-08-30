import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { currentComponentID } from "../recoil/atoms/component"
import { useRef, useState } from "react"

type ID = DSLComponent["id"]

export default function useComponentClickHandler(parents: ID[]) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const setActiveComponent = useSetRecoilState(currentComponentID)
  const handleComponentClick = () => {
    // called on single click
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      const newIndex = 0
      setIndex(newIndex)
      setActiveComponent(parents[parents.length - 1 - newIndex])
    }, 250)
  }

  const handleParentSelect = () => {
    // called on Double Click
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (parents.length - 1 - index <= 0) {
      setIndex(0)
      setActiveComponent(null)
    } else {
      setIndex((x) => x + 1)
      setActiveComponent(parents[parents.length - 2 - index])
    }
  }
  return { handleComponentClick, handleParentSelect }
}
