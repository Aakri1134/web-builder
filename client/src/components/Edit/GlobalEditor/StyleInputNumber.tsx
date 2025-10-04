import { useEffect, useRef } from "react"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"
import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../../recoil/atoms/component"
import type { validStyles } from "../../../utils/DSL/sanetizer"
import { pushUndoLogs } from "../../../utils/VersionControl/undoLogs"

type Input = {
  placeholder?: string
  handleChange: (input: string) => void
  label: string
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  inputClassname?: string
  labelClassname?: string
  divClassname?: string
  type: "style"
  keyString: keyof React.CSSProperties
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
    useStyleInitialValue<number>(keyString)
  const pushDuration = useRef<number>(1)
  const pushDurationResetTimeout = useRef<number>(0)
  const previousValue = useRef<{ id: string[] | null; value: number }>()
  const activeComponentID = useRecoilValue(currentComponentID)

  function handleLog() {
    function isEqual(arr1: any, arr2: any): boolean {
      if (arr1 === arr2) return true // Handle null/undefined
      if (!arr1 || !arr2) return false // One is null/undefined
      if (arr1.length !== arr2.length) return false
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
      }
      return true
    }
    
    if (
      initialValue !== undefined &&
      previousValue.current?.value !== initialValue &&
      isEqual(activeComponentID, previousValue.current?.id)
    ) {
      pushUndoLogs({
          type: "style",
          component: activeComponentID || [],
          key: keyString as validStyles["style"],
          inital: (previousValue.current?.value ?? 0).toString() + "px",
          final: (initialValue ?? 0).toString() + "px",
        }
      )
      previousValue.current = {
        id: activeComponentID,
        value: initialValue,
      }
    }
  }

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (document.activeElement === inputRef.current) {
          handleLog()
          inputRef.current?.blur()
        }
      }
    }

    function handleFocusOut(e: FocusEvent) {
      if (e.target === inputRef.current) {
        handleLog()
      }
    }

    document.addEventListener("keydown", handleKeydown, { capture: true })
    document.addEventListener("focusout", handleFocusOut)
    return () => {
      document.removeEventListener("keydown", handleKeydown, { capture: true })
      document.removeEventListener("focusout", handleFocusOut)
    }
  }, [inputRef.current, initialValue, activeComponentID]) // ⚠️ Add dependencies

  useEffect(() => {
    if (typeof initialValue === "string") {
      setInitialValue(Math.round(parseFloat(initialValue)))
      previousValue.current ={id : activeComponentID, value : Math.round(parseFloat(initialValue))}
    }
  }, [initialValue])

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
          pushDuration.current = 0.5 + pushDuration.current
          if (pushDurationResetTimeout.current) {
            clearTimeout(pushDurationResetTimeout.current)
          }
          pushDurationResetTimeout.current = setTimeout(() => {
            pushDuration.current = 0
          }, 300)
        } else if (e.key === "ArrowUp") {
          pushDuration.current = 0.5 + pushDuration.current
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
        placeholder={placeholder}
        className={` text-white appearance-none ${inputClassname}`}
        value={initialValue ?? ""} /* ✅ Always controlled */
        onChange={(e) => {
          setInitialValue(Number(e.target.value) || 0)
        }}
      />
    </div>
  )
}