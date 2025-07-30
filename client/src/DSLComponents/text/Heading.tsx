import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../../utils/DSL/sanetizer"
import { activeComponents } from "../../recoil/atoms/component"
import { useEffect } from "react"
import useComponent from "../../hooks/useComponent"

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
  useEffect(() => {
    if (typeof id === "string") {
      setActive((x) => [...x, id])
    }

  }, [])
  const formatResponsiveCSS = (mediaQueries: DSLComponent["mediaQueries"]) => {
    let css = ""

    if (mediaQueries?.mobile) {

      let temp = ""
      Object.keys(mediaQueries.mobile ?? {}).map((key: string) => {
        temp += `${key}: ${(mediaQueries.mobile as Record<string, string | number>)[key]};`
      })

      css += `@container (max-width: 768px) { ${temp} }`
    }

    if (mediaQueries?.tablet) {
      let temp = ""
      Object.keys(mediaQueries.tablet ?? {}).map((key: string) => {
        temp += `${key}: ${(mediaQueries.tablet as Record<string, string | number>)[key]};`
      })
      css += `@container (min-width: 769px) and (max-width: 1024px) { ${temp} }`
    }

    if (mediaQueries?.desktop) {
      let temp = ""
      Object.keys(mediaQueries.desktop ?? {}).map((key: string) => {
        temp += `${key}: ${(mediaQueries.desktop as Record<string, string | number>)[key]};`
      })
      css += `@container (min-width: 1025px) { ${temp} }`
    }

    if (mediaQueries?.large) {
      let temp = ""
      Object.keys(mediaQueries.large ?? {}).map((key: string) => {
        temp += `${key}: ${(mediaQueries.large as Record<string, string | number>)[key]};`
      })
      css += `@container (min-width: 1440px) { ${temp} }`
    }

    console.log("Heading")
    console.log(css)

    return css
  }
  return (
    <>
    <style>
      {formatResponsiveCSS(mediaQueries)}
    </style>
      <h1 className=
      {component.props.className} style={component.style}>
        {props?.text}
      </h1>
    </>
  )
}
