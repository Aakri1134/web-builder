import React, { useEffect, useState } from "react"
import ContextModal from "./ContextModal"
import TextInputModal from "./TextInputModal"

interface InputHeading {
  initialValue: string
  style?: React.CSSProperties
}

const Heading = ({ initialValue, style }: InputHeading) => {
  const [value, setValue] = useState(initialValue)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalPosition, setModalPosition] = useState<[string, string]>([
    "0",
    "0",
  ])
  const [textEditModalVisible, setTextEditModalVisible] =
    useState<boolean>(false)

  const handleChange = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    console.log("Modal position set to:", modalPosition)
  }, [modalPosition])

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault()
    e.stopPropagation()
    setModalVisible((x) => !x)
    const x = e.pageX.toString()
    const y = e.pageY.toString()

    setModalPosition([x, y])
  }

  //option 1 opens Text Editor
  const handleSelectOption1 = () => {
    setModalVisible((x) => !x)
    setTextEditModalVisible((x) => !x)
    console.log("hello")
  }

  const handleVisibilityToggleContextModal = () => {
    setModalVisible((x) => !x)
  }

  const handleVisibilityToggleTextModal = () => {
    setTextEditModalVisible((x) => !x)
  }

  const selectedStyle: React.CSSProperties = {
    scale: 1,
    transform: "translateY(-10px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  }

  return (
    <div onContextMenu={handleRightClick}>
      {modalVisible && (
        <ContextModal
          style={{
            left: `${modalPosition[0]}px`,
            top: `${modalPosition[1]}px`,
          }}
          option1={handleSelectOption1}
          visibilityToggle={handleVisibilityToggleContextModal}
        />
      )}
      {textEditModalVisible && (
        <TextInputModal
          style={{
            left: `${modalPosition[0]}px`,
            top: `${modalPosition[1]}px`,
          }}
          initial={value}
          visibilityToggle={handleVisibilityToggleTextModal}
          handleChange={handleChange}
        />
      )}
      <h1
        style={{
          ...(modalVisible || textEditModalVisible ? selectedStyle : {}),
          ...style,
        }}
      >
        {value}
      </h1>
    </div>
  )
}

export default Heading
