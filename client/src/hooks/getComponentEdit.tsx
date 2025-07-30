import { useRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import {
  childrenFamily,
  parentFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"

export default function useComponentEdit(id: DSLComponent["id"]) {
  const [style, setStyle] = useRecoilState(styleFamily(id))
  const [props, setProps] = useRecoilState(propsFamily(id))
  const [parents, setParents] = useRecoilState(parentFamily(id))
  const [children, setChildren] = useRecoilState(childrenFamily(id))

    return { style, props, parents, children, setStyle, setParents, setProps, setChildren }

}
