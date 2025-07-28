import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import useComponent from "../../hooks/useComponent"
import type { TextComponentInput } from "./Heading"

export default function Text({
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
  return (
    <a href={component.props?.href} style={component.style}>
      {component.props?.text}
    </a>
  )
}
