import { useRecoilState, useResetRecoilState } from "recoil"
import {
  activeComponents,
  parentFamily,
  propsFamily,
  styleFamily,
} from "../recoil/atoms/component"

export const useClearComponentAtoms = () => {
  const [active, setActive] = useRecoilState(activeComponents)

  const clearAtoms = () => {
    active.forEach((id: string) => {
      useResetRecoilState(styleFamily(id))
      useResetRecoilState(propsFamily(id))
      useResetRecoilState(parentFamily(id))
    })
    setActive([])
  }

  return clearAtoms
}
