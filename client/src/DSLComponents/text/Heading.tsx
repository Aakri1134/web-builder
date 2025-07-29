import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import useComponent from "../../hooks/useComponent"

export interface TextComponentInput {
  id: DSLComponent["id"]
  parents: DSLComponent["id"][]
  props: DSLComponent["props"]
  style: DSLComponent["style"]
  
}

export default function Heading({
  id,
  props,
  style,
  parents,
}: TextComponentInput) {
  const setActive = useSetRecoilState(activeComponents)
  const component = useComponent(id, style, props, parents)
  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])
  return <h1 className={component.props.className} style={component.style}>{props?.text}</h1>
}
