import React from "react"

interface ContextModalProps {
  style?: React.CSSProperties
  option1?: boolean
  option2?: boolean
  option3?: boolean
  visibilityToggle: () => void
}

const ContextModal = ({
  style,
  option1 = false,
  option2 = false,
  option3 = false,
  visibilityToggle,
}: ContextModalProps) => {
  const clickHandle = (): void => {
    visibilityToggle()
  }
  return (
    <div
      style={{
        inset: 0,
        position: "absolute",
        backgroundColor : "rgba(0,0,0,0.4)"
      }}
      onClick={clickHandle}
    >
      <div
        style={{
          position: "absolute",
          ...style,
          backgroundColor: "rgba(255, 255, 61, 0.8)",
          display: "flex",
          flexDirection: "column",
          height: "200px",
          width: "100px",
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {option1 && (
          <div>
            <h1>Options 1</h1>
          </div>
        )}
        {option2 && (
          <div>
            <h1>Options 2</h1>
          </div>
        )}
        {option3 && (
          <div>
            <h1>Options 3</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContextModal
