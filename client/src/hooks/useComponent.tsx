import { useRecoilState } from "recoil"
import {
  childFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { useEffect } from "react"

export default function useComponent(
  id: string,
  styleInit: DSLComponent["style"],
  propsInit: DSLComponent["props"],
  parentInit: DSLComponent["children"]
) {
  const [style, setStyle] = useRecoilState(styleFamily(id))
  const [props, setProps] = useRecoilState(propsFamily(id))
  const [parent, setParent] = useRecoilState(childFamily(id))

  useEffect(() => {
    setStyle(styleInit)
    setProps(propsInit)
    setParent(parentInit)
  }, [id, styleInit, propsInit, parentInit, setStyle, setProps, setParent])

  return { style, props, parent }
}
