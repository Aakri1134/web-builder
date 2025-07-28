import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"

export default function Heading({ id, props, style }: Partial<DSLComponent>) {
  const setActive = useSetRecoilState(activeComponents)
  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])
  return <h1 style={{ ...style }}>{props?.text}</h1>
}
