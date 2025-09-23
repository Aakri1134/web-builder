import { useEffect, useRef, useState } from "react"
import ModalPortal from "../../modals/ModalPortal"

type InputDropOptions = {
  className?: string
  label: string
  options: {
    text: string
    style?: string
    callback: () => void
  }[]
}

export default function DropOptions({
  options,
  className,
  label,
}: InputDropOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const selected = useRef<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const pos = useRef<{ left: number; top: number; height: number }>({
    left: 0,
    top: 0,
    height: 0,
  })

  useEffect(() => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    pos.current = {
      left: rect.left,
      top: rect.top,
      height: rect.height,
    }
  }, [options, inputRef.current])
  useEffect(() => {
    if (selected.current) {
      setDropdownVisible(false)
      selected.current = false
      return
    }
    if (value !== "") {
      setDropdownVisible(true)
    } else {
      setDropdownVisible(false)
    }
  }, [value])

  return (
    <div className={` relative ${className}`}>
      <h1 className=" text-white">{label}</h1>
      <input
        ref={inputRef}
        value={value}
        type="text"
        className=" text-white"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      {dropdownVisible && (
        <ModalPortal
          hideModal={() => {
            setDropdownVisible(false)
          }}
        >
          <div
            style={{
              position: "absolute",
              top: pos.current.top + pos.current.height,
              left: pos.current.left,
            }}
            className=" h-max-72 w-96 bg-red-300 z-[999]"
          >
            {options.map(({ text, callback }) => {
              if (text.includes(value))
                return (
                  <div
                    key={text}
                    onClick={() => {
                      callback()
                      selected.current = true
                      setValue(text)
                    }}
                  >
                    {text}
                  </div>
                )
              else return null
            })}
          </div>
        </ModalPortal>
      )}
    </div>
  )
}
