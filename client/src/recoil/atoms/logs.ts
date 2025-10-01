import { atom } from "recoil";
import type { DSLComponent } from "../../types/DSL"
import type { validStyles } from "../../utils/DSL/sanetizer";
import Stack from "../../utils/DataStructure/Stack";

type Style = validStyles["style"]
type ID = DSLComponent["id"]
type Props = DSLComponent["props"]

export interface StyleLogs {
    type : "style"
    component : ID[]
    key : Style
    inital : string
    final : string
}

// for position changes
export interface ChildrenLogs {
    type : "children"
    component : ID[]
    inital : ID
    final : ID
}

export interface PropsLogs {
    type : "props"
    component : ID[]
    key : Props
    inital : string
    final : string
}

export const logs = atom<Stack<(PropsLogs | StyleLogs | ChildrenLogs)>>({
    key : "logs",
    default : new Stack<(PropsLogs | StyleLogs | ChildrenLogs)>()
})

