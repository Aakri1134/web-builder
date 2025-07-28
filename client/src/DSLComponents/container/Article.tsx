import { useEffect } from "react"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"

export default function Article({
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
    <article style={style}>
      <Convertor components={children} />
    </article>
  )
}
