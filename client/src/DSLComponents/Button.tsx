import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../recoil/atoms/component"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import useComponent from "../hooks/useComponent"

interface InputButton {
  id : DSLComponent["id"]
  style : DSLComponent["style"]
  props : DSLComponent["props"]
  parent : DSLComponent["id"][]
}

export default function Button({ id, style, props, parent }: InputButton) {
  // logic to convert props.onClick to premade functions
  // logic for visibility
  // logic for ???
  const setActive = useSetRecoilState(activeComponents)

  const component = useComponent(id, style, props, parent, [] )

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return <button style={component.style}>{component.props?.text}</button>
}
