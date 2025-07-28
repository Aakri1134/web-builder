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
    | "Loop" // repetitive viewing logic
    | "Show" // optional viewing logic
    | "Modal" // using Modal portal
    | "Dropdown" // Dropdown modal, options in form of links / buttons
    | "List"
    | "ListItems"
  id: string
  children: DSLComponent[]
  style: React.CSSProperties
  hover?: Partial<CSSStyleDeclaration>
  animations?: Partial<CSSStyleDeclaration>
  props?: {
    text?: string
    onClick?: string
    onChange?: string
    src?: string
    href?: string
    alt?: string
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
  functions: DSLFunctions[]
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
])
// const validFunctionTypes = new Set(["api-call", "navigate", "show-modal"])

const functionIDs = new Set<string>([])

const allowedComponentStyles = new Set([
  'fontSize',
  'margin',
  'padding',
  'color',
  'backgroundColor',
  'lineHeight',
  'fontWeight',
  'fontFamily',
  'height',
  'width',
  'display',
  'justifyContent',
  'alignItems',
  'flexDirection',
  'border',
  'borderRadius',
  'boxShadow',
  'position',
  'top',
  'left',
  'right',
  'bottom',
  'borderBottom',
  'borderRight',
  'boxSizing',
  'cursor',
  'flex',
  'flexWrap',
  'gap',
  'marginTop',
  'maxWidth',
  'minHeight',
  'minWidth',
  'textAlign'
])

export interface validStyles {
  style : | "fontSize"
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
}

function checkMaliciousStrings(input: string) {
  // can add malicious string checks later
  return typeof input === "string"
}

function checkMaliciousURLs(input: string) {
  // can add checks for urls
  try {
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
  let report: Report[] = []
  const res = data.every((component: DSLComponent) => {
    // General tests
    if (!validComponentTypes.has(component.type)) {
      report.push({
        id: component.id,
        reason: `Invalid type ${component.type}`,
      })
      return false
    }

    if (
      !Object.keys(component.style).every((key: string) => {
        return allowedComponentStyles.has(key)
      })
    ) {
      report.push({
        id: component.id,
        reason: `Invalid style type ${component.type}`,
        additional: component.style,
      })
      return false
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
        return false
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
        return false
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
        return false
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
        return false
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
        return false
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
        return false
      }
    }

    // component specific tests
    const res = checkRequirements(component)
    report.push(...res.report)
    if (!res.success) return false
    if (component.children.length > 0)
      return recursiveCheckComponents(component.children)
    return true
  })

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
