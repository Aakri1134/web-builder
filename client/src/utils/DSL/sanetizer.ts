import { captureEvent, captureException } from "@sentry/react"
import { checkRequirements } from "./requirements"

export interface DSLComponent {
  type:
    | "Body" // <body>
    | "Heading" // <h1>
    | "Text" // <p>
    | "Section" // <section>
    | "Div" // <div>
    | "Main" // <main>
    | "Nav" // <nav>
    | "Article" // <article>
    | "Image" // Image connector
    | "Link" // To connect to internal or external links, href will not be sent by AI
    | "Button" // Button frfr
    | "List" // <ul>
    | "ListItems" // <li>
    | "Loop" // repetitive viewing logic **NOT YET COMPLETED**
    | "Show" // optional viewing logic **NOT YET COMPLETED**
    | "Modal" // using Modal portal **NOT YET COMPLETED**
    | "Dropdown" // Dropdown modal, options in form of links / buttons **NOT YET COMPLETED**
  id: string
  children: DSLComponent[]
  style: React.CSSProperties// inline React CSS for the current component
  mediaQueries?: {
    mobile?: Partial<CSSStyleDeclaration> // @media (max-width: 768px) plain CSS for responsiveness
    tablet?: Partial<CSSStyleDeclaration> // @media (min-width: 769px) and (max-width: 1024px) plain CSS for responsiveness
    desktop?: Partial<CSSStyleDeclaration> // @media (min-width: 1025px) plain CSS for responsiveness
    large?: Partial<CSSStyleDeclaration> // @media (min-width: 1440px) plain CSS for responsiveness
  }
  props: {
    text?: string // text in Text / Link / Heading element
    onClick?: string // **NOT YET COMPLETED**
    onChange?: string // **NOT YET COMPLETED**
    src?: string // make image source only external images
    href?: string
    alt?: string
    className: string // classNames for the hover, animation and media implemenations
  }
}

export interface DSLFunctions {
  id: string
  input: any[]
  type: "api-call" | "navigate" | "show-modal"
  inputs?: {
    [key: string]: string | number
  }
}

export interface DSL {
  components: DSLComponent[]
  functions: DSLFunctions[] // **NOT YET COMPLETED**
  hover?: string // plain CSS to store the classes for hover
  animations?: string // plain CSS to store the classes for custom animations
  theme?: {
    // stores all the colors used in entire project
    light: string // plain CSS stored in .light and :root for
    dark: string // plain CSS stored in .dark, implementation handled in pre defined code
  }
  responsiveUtilities?: {
    mobile?: string // "@media (max-width: 768px)" plain CSS for responsiveness
    tablet?: string // "@media (min-width: 769px) and (max-width: 1024px)" plain CSS for responsiveness
    desktop?: string // "@media (min-width: 1025px)" plain CSS for responsiveness
    large?: string // "@media (min-width: 1440px)" plain CSS for responsiveness
  }
}

const validComponentTypes = new Set([
  "Heading",
  "Text",
  "Div",
  "Article",
  "Main",
  "Section",
  "Nav",
  "Image",
  "Link",
  "Button",
  "Body",
  "Modal",
  "Dropdown",
  "Loop",
  "Show",
  "List",
  "ListItems",
])
// const validFunctionTypes = new Set(["api-call", "navigate", "show-modal"])

const functionIDs = new Set<string>([])

const allowedComponentStyles: Set<keyof React.CSSProperties> = new Set([
  "fontSize",
  "margin",
  "padding",
  "color",
  "backgroundColor",
  "lineHeight",
  "fontWeight",
  "fontFamily",
  "height",
  "width",
  "display",
  "justifyContent",
  "alignItems",
  "flexDirection",
  "borderRadius",
  "boxShadow",
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "boxSizing",
  "cursor",
  "flex",
  "flexWrap",
  "gap",
  "marginTop",
  "maxWidth",
  "minHeight",
  "minWidth",
  "textAlign",
  "zIndex",
  "listStyle",
  "marginTop",
  "marginLeft",
  "marginRight",
  "marginBottom",
  "textDecoration",
  "borderTop",
  "borderBottom",
  "border",
  "borderRight",
  "borderLeft",
  "overflowX",
  "backdropFilter",
  "transition",
  "background",
  "paddingTop",
  "paddingLeft",
  "paddingRight",
  "paddingBottom",
  "objectFit",
  "gridTemplateColumns",
  "textTransform",
  "letterSpacing",
  "listStyleType"
])

