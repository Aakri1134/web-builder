import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { DSL } from "../utils/DSL/sanetizer"
import Convertor from "../components/Convertor"
import { getDSL } from "../utils/DSL/getDSL"
import "../Custom.css"
import SelectBox from "../components/Edit/SelectBox"

export default function Edit() {
  //@ts-ignore
  const { id } = useParams()
  const [DSL, setDSL] = useState<DSL>({
    components: [],
    functions: [],
  })

  const fetchDSL = () => {
    const res = getDSL("")
    if (!res) {
      setDSL({
        components: [],
        functions: [],
      })
    } else {
      setDSL(res)
    }
  }

  useEffect(() => {
    fetchDSL()
    console.log(DSL)
  }, [])

  const formatResponsiveCSS = (DSL: DSL) => {
    let css = ""
    
    if (DSL.responsiveUtilities?.mobile) {
      css += `@media (max-width: 768px) { ${DSL.responsiveUtilities.mobile} }`
    }
    
    if (DSL.responsiveUtilities?.tablet) {
      css += `@media (min-width: 769px) and (max-width: 1024px) { ${DSL.responsiveUtilities.tablet} }`
    }
    
    if (DSL.responsiveUtilities?.desktop) {
      css += `@media (min-width: 1025px) { ${DSL.responsiveUtilities.desktop} }`
    }
    
    if (DSL.responsiveUtilities?.large) {
      css += `@media (min-width: 1440px) { ${DSL.responsiveUtilities.large} }`
    }
    
    return css
  }

  return (
    <>
      <style>
        {DSL.hover}
        {DSL.animations}
        {DSL.theme?.light}
        {DSL.theme?.dark}

        {formatResponsiveCSS(DSL)}
      </style>
      <div
        style={{
          margin: 0,
        }}
        className="dark"
      >
        <SelectBox/>
          <Convertor components={DSL.components} parents={[]} />
          <div className=" w-24 h-24 fixed z-40 bottom-0 right-0 bg-amber-700 "></div>
      </div>
    </>
  )
}
