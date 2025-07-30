import { selector } from "recoil";
import { currentComponentID } from "../atoms/component";

export const handleEditClick = selector({
    key : "handleEditClick",
    get : ({get}) => {
        const curr = get(currentComponentID)
        return curr
    },
  set: ({ get, set }, newValue) => {
    const curr = get(currentComponentID);

    if (curr !== null) {
      set(currentComponentID, null);
    } else {
      set(currentComponentID, newValue);
    }}
})