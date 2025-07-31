import { useRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import {
  childrenFamily,
  parentFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"

export default function useComponentEdit(id: DSLComponent["id"] | null) {
  const [style, setStyle] = useRecoilState(styleFamily(id || "empty"))
  const [props, setProps] = useRecoilState(propsFamily(id || "empty"))
  const [children, setChildren] = useRecoilState(childrenFamily(id || "empty"))
  const [parents, setParents] = useRecoilState(parentFamily(id || "empty"))

  return {
    id : id || "empty",
    style,
    props,
    parents,
    children,
    setStyle,
    setParents,
    setProps,
    setChildren,
  }
}
