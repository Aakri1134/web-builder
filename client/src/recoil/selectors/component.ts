import { selector } from "recoil";
import { currentComponentID } from "../atoms/component";

export const isEditing = selector({
    key : "isEditing",
    get : ({get}) => {
        const curr = get(currentComponentID)
        return (curr != null)
    },
    set : ({set}) => {
        set(currentComponentID, null)
    }
})