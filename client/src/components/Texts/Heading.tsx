import React, { useState } from "react"
import ContextModal from "../modals/ContextModal"
import TextEditorModal from "../modals/Editors/TextEditorModal"
import ModalPortal from "../modals/ModalPortal"

interface InputText {
  initial: string
  style: React.CSSProperties
}

const Heading = ({ initial, style }: InputText) => {
  const [isContextModalVisible, setContextModalVisible] =
    useState<boolean>(false)
  const [positionModal, setPositionModal] = useState<[string, string]>([
    "0",
    "0",
  ])
  const [value, setValue] = useState(initial)
  const [isTextEditorModalVisible, setTextEditorModalVisible] =
    useState<boolean>(false)
  const [fontSize, setFontSize] = useState<string | number | undefined>(
    style.fontSize || 32
  )
  const [lineHeight, setLineHeight] = useState<string | number | undefined>(
    style.lineHeight || "normal"
  )
  const [fontWeight, setFontWeight] = useState<string | number | undefined>(
    style.fontWeight || "bold"
  )
  const [height, setHeight] = useState<string | number | undefined>(
    style?.height || "auto"
  )
  const [link, setLink] = useState<string | null>()
  const [fontFamily, setFontFamily] = useState<string>(
    style.fontFamily || "sans-serif"
  )
  const [fontColor, setFontColor] = useState<string | undefined>(
    style.color || "#000"
  ) // TODO later update with theme color
  const [margin, setMargin] = useState<
    [string | number, string | number, string | number, string | number]
  >(
    style !== undefined
      ? style.margin
        ? [style.margin, style.margin, style.margin, style.margin]
        : [
            style.marginTop || 0,
            style.marginLeft || 0,
            style.marginBottom || 0,
            style.marginRight || 0,
          ]
      : [0, 0, 0, 0]
  )
  const [padding, setPadding] = useState<
    [string | number, string | number, string | number, string | number]
  >(
    style !== undefined
      ? style.padding
        ? [style.padding, style.padding, style.padding, style.padding]
        : [
            style.paddingTop || 0,
            style.paddingLeft || 0,
            style.paddingBottom || 0,
            style.paddingRight || 0,
          ]
      : [0, 0, 0, 0]
  )

  const handleRightClick = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    e.preventDefault()
    setPositionModal([e.clientX.toString(), e.clientY.toString()])
    setContextModalVisible(true)
  }

  const openTextEditorModal = () => {
    setContextModalVisible(false)
    setTextEditorModalVisible(true)
  }

  const hideModal = () => {
    setContextModalVisible(false)
    setTextEditorModalVisible(false)
  }

  return (
    <>
      {isContextModalVisible && (
        <ModalPortal hideModal={hideModal}>
          <ContextModal
            position={{
              top: `${positionModal[1]}px`,
              left: `${positionModal[0]}px`,
            }}
            options={[
              {
                name: "Edit Text",
                callback: openTextEditorModal,
              },
              {
                name: "123",
                callback: () => {
                  alert("Demo")
                },
              },
            ]}
          />
        </ModalPortal>
      )}
      {isTextEditorModalVisible && (
        <ModalPortal hideModal={hideModal}>
          <TextEditorModal
            heading="Edit Text"
            initial={value}
            position={{
              top: `${positionModal[1]}px`,
              left: `${positionModal[0]}px`,
            }}
            handleChange={setValue}
            toggleVisibility={hideModal}
          />
        </ModalPortal>
      )}
      <h1
        style={{
          ...style,
          fontSize: fontSize,
          color: fontColor,
          height: height,
          lineHeight: lineHeight,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          marginTop: margin[0],
          marginLeft: margin[1],
          marginBottom: margin[2],
          marginRight: margin[3],
          paddingTop: padding[0],
          paddingLeft: padding[1],
          paddingBottom: padding[2],
          paddingRight: padding[3],
        }}
        onContextMenu={handleRightClick}
      >
        {value}
      </h1>
    </>
  )
}

export default Heading
