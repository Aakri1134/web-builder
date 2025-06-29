import type React from "react"
import { useEffect, useRef, useState } from "react"

interface InputTextInputModal {
  heading?: string | null
  style: React.CSSProperties
  initial: string
  visibilityToggle: () => void
  handleChange: (value: string) => void
}

const TextInputModal = ({
  heading = null,
  style,
  initial,
  visibilityToggle,
  handleChange,
}: InputTextInputModal) => {
  const [value, setValue] = useState(initial)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const clickHandle = ( ) =>{
    visibilityToggle()
  }

  return (
    <div
      style={{
        inset: 0,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      onClick={clickHandle}
    >
      {heading && <h1>{heading}</h1>}
      <div
        style={{
            ...style,
            position: "fixed",
            display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <input
          ref={inputRef}
          placeholder="Enter..."
          style={{

          }}          
          value={value}
          onChange={(e) => {
            e.stopPropagation()
            setValue(e.target.value)
            handleChange(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              visibilityToggle()
            }
          }}
        />
      </div>
    </div>
  )
}

export default TextInputModal
