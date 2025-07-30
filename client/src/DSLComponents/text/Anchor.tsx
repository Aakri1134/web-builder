import { useSetRecoilState } from "recoil"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import useComponent from "../../hooks/useComponent"
import type { TextComponentInput } from "./Heading"

export default function Anchor({
  id,
  props,
  style,
  parents,
  mediaQueries,
}: TextComponentInput) {
  const setActive = useSetRecoilState(activeComponents)
  const component = useComponent(id, style, props, parents, [])

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
      css += `@media (max-width: 768px) { #${id} {${mediaQueries?.mobile}} } `
    }

    if (mediaQueries?.tablet) {
      css += `@media (min-width: 769px) and (max-width: 1024px) { #${id} {${mediaQueries?.tablet}} } `
    }

    if (mediaQueries?.desktop) {
      css += `@media (min-width: 1025px) { #${id} {${mediaQueries?.desktop}} } `
    }

    if (mediaQueries?.large) {
      css += `@media (min-width: 1440px) { #${id} {${mediaQueries?.large}} } `
    }

    // console.log(id)
    // console.log(css)

    return css
  }

  return (
    <>
      <style>{formatResponsiveCSS(mediaQueries)}</style>
      <a
        id={id}
        className={component.props.className}
        href={component.props?.href}
        style={component.style}
      >
        {component.props?.text}
      </a>
    </>
  )
}
