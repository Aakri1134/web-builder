import { useEffect, useState } from "react"
import { fonts, fontStyle, type FontName } from "../../../utils/Editor/fontManager"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"

type Input = {
  family: FontName
  handleSelect: (value: { italic: boolean }) => void
}

export default function FontEditButtons({ family, handleSelect }: Input) {
  const [init, _] = useStyleInitialValue("fontStyle", "string")
  const [isItalic, setIsItalic] = useState<boolean>(false)
  useEffect(() => {
    setIsItalic(init === "italic")
  }, [init])
  useEffect(() => {
    if (fontStyle[family].includes("normal")) {
      setIsItalic(false)
    } else {
      setIsItalic(true)
    }
  }, [family])
  useEffect(() => {
    handleSelect({
      italic: isItalic,
    })
  }, [isItalic])

  return (
    <>
      {fonts.includes(family) && fontStyle[family] && fontStyle[family].includes("italic") && (
        <div>
          <div
            style={{
              borderWidth: isItalic ? 1 : 0,
            }}
            className=" h-6 w-6 bg-slate-600 italic text-center rounded-sm text-white"
            onClick={() => {
              setIsItalic((x) => !x)
            }}
          >
            I
          </div>
        </div>
      )}
    </>
  )
}
