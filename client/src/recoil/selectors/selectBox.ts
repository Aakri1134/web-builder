import { selector } from "recoil";
import { currentComponentID } from "../atoms/component";

export const selectBox = selector({
    key : "selectBox",
    get : ({get}) => {
        const curr = get(currentComponentID)
        if(curr === null)
            return null
        const element = document.getElementById(curr)?.getBoundingClientRect()
        return ({
            top : element?.top,
            bottom : element?.bottom,
            right : element?.right,
            left : element?.left,
            width : element?.width,
            height : element?.height
        })
    }
})