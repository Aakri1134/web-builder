import { useRecoilState } from "recoil"
import {
  childrenFamily,
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
  parentInit: DSLComponent["id"][],
  childrenInit: DSLComponent["children"]
) {
  const [style, setStyle] = useRecoilState(styleFamily(id))
  const [props, setProps] = useRecoilState(propsFamily(id))
  const [parents, setParents] = useRecoilState(parentFamily(id))
  const [children, setChildren] = useRecoilState(childrenFamily(id))

  useEffect(() => {
    setStyle(styleInit)
    setProps(propsInit)
    setParents(parentInit)
    setChildren(childrenInit)
  }, [id, styleInit, propsInit, parentInit, setStyle, setProps, setParents])

  return { style, props, parents, children, setStyle, setParents, setProps, setChildren }
}
