import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import { useEffect, useRef, useState } from "react"
import { getType } from "../../utils/DSL/typeMap"
import type { DSLComponent } from "../../types/DSL"
import {
  getStyleRequirementsIntersection,
  type StyleEditProperty,
} from "../../utils/Editor/requirements"
import Manager from "./GlobalEditor/Manager"
import InputNumber from "./GlobalEditor/InputNumber"
import DropOptions from "./GlobalEditor/DropOptions"

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
  const activeComponentID = useRecoilValue(currentComponentID)
  const [styleFields, setStyleFields] = useState<StyleEditProperty[]>([])
  const [styleChange, setStyleChamge] = useState<StyleChange | null>(null)
  const [propsChange, setPropsChamge] = useState<PropsChange | null>(null)
  const mapKey = useRef<number>(0)
  const fontSizeInput = useRef<HTMLInputElement | null>(null)
  const widthInput = useRef<HTMLInputElement | null>(null)
  const heightInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
				e.stopPropagation()
      }
    }

    document.addEventListener("keydown", handleKeydown, { capture: true })
    return () => {
      document.removeEventListener("keydown", handleKeydown, { capture: true })
    }
  }, [])

  useEffect(() => {
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
  }, [activeComponentID])

  return (
    <div className=" bg-gray-900 w-96 h-screen">
      {activeComponentID?.map((id) => {
        return (
          <Manager
            key={++mapKey.current}
            id={id}
            propsChange={propsChange}
            styleChange={styleChange}
          />
        )
      })}
      {activeComponentID && styleFields.includes("font-size") && (
        <InputNumber
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
        <InputNumber
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
        <InputNumber
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
        <DropOptions options={[{
          text : "style 1",
          callback : () => {alert("style 1 selected")}
        },{
          text : "istyle 1",
          callback : () => {alert("style 1 selected")}
        },{
          text : "ustyle 1",
          callback : () => {alert("style 1 selected")}
        },{
          text : "ustayle 2",
          callback : () => {alert("style 1 selected")}
        },{
          text : "ustyle 3",
          callback : () => {alert("style 1 selected")}
        },{
          text : "istyle 2",
          callback : () => {alert("style 1 selected")}
        },{
          text : "istyle 3",
          callback : () => {alert("style 1 selected")}
        },{
          text : "style 2",
          callback : () => {alert("style 1 selected")}
        }]}
        label="Font Style"
        />
      )}
    </div>
  )
}
