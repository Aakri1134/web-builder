import React, { useRef, useState } from "react"
import ContextModal, { type EditTokens } from "../modals/ContextModal"
import TextEditorModal from "../modals/Editors/TextEditorModal"
import ModalPortal from "../modals/ModalPortal"
import type { Option } from "../modals/Editors/DropdownEditorModal"
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
  heightOptions,
  lineHeightOptions,
} from "../../utils/DropdownOptions"
import DropdownEditorModal from "../modals/Editors/DropdownEditorModal"

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
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const responseModalChangeFunction =
    useRef<React.Dispatch<React.SetStateAction<string | number | undefined>>>(
      null
    )
  const responseModalType = useRef<"text" | "number">("text")
  const responseModalValue = useRef<string | number>("")
  const [ResponseModalHeading, setResponseModalHeading] = useState<string>("")
  const [fontSize, setFontSize] = useState<string | number>(
    style.fontSize || 32
  )
  const [lineHeight, setLineHeight] = useState<string | number>(
    style.lineHeight || "normal"
  )
  const [fontWeight, setFontWeight] = useState<string | number>(
    style.fontWeight || 400
  )
  const [height, setHeight] = useState<string | number>(style?.height || "auto")
  // const [link, setLink] = useState<string | null>()
  const [fontFamily, setFontFamily] = useState<string>(
    style.fontFamily || "'Roboto'"
  )
  const [fontColor, setFontColor] = useState<string>(style.color || "#000") // TODO later update with theme color
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

  const openDropdownModal = (
    options: Option[],
    heading: string,
    changeFunction: React.Dispatch<React.SetStateAction<any>>,
    initial: string | number
  ) => {
    responseModalValue.current = initial
    responseModalChangeFunction.current = changeFunction
    setDropdownOptions(options)
    setResponseModalHeading(heading)
    setShowDropdown(true)
  }

  const handleModalResponse = ({ token }: EditTokens) => {
    hideModal()
    switch (token) {
      case "text":
        openTextEditorModal()
        break
      case "weight":
        openDropdownModal(
          fontWeightOptions,
          "Edit Weight",
          setFontWeight,
          fontWeight
        )
        responseModalType.current = "number"
        break
      case "family":
        openDropdownModal(
          fontFamilyOptions,
          "Edit style",
          setFontFamily,
          fontFamily
        )
        responseModalType.current = "text"
        break
      case "size":
        openDropdownModal(fontSizeOptions, "Edit size", setFontSize, fontSize)
        responseModalType.current = "number"
        break
      case "line-height":
        openDropdownModal(
          lineHeightOptions,
          "Edit line height",
          setLineHeight,
          lineHeight
        )
        responseModalType.current = "number"
        break
      case "height":
        openDropdownModal(heightOptions, "Edit Height", setHeight, height)
        responseModalType.current = "number"
        break
      default:
        alert("Invalid Option")
    }
  }

  const hideModal = () => {
    setContextModalVisible(false)
    setTextEditorModalVisible(false)
    setShowDropdown(false)
  }

  const handleDropdownChange = (value: string | number) => {
    if (responseModalChangeFunction.current) {
      responseModalValue.current = value
      responseModalChangeFunction.current(value)
    }
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
            handleResponse={handleModalResponse}
            options={[
              {
                name: "Text",
                token: "text",
              },
              {
                name: "Weight",
                token: "weight",
              },
              {
                name: "Style",
                token: "family",
              },
              {
                token: "size",
                name: "Size",
              },
              {
                token: "line-height",
                name: "Line Height",
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
      {showDropdown && (
        <ModalPortal hideModal={hideModal}>
          <DropdownEditorModal
            type={responseModalType.current}
            options={dropdownOptions}
            position={{
              top: `${positionModal[1]}px`,
              left: `${positionModal[0]}px`,
            }}
            toggleVisibility={hideModal}
            handleChange={handleDropdownChange}
            heading={ResponseModalHeading}
            value={responseModalValue.current}
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

//TODO values update not working as needed
