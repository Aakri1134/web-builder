import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import Convertor from "../../components/Convertor"
import { activeComponents } from "../../recoil/atoms/component"
import type { DSLComponent } from "../../utils/DSL/sanetizer"

export default function ListItems({
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
    <li style={style}>
      <Convertor components={children} />
    </li>
  )
}
