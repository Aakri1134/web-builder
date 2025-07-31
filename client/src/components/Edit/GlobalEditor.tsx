import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import useComponentEdit from "../../hooks/useComponentEdit"
import { useRef } from "react"
import { checkPresence } from "../../utils/DSL/requirements"
import { getType } from "../../utils/DSL/typeMap"
import type { DSLComponent } from "../../utils/DSL/sanetizer"

export default function GlobalEditor() {
  const activeComponentID = useRecoilValue(currentComponentID)
  const textInput = useRef(null)

  if (activeComponentID === null) {
    return
  } else {
    //@ts-ignore
    const { style, setStyle, props, setProps } =
      useComponentEdit(activeComponentID)

    return (
      <div className=" min-w-[500px] bg-fuchsia-500 ">
        {props.text &&
          checkPresence(
            getType(activeComponentID) as DSLComponent["type"],
            "text"
          ) && (
            <div>
              <h1>Text</h1>
              <input
                ref={textInput}
                placeholder={props.text}
                type="text"
                value={props.text}
                onChange={(x) => {
                  setProps({ ...props, text: x.target.value })
                }}
              />
            </div>
          )}
      </div>
    )
  }
}
