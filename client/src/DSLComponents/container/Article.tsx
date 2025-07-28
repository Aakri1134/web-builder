import { useEffect, useMemo } from "react"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"

export default function Article({
  id,
  style,
  children,
  parents,
}: {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  children: DSLComponent["children"]
  parents: DSLComponent["id"][]
}) {
  const setActive = useSetRecoilState(activeComponents)

  const updatedParents = useMemo(() => {return [...parents, id]} , [parents])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return (
    <article style={style}>
      <Convertor components={children} parents={updatedParents}/>
    </article>
  )
}
