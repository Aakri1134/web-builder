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

export type UndoLog = PropsLogs | StyleLogs | ChildrenLogs

let items: UndoLog[] = []
let index = 0
let currentMaxIndex = 0

export function pushUndoLogs(item: UndoLog) {
  if (index >= items.length) {
    items.push(item)
  } else {
    items[index] = item
  }
  index++
  currentMaxIndex = Math.max(currentMaxIndex, index)
}

export function popUndoLogs() {
  if (index === 0) {
    return null
  }
  const value = items[index - 1]
  index--
  return value
}

export function redoUndoLogs() {
  if (index === items.length) {
    return null
  }
  const value = items[index]
  index++
  return value
}

export function isUndoLogEmpty() {
  return index === 0
}

export function clearUndoLogs() {
  items = []
  index = 0
  currentMaxIndex = 0
}
