import { useSetRecoilState } from "recoil"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect, useMemo } from "react"

export default function Body({
  id,
  style,
  children,
  parents }: {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  children: DSLComponent["children"]
  parents : DSLComponent["id"][]
}) {
  const setActive = useSetRecoilState(activeComponents)

  const updatedParents = useMemo(() => {return [...parents, id]} , [parents])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  return (
    <body style={style}>
      <Convertor components={children} parents={updatedParents}/>
    </body>
  )
}
