import { useEffect, useMemo } from "react"
import { useSetRecoilState } from "recoil"
import Convertor from "../../components/Convertor"
import { activeComponents } from "../../recoil/atoms/component"
import type { DSLComponent } from "../../utils/DSL/sanetizer"

export default function Nav({
  id,
  style,
  children,
  parents }: {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  children: DSLComponent["children"],
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
    <nav style={style}>
      <Convertor components={children}  parents={updatedParents}/>
    </nav>
  )
}
