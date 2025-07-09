import { captureEvent, captureException } from "@sentry/react"

interface DSLComponent {
  type:
    | "Heading" // <h1>
    | "Text" // <p>
    | "Card" // Custom UI component
    | "Section-Horizontal" // Has parent's maximum width
    | "Section-Vertical" // Has parent's maximum height
    | "Image" // Imgae connector
    | "Link" // To connect to internal or external links, href will not be sent by AI
    | "Button" // Button frfr
    | "Body" // Base component
    | "Checkbox" // Checkbox component
    | "Div" // Neutral container without style
    | "Loop" // repetitive viewing logic
    | "Show" // optional viewing logic
    | "Modal" // using Modal portal
    | "Dropdown" // Dropdown modal, options in form of links / buttons
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

interface DSLFunctions {
  id: string
  input: any[]
  type: "api-call" | "navigate" | "show-modal"
  inputs?: {
    [key: string]: string | number
  }
}

interface DSL {
  components: DSLComponent[]
  functions: DSLFunctions[]
}

const validComponentTypes = new Set([
  "Heading",
  "Text",
  "Card",
  "Section-Horizontal",
  "Section-Vertical",
  "Image",
  "Link",
  "Button",
  "Body",
  "Modal",
  "Dropdown",
  "Checkbox",
])
const validFunctionTypes = new Set(["api-call", "navigate", "show-modal"])

const functionIDs = new Set<string>([])

const allowedComponentStyles = new Set([
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
  "border",
  "borderRadius",
  "boxShadow",
  "position",
  "top",
  "left",
  "right",
  "bottom",
])

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

function recursiveCheckComponents(data: DSLComponent[]): boolean {
  return data.every((component: DSLComponent) => {
    if (!validComponentTypes.has(component.type)) {
      return false
    }
    if (
      !Object.keys(component.style).every((key: string) => {
        return allowedComponentStyles.has(key)
      })
    )
      return false
    if (component.props) {
      if (component.props.text && !checkMaliciousStrings(component.props.text))
        return false
      if (component.props.src && !checkMaliciousURLs(component.props.src))
        return false
      if (component.props.alt && !checkMaliciousURLs(component.props.alt))
        return false
      if (
        component.props.onChange &&
        !functionIDs.has(component.props.onChange)
      )
        return false
      if (component.props.onClick && !functionIDs.has(component.props.onClick))
        return false
    }
    if (component.children.length > 0)
      return recursiveCheckComponents(component.children)
    return true
  })
}

function typeCheckFunction(data: DSLFunctions[]) {
  return data.every((func: DSLFunctions) => {
    return validFunctionTypes.has(func.type)
  })
}

export default function sanetizer(data: DSL) {
  try {
    const { components, functions } = data
    functions.map((func: DSLFunctions) => {
      functionIDs.add(func.id)
    })
    recursiveCheckComponents(components)
    typeCheckFunction(functions)
  } catch (err) {
    console.log(err)
    captureEvent({
      level: "info",
      message: "Invalid DSL generated",
      extra: {
        prompt: "", //TODO add logging logic later,
        response: data,
      },
    })
  }
}
