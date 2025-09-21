import { useRecoilValue, type SetterOrUpdater } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import useComponentEdit from "../../hooks/useComponentEdit"
import { useEffect, useRef, useState } from "react"
import { checkPresence } from "../../utils/DSL/requirements"
import { getType } from "../../utils/DSL/typeMap"
import type { DSLComponent } from "../../types/DSL"
import {
  getStyleRequirementsIntersection,
  type StyleEditProperty,
} from "../../utils/Editor/requirements"
import Manager from "./GlobalEditor/Manager"

// export default function GlobalEditor() {
//   const activeComponentID = useRecoilValue(currentComponentID)
//   const textInput = useRef(null)
//     //@ts-ignore
//     const { style, setStyle, props, setProps } =
//       useComponentEdit(activeComponentID)

//     if(activeComponentID === null) return null

//     return (
//       <div className=" min-w-[500px] bg-fuchsia-500 ">
//         {props.text &&
//           checkPresence(
//             getType(activeComponentID) as DSLComponent["type"],
//             "text"
//           ) && (
//             <div>
//               <h1>Text</h1>
//               <input
//                 ref={textInput}
//                 placeholder={props.text}
//                 type="text"
//                 value={props.text}
//                 onChange={(x) => {
//                   setProps({ ...props, text: x.target.value })
//                 }}
//               />
//             </div>
//           )}
//       </div>
//     )
//   }

export type PropsChange = {
  key: keyof DSLComponent["props"]
  value: string
}
export type StyleChange = {
  key: keyof Partial<React.CSSProperties>
  value: string
}

export default function GlobalEditor() {
  const activeComponentID = useRecoilValue(currentComponentID)
  const [styleFields, setStyleFields] = useState<StyleEditProperty[]>([])
  const [styleChange, setStyleChamge] = useState<StyleChange | null>()
  const [propsChange, setPropsChamge] = useState<PropsChange | null>()

  useEffect(() => {
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
    <div className=" bg-gray-800 w-96 h-screen">
      {activeComponentID?.map((id) => {
        return <Manager id={id} propsChange={propsChange} styleChange={styleChange}/>
      })}
      <h2>{activeComponentID}</h2>
    </div>
  )
}
