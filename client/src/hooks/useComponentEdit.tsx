import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../types/DSL"
import {
  childrenFamily,
  parentFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"

export default function useComponentEdit(id: DSLComponent["id"] | null) {
  const setStyle = useSetRecoilState(styleFamily(id || "empty"))
  const setProps = useSetRecoilState(propsFamily(id || "empty"))
  const setChildren = useSetRecoilState(childrenFamily(id || "empty"))
  const setParents = useSetRecoilState(parentFamily(id || "empty"))

  return {
    id : id || "empty",
    setStyle,
    setParents,
    setProps,
    setChildren,
  }
}
