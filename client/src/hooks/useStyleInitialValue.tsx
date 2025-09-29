import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../recoil/atoms/component"


export default function useStyleInitialValue<INPUT_TYPE = any>( property : keyof React.CSSProperties) {
  const activeComponentID = useRecoilValue(currentComponentID)
  const [value, setValue] = useState<INPUT_TYPE | undefined>()

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
  }, [activeComponentID, property])

  return [ value, setValue ] as const
}
