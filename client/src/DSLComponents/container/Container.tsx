import { useEffect, useMemo } from "react"
import Convertor from "../../components/Convertor"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"
import useComponent from "../../hooks/useComponent"
import useComponentClickHandler from "../../hooks/useComponentClickHandler"

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
  mediaQueries: DSLComponent["mediaQueries"]
}

export default function Container({
  id,
  style,
  children,
  parents,
  props,
  type,
  mediaQueries,
}: InputContainer) {
  const setActive = useSetRecoilState(activeComponents)
  const component = useComponent(id, style, props, parents, children)
  const { handleComponentClick, handleParentSelect } = useComponentClickHandler(
    [...component.parents, id]
  )

  const updatedParents = useMemo(() => {
    return [...component.parents, id]
  }, [component.parents])

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])

  const formatResponsiveCSS = (
    mediaQueries: InputContainer["mediaQueries"]
  ) => {
    let css = ""

    if (mediaQueries?.mobile) {
      css += `@container (max-width: 768px) { #${id} {${mediaQueries?.mobile}} } `
    }

    if (mediaQueries?.tablet) {
      css += `@container (min-width: 769px) and (max-width: 1024px) { #${id} {${mediaQueries?.tablet}} } `
    }

    if (mediaQueries?.desktop) {
      css += `@container (min-width: 1025px) { #${id} {${mediaQueries?.desktop}} } `
    }

    if (mediaQueries?.large) {
      css += `@container (min-width: 1440px) { #${id} {${mediaQueries?.large}} } `
    }

    // console.log(id)
    // console.log(css)

    return css
  }

  let content: JSX.Element = <></>

  switch (type) {
    case "Article":
      content = (
        <article
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </article>
      )
      break
    case "Body":
      content = (
        <div
          id={id}
          style={{ ...component.style }}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </div>
      )
      break
    case "Div":
      content = (
        <div
          id={id}
          style={{ ...component.style }}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </div>
      )
      break
    case "List":
      content = (
        <ul
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </ul>
      )
      break
    case "ListItems":
      content = (
        <li
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </li>
      )
      break
    case "Main":
      content = (
        <main
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </main>
      )
      break
    case "Nav":
      content = (
        <nav
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </nav>
      )
      break
    case "Section":
      content = (
        <section
          id={id}
          style={component.style}
          className={component.props.className}
          onClick={handleComponentClick}
          onDoubleClick={handleParentSelect}
        >
          <Convertor components={component.children} parents={updatedParents} />
        </section>
      )
      break
    default:
      content = <></>
  }

  return (
    <>
      <style>{formatResponsiveCSS(mediaQueries)}</style>
      {content}
    </>
  )
}
