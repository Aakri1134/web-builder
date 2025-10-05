import { useEffect } from "react"
import useComponentEdit from "../../../hooks/useComponentEdit"
import type { PropsChange, StyleChange } from "../GlobalEditor"

type InputManager = {
  id: string
  styleChange: StyleChange | null
  propsChange: PropsChange | null
  handleStyleChangeComplete: () => void
  handlePropsChangeComplete: () => void
  forceUpdate : () => void
}

export default function Manager({
  id,
  styleChange,
  propsChange,
  handlePropsChangeComplete,
  handleStyleChangeComplete,
  forceUpdate
}: InputManager) {
  const { setStyle, setProps } = useComponentEdit(id)

  useEffect(() => {
    if (styleChange) {
      // console.log("SetStyleCHange Successful for ", id)
      // console.log(styleChange)
      setStyle((x) => {
        return { ...x, [styleChange.key]: styleChange.value }
      })
      handleStyleChangeComplete()
      forceUpdate()
    }
    else {
      // console.log("SetStyleChange Unsuccessful")
    }
  }, [styleChange?.key, styleChange?.value, styleChange?.id, setStyle])

  useEffect(() => {
    if (propsChange) {
      setProps((x) => {
        return { ...x, [propsChange.key]: propsChange.value }
      })
      handlePropsChangeComplete()
      forceUpdate()
    }
  }, [propsChange?.key, propsChange?.value, propsChange?.id, setStyle])

  return <></>
}
