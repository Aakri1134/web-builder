import { useEffect, useRef, useState } from "react"
import type { Project } from "../types/Project"
import type { DSL } from "../types/DSL"
import Convertor from "./Convertor"
import SelectBox from "./Edit/SelectBox"

type InputProjectHandler = {
  pages: Project["pages"]
}

export default function PageHandler({ pages }: InputProjectHandler) {
  const [activePage, _] = useState<DSL>(pages[0].page)
  const containerRef = useRef<HTMLDivElement>(null)

  if (pages.length === 0) {
    alert("No pages found :: PageHandler.tsx")

    return null
  }

  useEffect(() => {
    console.log(activePage)
  })

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
  }, [activePage.components]) // Depend on components instead of entire DSL

  return (
    <div
      ref={containerRef}
      className="relative z-0 no-scrollbar min-w-[400px]"
      style={{
        containerType: "inline-size",
        overflow: "scroll",
        height: (10 / 16) * 1300,
        width: 1300,
      }}
      id = "currentPage"
    >
        <SelectBox/>
      <style>
        {activePage.hover}
        {activePage.animations}
        {activePage.theme?.light}
        {activePage.theme?.dark}
        {formatResponsiveCSS(activePage)}
      </style>
      <div>
        <Convertor components={activePage.components} parents={[]} />
      </div>
    </div>
  )
}
