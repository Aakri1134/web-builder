import { atom } from "recoil";

export const EditMode = atom<boolean>({
    key : "editMode",
    default : false
})