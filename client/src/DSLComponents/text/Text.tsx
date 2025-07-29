import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import type { TextComponentInput } from "./Heading"
import useComponent from "../../hooks/useComponent"

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
  return <p className={component.props.className} style={component.style}>{component.props?.text}</p>
}
