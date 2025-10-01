import { useEffect, useRef } from "react"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { logs } from "../../../recoil/atoms/logs"
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
  const setLogs = useSetRecoilState(logs)
  const activeComponentID = useRecoilValue(currentComponentID)

  useEffect(() => {
    if (typeof initialValue === "string") {
      setInitialValue(Math.round(parseFloat(initialValue)))
    }
  }, [initialValue])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (inputRef.current === document.activeElement) {
        if (e.shiftKey && e.key === "ArrowUp") {
          setInitialValue((x) => {
            if (x) return x + 0.5
          })
        } else if (e.shiftKey && e.key === "ArrowDown") {
          setInitialValue((x) => {
            if (x) return x - 0.5
          })
        } else if (e.key === "ArrowDown") {
          setInitialValue((x) => {
            if (x) return x - 1 * Math.floor(pushDuration.current)
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
            if (x) return x + 1 * Math.floor(pushDuration.current)
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

    function isEqual(arr1 : any, arr2 : any) : boolean{
      if(typeof arr1 !== typeof arr2){
        return false
      }
      if(arr1.length !== arr2.length){
        return false
      }
      for(let i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]){
          return false
        }
      }
      return true
    }

    handleChange(`${initialValue}px`)
    console.log(previousValue.current )
    console.log(initialValue )
    console.log(previousValue.current )
    console.log(previousValue.current )
    if (
      initialValue &&
      previousValue.current?.value !== initialValue &&
      isEqual(activeComponentID, previousValue.current?.id)
    ) {
      alert(
        `pushing logs \ninitial :: ${previousValue.current}\nfinal :: ${initialValue}`
      )
      setLogs((x) =>
        x.push({
          type: "style",
          component: activeComponentID || [],
          key: keyString as validStyles["style"],
          inital: (previousValue.current ?? 0).toString(),
          final: (initialValue ?? 0).toString(),
        })
      )
      previousValue.current = {
        id: activeComponentID,
        value: initialValue,
      }
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
        value={initialValue}
        onChange={(e) => {
          setInitialValue(Number(e.target.value))
        }}
      />
    </div>
  )
}
