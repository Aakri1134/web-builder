import { useRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { currentComponentID } from "../recoil/atoms/component"

type ID = DSLComponent["id"]

export default function useComponentClickHandler(parents: ID[]) {
  const [activeComponent, setActiveComponent] =
    useRecoilState(currentComponentID)

  function handleComponentClick() {
    
    if (activeComponent === null) {
      setActiveComponent(parents[0])
      return
    }

    let index = parents.indexOf(activeComponent)

    if (index === -1 && index + 1 === parents.length) {
      setActiveComponent(null)
      return
    }

    setActiveComponent(parents[index + 1])
  }

  return handleComponentClick
}
