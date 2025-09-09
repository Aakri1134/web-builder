import { atom } from "recoil"

export const ratioAtom = atom<number>({
  key: "ratioAtom",
  default: 1,
})
