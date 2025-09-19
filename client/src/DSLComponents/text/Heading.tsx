import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../../types/DSL"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import useComponent from "../../hooks/useComponent"
import useComponentClickHandler from "../../hooks/useComponentClickHandler"

export interface TextComponentInput {
  id: DSLComponent["id"]
  parents: DSLComponent["id"][]
  props: DSLComponent["props"]
  style: DSLComponent["style"]
  mediaQueries: DSLComponent["mediaQueries"]
}

export default function Heading({
  id,
  props,
  style,
  parents,
  mediaQueries,
}: TextComponentInput) {
  const setActive = useSetRecoilState(activeComponents)
  const component = useComponent(id, style, props, parents, [])
  const { handleComponentClick, handleParentSelect } = useComponentClickHandler(
    [...component.parents, id]
  )

  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }
  }, [])
  const formatResponsiveCSS = (
    mediaQueries: TextComponentInput["mediaQueries"]
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
  return (
    <>
      <style>{formatResponsiveCSS(mediaQueries)}</style>
      <h1
        id={id}
        className={component.props.className}
        style={{ ...component.style, userSelect: "none" }}
        onClick={handleComponentClick}
        onDoubleClick={handleParentSelect}
      >
        {props?.text}
      </h1>
    </>
  )
}
