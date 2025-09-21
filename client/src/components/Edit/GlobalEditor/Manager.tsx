import { useEffect } from "react"
import useComponentEdit from "../../../hooks/useComponentEdit"
import type { PropsChange, StyleChange } from "../GlobalEditor"

type InputManager = {
  id: string
  styleChange?: StyleChange | null
  propsChange?: PropsChange | null
}

export default function Manager({
  id,
  styleChange,
  propsChange,
}: InputManager) {
  const { setStyle, setProps } = useComponentEdit(id)
  useEffect(() => {
    if (styleChange)
      setStyle((x) => {
        return { ...x, [styleChange.key]: styleChange.value }
      })
  }, [styleChange?.key, styleChange?.value, setStyle])

  useEffect(() => {
    if (propsChange)
      setProps((x) => {
        return { ...x, [propsChange.key]: propsChange.value }
      })
  }, [propsChange?.key, propsChange?.value, setStyle])

  return <></>
}
