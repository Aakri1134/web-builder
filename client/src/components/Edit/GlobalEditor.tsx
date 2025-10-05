import { useRecoilState } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import { useEffect, useRef, useState } from "react"
import { getType } from "../../utils/DSL/typeMap"
import type { DSLComponent } from "../../types/DSL"
import {
  getStyleRequirementsIntersection,
  type StyleEditProperty,
} from "../../utils/Editor/requirements"
import Manager from "./GlobalEditor/Manager"
import StyleInputNumber from "./GlobalEditor/StyleInputNumber"
import FontOptions from "./GlobalEditor/FontOptions"
import {
  popUndoLogs,
  redoUndoLogs,
  type UndoLog,
} from "../../utils/VersionControl/undoLogs"
import type { validStyles } from "../../utils/DSL/sanetizer"

export type PropsChange = {
  id: string
  key: keyof DSLComponent["props"]
  value: string
}[]
export type StyleChange = {
  id: string
  key: validStyles["style"]
  value: string
}[]

export default function GlobalEditor() {
  const [activeComponentID, setActiveComponentID] =
    useRecoilState(currentComponentID)
  const [styleFields, setStyleFields] = useState<StyleEditProperty[]>([])
  const [styleChange, setStyleChamge] = useState<StyleChange | null>(null)
  const [propsChange, setPropsChamge] = useState<PropsChange | null>(null)
  const undoTrigerred = useRef<boolean>()
  const undoInfo = useRef<UndoLog | undefined>()
  const redoTrigerred = useRef<boolean>()
  const redoInfo = useRef<UndoLog | undefined>()
  const mapKey = useRef<number>(0)
  const fontSizeInput = useRef<HTMLInputElement | null>(null)
  const widthInput = useRef<HTMLInputElement | null>(null)
  const heightInput = useRef<HTMLInputElement | null>(null)
  const [updater, forceUpdate] = useState<number>(1)

  useEffect(() => {
    const handleKeydown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault()
        const lastUndo = popUndoLogs()
        if (!lastUndo) {
          alert("Undo Stack empty")
          return
        }
        undoTrigerred.current = true
        undoInfo.current = lastUndo
        console.log("Current Undo")
        console.log(lastUndo)
        const previousComponents: string[] = []

        for (const events of lastUndo.operations) {
          previousComponents.push(events.component)
        }
        setActiveComponentID(previousComponents)
        forceUpdate((x) => -1 * x)
      } else if (e.ctrlKey && e.key == "y") {
        e.preventDefault()
        const redo = redoUndoLogs()
        if (!redo) {
          alert("Redo Enpty")
          return
        }
        redoTrigerred.current = true
        redoInfo.current = redo

        console.log("Current Redo")
        console.log(redo)
        const previousComponents: string[] = []

        for (const events of redo.operations) {
          previousComponents.push(events.component)
        }
        setActiveComponentID(previousComponents)
        forceUpdate((x) => -1 * x)
      }
    }
    document.addEventListener("keydown", handleKeydown, { capture: true })

    return () => {
      document.removeEventListener("keydown", handleKeydown, { capture: true })
    }
  }, [])

  useEffect(() => {
    console.log("activeComponentID changes")
    if (undoTrigerred.current) {
      console.log("undo action trigerred")
      if (!undoInfo.current || !activeComponentID) {
        undoInfo.current = undefined
        undoTrigerred.current = false
        alert("undo info not found")
        return
      }
      if (undoInfo.current.type === "style") {
        console.log("undo action type is style")
        const newStyle: StyleChange = []
        for (const event of undoInfo.current.operations) {
          newStyle.push({
            id: event.component,
            key: event.key,
            value: event.inital,
          })
        }
        console.log(newStyle)
        setStyleChamge(newStyle)
        console.log("Style change set")
      }
      undoInfo.current = undefined
      undoTrigerred.current = false
      return
    } else if (redoTrigerred.current) {
      console.log("redo action trigerred")
      if (!redoInfo.current || !activeComponentID) {
        redoInfo.current = undefined
        redoTrigerred.current = false
        alert("redo info not found")
        return
      }
      if (redoInfo.current.type === "style") {
        console.log("redo action type is style")
        const newStyle: StyleChange = []
        for (const event of redoInfo.current.operations) {
          newStyle.push({
            id: event.component,
            key: event.key,
            value: event.final,
          })
        }
        console.log(newStyle)
        setStyleChamge(newStyle)
        console.log("Style change set")
      }
      undoInfo.current = undefined
      undoTrigerred.current = false
      return
    }
    console.log("NO undo action trigerred")

    setStyleChamge(null)
    setPropsChamge(null)
    if (!activeComponentID) return
    let componentTypes: Set<DSLComponent["type"]> = new Set([])
    for (let i = 0; i < (activeComponentID?.length ?? 0); i++) {
      const currType = getType(activeComponentID[i])
      if (!currType) continue
      componentTypes.add(currType)
    }
    setStyleFields(getStyleRequirementsIntersection([...componentTypes]))
  }, [activeComponentID, updater])

  function handleChange(key: validStyles["style"], value: string) {
    if (!activeComponentID) return
    const style: StyleChange = []
    for (const id of activeComponentID) {
      style.push({
        id,
        key,
        value,
      })
    }
    setStyleChamge(style)
  }

  return (
    <div className=" bg-gray-900 w-96 h-screen no-select">
      {activeComponentID?.map((id) => {
        return (
          <Manager
            key={++mapKey.current}
            id={id}
            propsChange={propsChange}
            styleChange={styleChange}
            handlePropsChangeComplete={() => {
              setPropsChamge(null)
            }}
            handleStyleChangeComplete={() => {
              setStyleChamge(null)
            }}
            forceUpdate={() => {
              forceUpdate((x) => -1 * x)
            }}
          />
        )
      })}
      {activeComponentID && styleFields.includes("font-size") && (
        <StyleInputNumber
          inputRef={fontSizeInput}
          label="Font Size"
          handleChange={(value) => {
            handleChange("fontSize", value)
          }}
          type="style"
          keyString="fontSize"
        />
      )}
      {activeComponentID && styleFields.includes("dimension") && (
        <StyleInputNumber
          inputRef={widthInput}
          label="Width"
          handleChange={(value) => {
            handleChange("width", value)
          }}
          type="style"
          keyString="width"
        />
      )}
      {activeComponentID && styleFields.includes("dimension") && (
        <StyleInputNumber
          inputRef={heightInput}
          label="height"
          handleChange={(value) => {
            handleChange("height", value)
          }}
          type="style"
          keyString="height"
        />
      )}
      {activeComponentID && styleFields.includes("font-style") && (
        <FontOptions
          handleSelect={(value) => {
            if (value.family) {
              handleChange("fontFamily", value.family)
            } else if (value.style) {
              if (value.style.italic) {
                handleChange("fontStyle", "italic")
              } else {
                handleChange("fontStyle", "normal")
              }
            } else if (value.weight) {
              handleChange("fontWeight", value.weight.toString())
            }
          }}
        />
      )}
    </div>
  )
}
