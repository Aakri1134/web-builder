import React from "react"

interface ContextModalProps {
  style?: React.CSSProperties
  option1: () => any 
  option2?: () => void | null
  option3?: () => void | null
  visibilityToggle: () => void
}

const ContextModal = ({
  style,
  option1 ,
  option2 ,
  option3 ,
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
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      onClick={clickHandle}
    >
      <div
        style={{
          position: "fixed",
          ...style,
          backgroundColor: "rgba(255, 255, 61, 0.7)",
          display: "flex",
          flexDirection: "column",
          height: "fit",
          width: "200px",
          borderRadius: 10,
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button onClick={()=>{option1()}}>Option1</button>
        {option2 && <p>Options 2</p>}
        {option3 && <p>Options 3</p>}
      </div>
    </div>
  )
}

export default ContextModal
