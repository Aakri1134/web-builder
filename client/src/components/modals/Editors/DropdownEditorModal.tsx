import { useEffect, useRef, useState } from "react"
import ModalPortal from "../ModalPortal"

interface InputDropdownEditor {
  position: {
    left: string
    top: string
  }
  toggleVisibility: () => void
  heading: string
  options: Option[]
  handleChange: (value: string | number) => void
  type: "text" | "number"
  value: string | number
}

export interface Option {
  value: number | string
  text: string
  style: React.CSSProperties
}

export default function DropdownEditorModal({
  options,
  position,
  toggleVisibility,
  handleChange,
  heading,
  type,
  value,
}: InputDropdownEditor) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const input = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    input.current?.focus()
  }, [input])

  const toggleDropdown = () => {
    setShowDropdown((x) => !x)
  }

  return (
    <div
      style={{
        position: "fixed",
        ...position,
        width: "100vw",
        maxWidth: "300px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <h1>{heading}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input
          ref={input}
          type={type}
          placeholder="Enter"
          value={value}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChange(value)
              toggleVisibility()
            }
          }}
        />
        <button onClick={toggleDropdown}>{showDropdown ? "o" : "i"}</button>
      </div>
        
        {showDropdown && 
        <ModalPortal hideModal={() => {setShowDropdown(false)}}>
        <div style={{
         display  : "flex",
         flexDirection : "column",
          width : "200px",
          maxHeight : "150px",
          overflowY: "scroll"
        }}>
          {options.map(({ value, text, style }: Option) => {
            return (
              <button
                key={text}
                style={{...style}}
                onClick={() => {
                  handleChange(value)
                }}
              >
                {text}
              </button>
            )
          })}
          </div>
          </ModalPortal>
          }
    </div>
  )
}
