import { useEffect, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../../recoil/atoms/component"
import type { DSLComponent } from "../../../types/DSL"

type InputStyleNumber = {
  placeholder?: string
  handleChange: (input: string) => void
  label: string
  type: "style"
  keyString: keyof React.CSSProperties
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

type InputPropsNumber = {
  placeholder?: string
  handleChange: (input: string) => void
  label: string
  type: "props"
  keyString: keyof DSLComponent["props"]
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

type Input = InputStyleNumber | InputPropsNumber
export default function InputNumber({
  placeholder,
  handleChange,
  label,
  type,
  keyString,
  inputRef,
}: Input) {
  const activeComponentID = useRecoilValue(currentComponentID)
  const [initialValue, setInitialValue] = useState<string>("")
  const pushDuration = useRef<number>(1)
  const pushDurationResetTimeout = useRef<number>(0)

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (inputRef.current === document.activeElement) {
        if (e.shiftKey && e.key === "ArrowUp") {
          setInitialValue((x) => (Number(x) + 0.5).toString())
        } else if (e.shiftKey && e.key === "ArrowDown") {
          setInitialValue((x) => (Number(x) - 0.5).toString())
        } else if (e.key === "ArrowDown") {
          setInitialValue((x) =>
            (Number(x) - 1 * Math.floor(pushDuration.current)).toString()
          )
          pushDuration.current = 0.5 + pushDuration.current
          if (pushDurationResetTimeout.current) {
            clearTimeout(pushDurationResetTimeout.current)
          }
          pushDurationResetTimeout.current = setTimeout(() => {
            pushDuration.current = 0
          }, 300)
        } else if (e.key === "ArrowUp") {
          pushDuration.current = 0.5 + pushDuration.current
          setInitialValue((x) =>
            (Number(x) + 1 * Math.floor(pushDuration.current)).toString()
          )
          if (pushDurationResetTimeout.current) {
            clearTimeout(pushDurationResetTimeout.current)
          }
          pushDurationResetTimeout.current = setTimeout(() => {
            pushDuration.current = 0
          }, 300)
        }
      }
    }

    document.addEventListener("keydown", handleKeydown, { capture: true })
    return () => {
      document.removeEventListener("keydown", handleKeydown, { capture: true })
    }
  }, [])

  useEffect(() => {
    handleChange(`${initialValue}px`)
  }, [initialValue])

  useEffect(() => {
    if (keyString === "width") {
      console.log("width")
    }
    let val: number | null = null
    if (type === "style") {
      for (const id of activeComponentID ?? []) {
        const ele = document.getElementById(id)
        if (ele) {
          if (val === null) {
            val = parseFloat(getComputedStyle(ele)[keyString as any])
          } else if (
            val !== parseFloat(getComputedStyle(ele)[keyString as any])
          ) {
            val = -1
            break
          }
        }
      }
      console.log(val)
      if (val) {
        console.log("Inside If")
        val = Math.round(Number(val))
        setInitialValue(val == -1 ? "--" : val.toString())
      }
    }
  }, [activeComponentID, type, keyString])

  return (
    <div>
      <h1 className=" text-white text-xl font-bold">{label}</h1>
      <input
        ref={inputRef}
        type="number"
        placeholder={placeholder}
        className="  text-white appearance-none"
        value={initialValue}
        onChange={(e) => {
          setInitialValue(e.target.value)
        }}
      />
    </div>
  )
}
