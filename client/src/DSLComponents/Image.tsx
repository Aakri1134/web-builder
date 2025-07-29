import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../recoil/atoms/component"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import useComponent from "../hooks/useComponent"

interface InputImage {
  id : DSLComponent["id"]
  style : DSLComponent["style"]
  props : DSLComponent["props"]
  parent : DSLComponent["id"][]
}

export default function Image({ id, style, props, parent }: InputImage) {
  // logic for ???
  const setActive = useSetRecoilState(activeComponents)

  const component = useComponent(id, style, props, parent, [])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return <img style={component.style} src={component.props?.src} alt={component.props?.alt || ""}></img>
}
