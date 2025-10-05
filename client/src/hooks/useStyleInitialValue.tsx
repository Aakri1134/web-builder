import { useEffect, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../recoil/atoms/component"
import { pushUndoLogs, type StyleLogs } from "../utils/VersionControl/undoLogs"
import type { validStyles } from "../utils/DSL/sanetizer"

export default function useStyleInitialValue<T = any>(
  property: validStyles["style"],
  type: "integer" | "float" | "string",
  autoLog: boolean = true,
  autoLogDelay: number = 500
) {
  const activeComponentID = useRecoilValue(currentComponentID)
  const [value, setValue] = useState<T | undefined>()
  const [separateValues, setSeparateValues] = useState<Record<string, T>>({})
  const previousValue = useRef<Record<string, T> | null>({})
  const logTimeout = useRef<number | undefined>()

  function handleLog() {
    // function isEqual(

    function topx(str: string) {
      if (type === "integer" || type === "float") {
        str = str + "px"
      }
      return str
    }

    if (value && previousValue.current) {
      let operations: StyleLogs["operations"] = []

      for (const id of Object.keys(previousValue.current)) {
        if (
          previousValue.current[id] != value &&
          activeComponentID?.includes(id)
        )
          operations.push({
            key: property as validStyles["style"],
            component: id,
            inital: topx((previousValue.current[id] ?? 0).toString()),
            final: topx((value ?? 0).toString()),
          })
      }
      if (operations.length > 0) {
        console.log(operations)
        pushUndoLogs({
          type: "style",
          operations: operations,
        })
        console.log("Logging complete")
        console.log(operations)
      }
    }
  }

  useEffect(() => {
    if (autoLog) {
      if (previousValue.current && value) {
        if (logTimeout.current) clearTimeout(logTimeout.current)
        logTimeout.current = setTimeout(() => {
          handleLog()

          if (previousValue.current) {
            previousValue.current = {}
            for (const id of activeComponentID ?? []) {
              previousValue.current[id] = value
            }
          }
        }, autoLogDelay)
      } else if (value) {
        previousValue.current = {}
        for (const id of activeComponentID ?? []) {
          if (separateValues[id]) previousValue.current[id] = separateValues[id]
          else if (value) previousValue.current[id] = value
          else
            console.log(
              `Unexpected :: Separate value of ${id} not found, so no previous value set !`
            )
        }
      }
    }
  }, [value])

  useEffect(() => {
    if (!activeComponentID) return
    let val: any = null
    let sep: Record<string, T> = {}
    for (const id of activeComponentID ?? []) {
      const ele = document.getElementById(id)
      if (ele) {
        let computedStyle = getComputedStyle(ele)[property as any]
        if (type === "integer") {
          computedStyle = Math.round(parseFloat(computedStyle)).toString()
        } else if (type === "float") {
          computedStyle = parseFloat(computedStyle).toString()
        }
        sep[id] = computedStyle as T
        if (val === null) {
          val = computedStyle
        } else if (val !== computedStyle) {
          val = -1
        }
      }
    }
    setSeparateValues(sep)
    previousValue.current = null
    setValue(val === -1 ? "--" : val)
  }, [activeComponentID, property])

  return [value, setValue] as const
}
