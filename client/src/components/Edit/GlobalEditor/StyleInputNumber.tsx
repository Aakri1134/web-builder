import { useEffect, useRef } from "react"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../../recoil/atoms/component"
import type { validStyles } from "../../../utils/DSL/sanetizer"

type Input = {
  placeholder?: string
  handleChange: (input: string) => void
  label: string
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  inputClassname?: string
  labelClassname?: string
  divClassname?: string
  type: "style"
  keyString: validStyles["style"]
}
export default function StyleInputNumber({
  placeholder,
  handleChange,
  label,
  keyString,
  inputRef,
  inputClassname = "",
  divClassname = "",
  labelClassname = "",
}: Input) {
  const [initialValue, setInitialValue] =
    useStyleInitialValue<number>(keyString, "integer")
  const pushDuration = useRef<number>(1)
  const pushDurationResetTimeout = useRef<number>(0)
  const activeComponentID = useRecoilValue(currentComponentID)

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur()
        }
      }
    }

    document.addEventListener("keydown", handleKeydown, { capture: true })
    return () => {
      document.removeEventListener("keydown", handleKeydown, { capture: true })
    }
  }, [inputRef.current, initialValue, activeComponentID])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (inputRef.current === document.activeElement) {
        if (e.shiftKey && e.key === "ArrowUp") {
          setInitialValue((x) => {
            if (x !== undefined) return x + 0.5
            return 0 // Fallback
          })
        } else if (e.shiftKey && e.key === "ArrowDown") {
          setInitialValue((x) => {
            if (x !== undefined) return x - 0.5
            return 0
          })
        } else if (e.key === "ArrowDown") {
          setInitialValue((x) => {
            if (x !== undefined) return x - 1 * Math.floor(pushDuration.current)
            return 0
          })
          pushDuration.current = 1 + pushDuration.current
          if (pushDurationResetTimeout.current) {
            clearTimeout(pushDurationResetTimeout.current)
          }
          pushDurationResetTimeout.current = setTimeout(() => {
            pushDuration.current = 0
          }, 300)
        } else if (e.key === "ArrowUp") {
          pushDuration.current = 1 + pushDuration.current
          setInitialValue((x) => {
            if (x !== undefined) return x + 1 * Math.floor(pushDuration.current)
            return 0
          })
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
    if (initialValue !== undefined) {
      handleChange(`${initialValue}px`)
    }
  }, [initialValue])

  return (
    <div className={`${divClassname}`}>
      <h1 className={` text-white text-xl font-bold ${labelClassname}`}>
        {label}
      </h1>
      <input
        ref={inputRef}
        type="number"
        placeholder={placeholder ?? "--"}
        className={` text-white appearance-none ${inputClassname}`}
        value={initialValue ?? ""} /* ✅ Always controlled */
        onChange={(e) => {
          setInitialValue(Number(e.target.value) || 0)
        }}
      />
    </div>
  )
}
