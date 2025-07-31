import { useRecoilValue } from "recoil"
import { createPortal } from "react-dom"
import { currentComponentID, parentFamily } from "../../recoil/atoms/component"

export default function SelectBox() {
  const curr = useRecoilValue(currentComponentID)
  const parent = useRecoilValue(parentFamily(curr ?? "empty"))
  if (curr === null) return null

  let position: "absolute" | "fixed" = "absolute"
  let i = parent.length - 1
  if (
    document.getElementById(curr)?.style.position &&
    document.getElementById(curr)?.style.position === "fixed"
  )
    position = "fixed"
  while (i >= 0 && position !== "fixed") {
    if (
      document.getElementById(parent[i])?.style.position &&
      document.getElementById(parent[i])?.style.position === "fixed"
    )
      position = "fixed"
    i--
  }
  const boundaries = document.getElementById(curr)?.getBoundingClientRect()

  if (boundaries === null || boundaries === undefined) return null
  else {
    return createPortal(
      <div
        className={` bg-transparent border-4 border-blue-200 rounded-lg z-[1000] absolute pointer-events-none`}
        style={{
          width: boundaries?.width,
          height: boundaries?.height,
          top:
            position === "absolute"
              ? window.scrollY + (boundaries?.top ?? 0)
              : boundaries?.top ?? 0,
          left:
            position === "absolute"
              ? window.scrollX + (boundaries?.left ?? 0)
              : boundaries?.left ?? 0,
          position: position,
        }}
      />,
      document.body
    )
  }
}
