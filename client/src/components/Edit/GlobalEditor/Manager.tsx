import { useEffect } from "react"
import useComponentEdit from "../../../hooks/useComponentEdit"
import type { PropsChange, StyleChange } from "../GlobalEditor"

type InputManager = {
  id: string
  styleChange: StyleChange | null
  propsChange: PropsChange | null
  handleStyleChangeComplete: () => void
  handlePropsChangeComplete: () => void
  forceUpdate: () => void
}

export default function Manager({
  id,
  styleChange,
  propsChange,
  handlePropsChangeComplete,
  handleStyleChangeComplete,
  forceUpdate,
}: InputManager) {
  const { setStyle, setProps } = useComponentEdit(id)

  useEffect(() => {
    if (styleChange) {
      // console.log("SetStyleCHange Successful for ", id)
      // console.log(styleChange)

      const newStyle: { [key: string]: any } = {}

      for (const change of styleChange) {
        newStyle[change.key] = change.value
      }

      setStyle((x) => {
        return { ...x, ...newStyle }
      })
      handleStyleChangeComplete()
      forceUpdate()
    } else {
      // console.log("SetStyleChange Unsuccessful")
    }
  }, [styleChange, setStyle])

  useEffect(() => {
    if (propsChange) {
      const newProps: { [key: string]: any } = {}

      for (const change of propsChange) {
        newProps[change.key] = change.value
      }

      setProps((x) => {
        return { ...x, ...newProps }
      })
      handlePropsChangeComplete()
      forceUpdate()
    }
  }, [propsChange, setStyle])

  return <></>
}
