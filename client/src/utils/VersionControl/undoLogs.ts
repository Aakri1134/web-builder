import type { DSLComponent } from "../../types/DSL"
import type { validStyles } from "../DSL/sanetizer"

type Style = validStyles["style"]
type ID = DSLComponent["id"]
type Props = DSLComponent["props"]

export interface StyleLogs {
  type: "style"
  component: ID[]
  key: Style
  inital: string
  final: string
}

// for position changes
export interface ChildrenLogs {
  type: "children"
  component: ID[]
  inital: ID
  final: ID
}

export interface PropsLogs {
  type: "props"
  component: ID[]
  key: Props
  inital: string
  final: string
}

type T = PropsLogs | StyleLogs | ChildrenLogs

let items: T[] = []
let index = 0

export function pushUndoLogs(item: T) {
  alert(`Pushing Logs :: ${JSON.stringify(item)}`)
  if (index > items.length) {
    items.push(item)
  } else {
    items[index] = item
  }
}

export function popUndoLogs() {
  if (index === 0) {
    alert(`Popping Logs :: Empty Stack`)
    return null
  }
  alert(`Popping Logs :: ${JSON.stringify(items[index - 1])}`)
  const value = items[index - 1]
  index--
  return value
}
