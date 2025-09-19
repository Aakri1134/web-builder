import {  atom, atomFamily } from "recoil"
import type { DSLComponent } from "../../types/DSL"

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
  default: () => ({
    className : ""
  })
})

export const childrenFamily = atomFamily<Children, ID>({
  key : `childrenFamily`,
  default: () => []
})

export const parentFamily = atomFamily<ID[], ID>({
  key : `parentFamily`,
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

export const currentComponentID = atom<ID | null>({
  key : "currentComponentID",
  default : null
})