export interface validStyles {
  style:
    | "fontSize"
    | "margin"
    | "padding"
    | "color"
    | "backgroundColor"
    | "lineHeight"
    | "fontWeight"
    | "fontFamily"
    | "height"
    | "width"
    | "display"
    | "justifyContent"
    | "alignItems"
    | "flexDirection"
    | "border"
    | "borderRadius"
    | "boxShadow"
    | "position"
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "borderBottom"
    | "borderRight"
    | "boxSizing"
    | "cursor"
    | "flex"
    | "flexWrap"
    | "gap"
    | "marginTop"
    | "maxWidth"
    | "minHeight"
    | "minWidth"
    | "textAlign"
    | "zIndex"
}

function checkMaliciousStrings(input: string) {
  // can add malicious string checks later
  return typeof input === "string"
}

function checkMaliciousURLs(input: string) {
  // can add checks for urls

  return true

  try {
    if (input[0] === "#") {
      return true
    }
    const url = new URL(input)
    // if input can become url then return true;
    const safeProtocols = ["http:", "https:"]
    const block: string[] = []
    if (!safeProtocols.includes(url.protocol) || block.includes(url.hostname)) {
      return false
    }
    return true
  } catch (err) {
    captureException(err)
    return false
  }
}

export interface Report {
  id: string
  reason: string
  additional?: any
}

function recursiveCheckComponents(data: DSLComponent[]): {
  success: boolean
  report: Report[]
} {
  // console.log(data)
  let report: Report[] = []
  data.map((component: DSLComponent) => {
    // General tests
    if (!validComponentTypes.has(component.type)) {
      report.push({
        id: component.id,
        reason: `Invalid type ${component.type}`,
      })
    }
    let InvalidKey: string[] = []

    !Object.keys(component.style).map((key: string) => {
      const temp = allowedComponentStyles.has(key as keyof React.CSSProperties)
      if (!temp) {
        InvalidKey.push(key)
      }
      return temp
    })
    if (InvalidKey.length > 0) {
      report.push({
        id: component.id,
        reason: `Invalid style type ${component.type}`,
        additional: {
          InvalidKey,
        },
      })
    }
    if (component.props) {
      if (
        component.props.text &&
        !checkMaliciousStrings(component.props.text)
      ) {
        report.push({
          id: component.id,
          reason: `Malicious string found`,
          additional: {
            malicious: component.props.text,
            location: "props.text",
          },
        })
      }
      if (component.props.src && !checkMaliciousURLs(component.props.src)) {
        report.push({
          id: component.id,
          reason: `Malicious URLs found`,
          additional: {
            malicious: component.props.src,
            location: "props.src",
          },
        })
      }
      if (component.props.alt && !checkMaliciousStrings(component.props.alt)) {
        report.push({
          id: component.id,
          reason: `Malicious strings found`,
          additional: {
            malicious: component.props.alt,
            location: "props.alt",
          },
        })
      }
      if (component.props.href && !checkMaliciousURLs(component.props.href)) {
        report.push({
          id: component.id,
          reason: `Malicious URLs found`,
          additional: {
            malicious: component.props.href,
            location: "props.href",
          },
        })
      }
      if (
        component.props.onChange &&
        !functionIDs.has(component.props.onChange)
      ) {
        report.push({
          id: component.id,
          reason: "Invalid functionID",
          additional: {
            location: "props.onChange",
          },
        })
      }
      if (
        component.props.onClick &&
        !functionIDs.has(component.props.onClick)
      ) {
        report.push({
          id: component.id,
          reason: "Invalid functionID",
          additional: {
            location: "props.onClick",
          },
        })
      }
    }

    // component specific tests
    // console.log("Hello")
    const res2 = checkRequirements(component)
    report.push(...res2.report)
    if (component.children.length > 0) {
      // console.log("wooow")
      // console.log(component.children)
      const fin = recursiveCheckComponents(component.children)

      report.push(...fin.report)
    }
  })
  const res = report.length == 0
  return {
    success: res,
    report: report,
  }
}

// function typeCheckFunction(data: DSLFunctions[]) {
//   return data.every((func: DSLFunctions) => {
//     return validFunctionTypes.has(func.type)
//   })
// }

export default function sanetizer(data: DSL) {
  console.log("Checks begin")
  try {
    const { components, functions } = data
    functions.map((func: DSLFunctions) => {
      functionIDs.add(func.id)
    })
    const res1 = recursiveCheckComponents(components)
    // const res2 = typeCheckFunction(functions)
    if (res1.report.length > 0) {
      // can add logic to remove components in reports, might add level, to check components to be removed
      captureEvent({
        level: "log",
        message: "Sanetization with reports",
        extra: {
          reports: res1.report,
        },
      })
    }
    console.log("Check Complete")
    if (res1.success /*&& res2*/) return data
    console.log(res1.report)

    return false
  } catch (err) {
    console.log(err)
    captureEvent({
      level: "error",
      message: "Error while DSL sanetization",
      extra: {
        prompt: "", //TODO add logging logic later,
        response: data,
      },
    })
    return false
  }
}
