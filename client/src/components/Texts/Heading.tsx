import React, { useState } from "react"
import ContextModal from "../modals/ContextModal"
import TextEditorModal from "../modals/Editors/TextEditorModal"

interface InputText {
  initial: string
  style?: React.CSSProperties
}

const Heading = ({ initial, style }: InputText) => {
  const [isContextModalVisible, setContextModalVisible] = useState<boolean>(false)
  const [positionModal, setPositionModal] = useState<[string, string]>(["0","0"])
  const [value, setValue] = useState(initial)
  const [isTextEditorModalVisible, setTextEditorModalVisible] = useState<boolean>(false)

  const handleChange = (value : string) => {
    setValue(value)
  }

  const handleRightClick = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    e.preventDefault()
    setPositionModal([e.pageX.toString(), e.pageY.toString()])
    setContextModalVisible(true)
  }

  const openTextEditorModal = () => {
    setContextModalVisible(false)
    setTextEditorModalVisible(true)
  }

  const hideModal = () => {
    setContextModalVisible(false)
  }

  return (
    <>
      {isContextModalVisible && (
        <ContextModal
          position={{
            top: `${positionModal[1]}px`,
            left: `${positionModal[0]}px`
          }}
          hideModal={hideModal}
          options={[
            {
              name : "Edit Text",
              callback : openTextEditorModal
            }
          ]}
        />
      )}
      {
        isTextEditorModalVisible && 
        <TextEditorModal 
        initial={value} 
        position={{top : `${positionModal[1]}px`, left : `${positionModal[0]}px`}}
        handleChange={handleChange}
        toggleVisibility={() => {setTextEditorModalVisible(false)}}/>
      }
      <h1
        style={{
          ...style,
        }}
        onContextMenu={handleRightClick}
      >
        {value}
      </h1>
    </>
  )
}

export default Heading
