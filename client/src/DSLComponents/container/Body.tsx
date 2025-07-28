import { useSetRecoilState } from "recoil"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"

export default function Body({
  id,
  style,
  children,
}: {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  children: DSLComponent["children"]
}) {
  const setActive = useSetRecoilState(activeComponents)

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return (
    <body style={style}>
      <Convertor components={children} />
    </body>
  )
}
