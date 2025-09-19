import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { activeComponents } from "../recoil/atoms/component"
import type { DSLComponent } from "../types/DSL"
import useComponent from "../hooks/useComponent"
import useComponentClickHandler from "../hooks/useComponentClickHandler"

interface InputButton {
  id: DSLComponent["id"]
  style: DSLComponent["style"]
  props: DSLComponent["props"]
  parent: DSLComponent["id"][]
  mediaQueries: DSLComponent["mediaQueries"]
}

export default function Button({
  id,
  style,
  props,
  parent,
  mediaQueries,
}: InputButton) {
  // logic to convert props.onClick to premade functions
  // logic for visibility
  // logic for ???
  const setActive = useSetRecoilState(activeComponents)

  const component = useComponent(id, style, props, parent, [])
  const { handleComponentClick, handleParentSelect } = useComponentClickHandler(
    [...component.parents, id]
  )

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])
  const formatResponsiveCSS = (mediaQueries: DSLComponent["mediaQueries"]) => {
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

  return (
    <>
      <style>{formatResponsiveCSS(mediaQueries)}</style>
      <button
        id={id}
        style={component.style}
        onClick={handleComponentClick}
        onDoubleClick={handleParentSelect}
      >
        {component.props?.text}
      </button>
    </>
  )
}
