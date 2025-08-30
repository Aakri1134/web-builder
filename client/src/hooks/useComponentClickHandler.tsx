import { useRecoilValue, useSetRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { currentComponentID } from "../recoil/atoms/component"
import { useRef, useState } from "react"

type ID = DSLComponent["id"]

// ideal version, need to reduce rerenders, but for now ill go with a dumber version
// export default function useComponentClickHandler(parents: ID[]) {
//   const [activeComponent, setActiveComponent] =
//     useRecoilState(currentComponentID)

//   function handleComponentClick() {
//     console.log(activeComponent)

//     if (activeComponent === null) {
//       setActiveComponent(parents[parents.length - 1])
//       return
//     }

//     let index = parents.indexOf(activeComponent)

//     if (index === -1 || index === 0) {
//       setActiveComponent(null)
//       return
//     }

//     setActiveComponent(parents[index - 1])
//   }

//   return {handleComponentClick}
// }

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

  // useEffect(() => {
  //     if(index != 0){
  //         alert(index)
  //     }
  // }, [index])

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
