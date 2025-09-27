import { useEffect, useRef, useState } from "react"
import ModalPortal from "../../modals/ModalPortal"
import {
  fontImports,
  hasFontLoadFailed,
  loadFont,
  type FontName,
} from "../../../utils/Editor/fontManager"

type Input = {
  handleSelect: (value: FontName) => void
}

export default function FontOptions({ handleSelect }: Input) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const selected = useRef<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const indexLoaded = useRef<number>(0)
  const pos = useRef<{ left: number; top: number; height: number }>({
    left: 0,
    top: 0,
    height: 0,
  })

  useEffect(() => {
    async function loadInitialFonts() {
      try {
        await Promise.all([
          loadFont(Object.keys(fontImports)[0] as FontName),
          loadFont(Object.keys(fontImports)[1] as FontName),
          loadFont(Object.keys(fontImports)[2] as FontName),
          loadFont(Object.keys(fontImports)[3] as FontName),
          loadFont(Object.keys(fontImports)[4] as FontName),
        ])
      } catch (e) {
        // TODO add sentry logs
      }
    }

    loadInitialFonts()
    indexLoaded.current = 4
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.textContent)
        }
      })
    })
    if (dropdownRef.current) observer.observe(dropdownRef.current)
    return () => {
      observer.disconnect()
    }
  }, [dropdownRef.current])

  useEffect(() => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    pos.current = {
      left: rect.left,
      top: rect.top,
      height: rect.height,
    }
  }, [inputRef.current])

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
    <div className={` relative`}>
      <h1
        style={{
          fontStyle: "",
        }}
        className=" text-white"
      >
        Font Style
      </h1>
      <input
        ref={inputRef}
        value={value}
        type="text"
        className=" text-white"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <button
        className=" h-4 w-4 bg-red-500"
        onClick={() => {
          setDropdownVisible((x) => !x)
        }}
      />
      {dropdownVisible && (
        <ModalPortal
          hideModal={() => {
            setDropdownVisible(false)
          }}
        >
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: pos.current.top + pos.current.height,
              left: pos.current.left,
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
                    onClick={() => {
                      handleSelect(text)
                      selected.current = true
                      setValue(text)
                    }}
                    style={{
                      fontFamily: text,
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
