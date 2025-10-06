import { useEffect, useRef, useState } from "react"
import { fontFamily, type FontName } from "../../../utils/Editor/fontManager"
import ModalPortal from "../../modals/ModalPortal"
import useStyleInitialValue from "../../../hooks/useStyleInitialValue"

type Input = {
  family: FontName
  handleSelect: (value: number) => void
}

export default function WeightOptions({ family, handleSelect }: Input) {
  const weightInputRef = useRef<HTMLInputElement | null>(null)
  const [weightDropdownVisible, setWeightDropdownVisible] =
    useState<boolean>(false)
  const weightDropdownPos = useRef<{
    left: number
    top: number
    height: number
  }>({
    left: 0,
    top: 0,
    height: 0,
  })
  const validWeights = useRef<number[]>([100, 300, 500, 700, 900])

  const [currentWeight, setCurrentWeight] = useStyleInitialValue<number>(
    "fontWeight",
    "string"
  )

  useEffect(() => {
    if (currentWeight) handleSelect(currentWeight)
  }, [currentWeight])

  useEffect(() => {
    if (!weightInputRef.current) return
    const rect = weightInputRef.current.getBoundingClientRect()
    weightDropdownPos.current = {
      left: rect.left,
      top: rect.top,
      height: rect.height,
    }
  }, [weightInputRef.current, weightDropdownVisible])
  return (
    <div>
      <h1 className=" text-white">Font Weight</h1>
      <h1
        ref={weightInputRef}
        style={{
          borderColor: weightDropdownVisible ? "white" : "rgba(0, 0, 0, 0)",
          fontFamily: fontFamily[family],
          fontWeight: currentWeight,
        }}
        className=" border-[1px] border-transparent text-white"
        onClick={() => {
          setWeightDropdownVisible((x) => !x)
        }}
      >
        Aa
      </h1>
      {weightDropdownVisible && (
        <ModalPortal
          hideModal={() => {
            setWeightDropdownVisible(false)
          }}
        >
          <div
            style={{
              position: "absolute",
              top:
                weightDropdownPos.current.top +
                weightDropdownPos.current.height,
              left: weightDropdownPos.current.left,
              maxHeight: 180,
              overflowY: "scroll",
            }}
            className=" no-scrollbar w-96 bg-red-300 z-[999] "
          >
            {validWeights.current.map((weight) => {
              return (
                <div
                  style={{ fontFamily: fontFamily[family], fontWeight: weight }}
                  key={family + weight}
                  onClick={() => {
                    setCurrentWeight(weight)
                  }}
                >
                  Aa ({weight})
                </div>
              )
            })}
          </div>
        </ModalPortal>
      )}
    </div>
  )
}
