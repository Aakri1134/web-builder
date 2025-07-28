import {  atom, atomFamily } from "recoil"
import type { DSLComponent } from "../../utils/DSL/sanetizer"

type Style = DSLComponent["style"]
type ID = DSLComponent["id"]
type Props = DSLComponent["props"]
type Children = DSLComponent["children"]

export const styleFamily = atomFamily<Style, ID>({
  key : `styleFamily`,
  default: () => ({})
})

export const propsFamily = atomFamily<Props, ID>({
  key : `propsFamily`,
  default: () => ({})
})

export const childFamily = atomFamily<Children, ID>({
  key : `childFamily`,
  default: () => []
})

export const activeComponents = atom<ID[]>({
  key : "activeComponents",
  default : [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        console.log("activeComponents changed:", newValue)
        console.log(oldValue)
      })
    }
  ]
})

