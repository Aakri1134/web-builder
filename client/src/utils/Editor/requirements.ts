import type { DSLComponent } from "../../types/DSL"

export type StyleEditProperty =
  | "dimension"
  | "position"
  | "rotation"
  | "bg-color"
  | "bg-image"
  | "border-width"
  | "border-color"
  | "border-style"
  | "border-radius"
  | "shadow-offset"
  | "shadow-color"
  | "shadow-blur"
  | "display"
  | "text-align"
  | "text-decoration"
  | "text-transform"
  | "text-color"
  | "text-shadow"
  | "font-size"
  | "font-weight"
  | "line-height"
  | "letter-spacing"

const styleRequirements: Record<DSLComponent["type"], StyleEditProperty[]> = {
  Body: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Section: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Div: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Main: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Nav: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Article: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  List: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  ListItems: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
  ],
  Heading: [
    "dimension",
    "position",
    "rotation",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
    "text-color",
    "text-decoration",
    "text-shadow",
    "text-transform",
    "font-size",
    "font-weight",
    "line-height",
    "letter-spacing",
  ],
  Text: [
    "dimension",
    "position",
    "rotation",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
    "text-color",
    "text-decoration",
    "text-shadow",
    "text-transform",
    "font-size",
    "font-weight",
    "line-height",
    "letter-spacing",
  ],
  Link: [
    "dimension",
    "position",
    "rotation",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
    "text-color",
    "text-decoration",
    "text-shadow",
    "text-transform",
    "font-size",
    "font-weight",
    "line-height",
    "letter-spacing",
  ],
  Image: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "bg-image",
    "border-width",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
  ],
  Button: [
    "dimension",
    "position",
    "rotation",
    "bg-color",
    "border-color",
    "border-style",
    "border-radius",
    "shadow-offset",
    "shadow-color",
    "shadow-blur",
    "display",
    "text-align",
    "text-decoration",
    "text-transform",
    "text-color",
    "text-shadow",
    "font-size",
    "font-weight",
    "line-height",
    "letter-spacing",
  ],
  Loop: [],
  Show: [],
  Modal: [],
  Dropdown: [],
}

export function getStyleRequirements(type: DSLComponent["type"]) {
  const requiredProperties = styleRequirements[type] || []
  return requiredProperties
}

export function getStyleRequirementsIntersection(types : DSLComponent["type"][]) {
    if(types.length === 0) return  []
    let intersection = new Set(styleRequirements[types[0]])
    
    for(let i = 0; i < types.length; i++){
        const curr = new Set(styleRequirements[types[i]])
        intersection = new Set([...intersection].filter(x => curr.has(x)))
    }
    return Array.from(intersection)
}