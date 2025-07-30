import { useRecoilValue } from "recoil"
import { selectBox } from "../../recoil/selectors/selectBox"
import { createPortal } from "react-dom"

export default function SelectBox() {
  const boundaries = useRecoilValue(selectBox)
  console.log(boundaries)

  if (boundaries === null) return
  else
    return createPortal(
      <div
        className={` bg-transparent border-4 border-blue-200 rounded-lg z-[1000] absolute pointer-events-none`}
        style = {{
            width : boundaries.width,
            height : boundaries.height,
            top : window.scrollY + (boundaries.top ?? 0),
            left : window.scrollX +  (boundaries.left ?? 0)
        }}
        
      />,
      document.body
    )
}
