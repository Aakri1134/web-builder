import { useEffect, useMemo } from "react"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"
import useComponent from "../../hooks/useComponent"

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
  const component = useComponent(id, style, props, parents, children)

  const updatedParents = useMemo(() => {
    return [...component.parents, id]
  }, [component.parents])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  switch (type) {
    case "Article":
      return (
        <article style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </article>
      )
    case "Body":
      return (
        <div style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </div>
      )
    case "Div":
      return (
        <div style={{ ...component.style }} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </div>
      )
    case "List":
      return (
        <ul style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </ul>
      )
    case "ListItems":
      return (
        <li style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </li>
      )
    case "Main":
      return (
        <main style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </main>
      )
    case "Nav":
      return (
        <nav style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </nav>
      )
    case "Section":
      return (
        <section style={component.style} className={component.props.className}>
          <Convertor components={component.children} parents={updatedParents} />
        </section>
      )
    default:
        return<></>
  }
}
