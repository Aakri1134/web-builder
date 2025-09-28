import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../recoil/atoms/component"

type Input = keyof React.CSSProperties

export default function useStyleInitialValue( property : Input) {
  const activeComponentID = useRecoilValue(currentComponentID)
  const [value, setValue] = useState<any>()

  useEffect(() => {
    if (!activeComponentID) return
    let val: any = null
    for (const id of activeComponentID ?? []) {
      const ele = document.getElementById(id)
      if (ele) {
        if (val === null) {
          val = getComputedStyle(ele)[property as any]
        } else if (val !== getComputedStyle(ele)[property as any]) {
          val = -1
          break
        }
      }
    }
    setValue(val === -1 ? "--" : val)
  }, [activeComponentID])

  return [ value, setValue ]
}
