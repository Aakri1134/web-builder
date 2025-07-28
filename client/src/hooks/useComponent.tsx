import { useRecoilState } from "recoil"
import {
  parentFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { useEffect } from "react"

export default function useComponent(
  id: string,
  styleInit: DSLComponent["style"],
  propsInit: DSLComponent["props"],
  parentInit: DSLComponent["id"][]
) {
  const [style, setStyle] = useRecoilState(styleFamily(id))
  const [props, setProps] = useRecoilState(propsFamily(id))
  const [parents, setParents] = useRecoilState(parentFamily(id))

  useEffect(() => {
    setStyle(styleInit)
    setProps(propsInit)
    setParents(parentInit)
  }, [id, styleInit, propsInit, parentInit, setStyle, setProps, setParents])

  return { style, props, parents, setStyle, setParents, setProps }
}
