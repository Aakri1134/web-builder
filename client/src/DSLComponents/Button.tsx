import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../recoil/atoms/component"
import type { DSLComponent } from "../utils/DSL/sanetizer"

export default function Button({ id, style, props }: DSLComponent) {
  // logic to convert props.onClick to premade functions
  // logic for visibility
  // logic for ???
  const setActive = useSetRecoilState(activeComponents)

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return <button style={style}>{props?.text}</button>
}
