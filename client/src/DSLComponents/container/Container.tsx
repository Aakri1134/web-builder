import { useEffect, useMemo } from "react"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"

export interface InputContainer {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  children: DSLComponent["children"]
  parents: DSLComponent["id"][]
  props: DSLComponent["props"]
  type:
    | "Article"
    | "Body"
    | "Div"
    | "List"
    | "ListItems"
    | "Main"
    | "Nav"
    | "Section"
}

export default function Container({
  id,
  style,
  children,
  parents,
  props,
  type,
}: InputContainer) {
  const setActive = useSetRecoilState(activeComponents)

  const updatedParents = useMemo(() => {
    return [...parents, id]
  }, [parents])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  switch (type) {
    case "Article":
      return (
        <article style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </article>
      )
    case "Body":
      return (
        <body style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </body>
      )
    case "Div":
      return (
        <div style={{ ...style }} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </div>
      )
    case "List":
      return (
        <ul style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </ul>
      )
    case "ListItems":
      return (
        <li style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </li>
      )
    case "Main":
      return (
        <main style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </main>
      )
    case "Nav":
      return (
        <nav style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </nav>
      )
    case "Section":
      return (
        <section style={style} className={props.className}>
          <Convertor components={children} parents={updatedParents} />
        </section>
      )
    default:
        return<></>
  }
}
