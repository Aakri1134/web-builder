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
import { popUndoLogs, type UndoLog } from "../../utils/VersionControl/undoLogs"

export type PropsChange = {
  id: string[]
  key: keyof DSLComponent["props"]
  value: string
}
export type StyleChange = {
  id: string[]
  key: keyof Partial<React.CSSProperties>
  value: string
}

export default function GlobalEditor() {
  const [activeComponentID, setActiveComponentID] =
    useRecoilState(currentComponentID)
  const [styleFields, setStyleFields] = useState<StyleEditProperty[]>([])
  const [styleChange, setStyleChamge] = useState<StyleChange | null>(null)
  const [propsChange, setPropsChamge] = useState<PropsChange | null>(null)
  const undoTrigerred = useRef<boolean>()
  const undoInfo = useRef<UndoLog | undefined>()
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
        setActiveComponentID(lastUndo.component)
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
      // alert(JSON.stringify(undoInfo.current))
      if (undoInfo.current.type === "style") {
        console.log("undo action type is style")
        const nig : any = {
          id: activeComponentID,
          key: undoInfo.current.key,
          value: undoInfo.current.inital,
        }
        console.log(nig)
        setStyleChamge(nig)
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

  return (
    <div className=" bg-gray-900 w-96 h-screen no-select">
      {activeComponentID?.map((id) => {
        return (
          <Manager
            key={++mapKey.current}
            id={id}
            propsChange={propsChange}
            styleChange={styleChange}
            handlePropsChangeComplete={() => {setPropsChamge(null)}}
            handleStyleChangeComplete={() => {setStyleChamge(null)}}
            forceUpdate={() => {forceUpdate(x => -1 * x)}}
          />
        )
      })}
      {activeComponentID && styleFields.includes("font-size") && (
        <StyleInputNumber
          inputRef={fontSizeInput}
          label="Font Size"
          handleChange={(value) => {
            setStyleChamge({
              id: activeComponentID,
              key: "fontSize",
              value,
            })
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
            setStyleChamge({
              id: activeComponentID,
              key: "width",
              value,
            })
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
            setStyleChamge({
              id: activeComponentID,
              key: "height",
              value,
            })
          }}
          type="style"
          keyString="height"
        />
      )}
      {activeComponentID && styleFields.includes("font-style") && (
        <FontOptions
          handleSelect={(value) => {
            if (value.family) {
              setStyleChamge({
                id: activeComponentID,
                key: "fontFamily",
                value: value.family,
              })
            } else if (value.style) {
              if (value.style.italic) {
                setStyleChamge({
                  id: activeComponentID,
                  key: "fontStyle",
                  value: "italic",
                })
              } else {
                setStyleChamge({
                  id: activeComponentID,
                  key: "fontStyle",
                  value: "normal",
                })
              }
            } else if (value.weight) {
              setStyleChamge({
                id: activeComponentID,
                key: "fontWeight",
                value: value.weight.toString(),
              })
            }
          }}
        />
      )}
    </div>
  )
}
