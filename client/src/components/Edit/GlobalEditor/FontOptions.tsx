import { useEffect, useRef, useState } from "react"
import ModalPortal from "../../modals/ModalPortal"
import {
  fontFamily,
  fontImports,
  fontStyle,
  hasFontLoadFailed,
  loadFont,
  type FontName,
} from "../../../utils/Editor/fontManager"
import FontEditButtons from "./FontEditButtons"
import WeightOptions from "./WeightOptions"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"

type Input = {
  handleSelect: (value: {
    family?: FontName
    style?: {
      italic : boolean
    }
    weight?: number
  }) => void
}

export default function FontOptions({ handleSelect }: Input) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const selected = useRef<boolean>(false)
  const [value, setValue] = useStyleInitialValue("fontFamily")
  const [familyDropdownVisible, setFamilyDropdownVisible] = useState<boolean>(false)
  const [_, forceUpdate] = useState<number>(0)
  const familyDropdownPos = useRef<{
    left: number
    top: number
    height: number
  }>({
    left: 0,
    top: 0,
    height: 0,
  })
  const [currentFamily, setCurrentFamily] =
    useState<FontName>("Times New Roman")

  useEffect(() => {
    async function loadInitialFonts() {
      try {
        const keys = Object.keys(fontImports)
        await Promise.all([
          loadFont(keys[0] as FontName),
          loadFont(keys[1] as FontName),
          loadFont(keys[2] as FontName),
          loadFont(keys[3] as FontName),
          loadFont(keys[4] as FontName),
          loadFont(keys[5] as FontName),
        ])
      } catch (e) {
        // TODO add sentry logs for handling dead fonts
      }
    }

    loadInitialFonts()
  }, [])

  useEffect(() => {
    if (!dropdownRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        let promises: Promise<boolean>[] = []
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            promises.push(loadFont(entry.target.textContent as FontName))
          }
        })
        Promise.all(promises).then(() => {
          forceUpdate(0)
        })
      },
      {
        root: dropdownRef.current,
        threshold: 0.1,
        rootMargin: "0px 0px 100px 0px",
      }
    )

    const children = dropdownRef.current.querySelectorAll("[data-font-option]")
    children.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [familyDropdownVisible])

  useEffect(() => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    familyDropdownPos.current = {
      left: rect.left,
      top: rect.top,
      height: rect.height,
    }
  }, [inputRef.current, familyDropdownVisible])

  useEffect(() => {
    if (selected.current) {
      setFamilyDropdownVisible(false)
      selected.current = false
      return
    }
    if (value !== "") {
      setFamilyDropdownVisible(true)
    } else {
      setFamilyDropdownVisible(false)
    }
  }, [value])

  useEffect(() => {
    function handleFocus() {
      if (document.activeElement === inputRef.current) {
        setFamilyDropdownVisible(true)
      }
    }

    document.addEventListener("focusin", handleFocus)

    return () => {
      document.removeEventListener("focusin", handleFocus)
    }
  }, [])

  return (
    <div className={` relative`}>
      <h1 className=" text-white">Font Family</h1>
      <input
        ref={inputRef}
        value={value}
        type="text"
        className=" text-white"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      {familyDropdownVisible && (
        <ModalPortal
          hideModal={() => {
            setFamilyDropdownVisible(false)
          }}
        >
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top:
                familyDropdownPos.current.top +
                familyDropdownPos.current.height,
              left: familyDropdownPos.current.left,
              maxHeight: 180,
              overflowY: "scroll",
            }}
            className=" no-scrollbar w-96 bg-red-300 z-[999] "
          >
            {(Object.keys(fontImports) as FontName[]).map((text) => {
              if (
                value !== "" &&
                !text.toLowerCase().includes(value.toLowerCase())
              )
                return null
              if (!hasFontLoadFailed(text))
                return (
                  <div
                    key={text}
                    data-font-option
                    onClick={() => {
                      handleSelect({
                        family: currentFamily,
                      })
                      selected.current = true
                      setCurrentFamily(text)
                      setValue(text)
                    }}
                    style={{
                      fontFamily: fontFamily[text],
                      fontStyle: fontStyle[text][0],
                      fontWeight: 400,
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
      <FontEditButtons

        family={currentFamily}
        handleSelect={() => {
          // alert("") working
        }}
      />
      <WeightOptions
        family={currentFamily}
        handleSelect={() => {
          // alert() working
        }}
      />
    </div>
  )
}
