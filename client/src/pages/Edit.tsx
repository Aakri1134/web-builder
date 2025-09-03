import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import type { DSL } from "../utils/DSL/sanetizer"
import Convertor from "../components/Convertor"
import { getDSL } from "../utils/DSL/getDSL"
import SelectBox from "../components/Edit/SelectBox"
import Canvas from "../components/Canvas"

export default function Edit() {
  //@ts-ignore
  const { id } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [DSL, setDSL] = useState<DSL>({
    components: [],
    functions: [],
  })
  const fetchDSL = () => {
    const res = getDSL("")
    if (!res) {
      console.log("Sanetizer failed")
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

  useEffect(() => {
    // Wait for DOM to be fully rendered
    const timer = setTimeout(() => {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      }

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      })

      // Observe all elements with scroll animation classes
      const elements = containerRef.current?.querySelectorAll(
        ".slide-up-on-scroll"
      )
      if (elements) {
        elements.forEach((el) => observer.observe(el))
      }

      return () => observer.disconnect()
    }, 500) // Increased delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [DSL.components]) // Depend on components instead of entire DSL

  const formatResponsiveCSS = (DSL: DSL) => {
    let css = ""

    if (DSL.responsiveUtilities?.mobile) {
      css += `@container (max-width: 768px) { ${DSL.responsiveUtilities.mobile} }`
    }

    if (DSL.responsiveUtilities?.tablet) {
      css += `@container (min-width: 769px) and (max-width: 1024px) { ${DSL.responsiveUtilities.tablet} }`
    }

    if (DSL.responsiveUtilities?.desktop) {
      css += `@container (min-width: 1025px) { ${DSL.responsiveUtilities.desktop} }`
    }

    if (DSL.responsiveUtilities?.large) {
      css += `@container (min-width: 1440px) { ${DSL.responsiveUtilities.large} }`
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
        ref={containerRef}
        style={{
          margin: 0,
        }}
        className="light flex justify-center items-center"
      >
        <SelectBox />
        <Canvas pagesInit={[
          {
            id : "1",
            height : 20,
            width : 20,
            name : "page 1",
            center : {
              x : 10,
              y : 10
            },
            element : <Convertor components={DSL.components} parents={[]}/>
          },
          {
            id : "2",
            height : 40,
            width : 40,
            name : "page 2",
            center : {
              x : 50,
              y : 10
            },
            element : <div className="bg-yellow-500 h-full">Yellow</div>
          },
          {
            id : "3",
            height : 40,
            width : 40,
            name : "page 2",
            center : {
              x : 0,
              y : 50
            },
            element : <div className="bg-orange-500 h-full">Orange</div>
          },
        ]}/>
      </div>
    </>
  )
}
