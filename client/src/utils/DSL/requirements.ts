import { type DSLComponent, type Report } from "./sanetizer"

// to check if the required parameters are present in component.props
type PropKeys = keyof NonNullable<DSLComponent["props"]>
const requirements: { [key in DSLComponent["type"]]: PropKeys[] } = {
  Button: ["className", "text", "onClick"],
  Link: ["className", "text", "href"],
  Image: ["className", "src", "alt"],
  Heading: ["className", "text"],
  Text: ["className", "text"],
  Show: ["className", "onClick"],
  Body: ["className"],
  Div: ["className"],
  Loop: ["className"],
  Dropdown: ["className"],
  Modal: ["className"],
  Section: ["className"],
  Main: ["className"],
  Nav: ["className"],
  Article: ["className"],
  List: ["className"],
  ListItems: ["className"],
}

export function checkRequirements(component: DSLComponent): {
  success: boolean
  report: Report[]
} {
  let report: Report[] = []
  if (!component.props) {
    report.push({
      id: component.id,
      reason: `props not found in the ${component.type}`,
    })
    return {
      success: false,
      report,
    }
  }
//   console.log("Hello")
//   console.log(component)
  const res: boolean = requirements[component.type].every((x: PropKeys) => {
    // console.log(x)
    
    if (component.props[x] === undefined || component.props[x] === null || !component.props[x]) {
      report.push({
        id: component.id,
        reason: `${x} not found in the ${component.type}`,
      })
      
      return false
    }else {
    return true}
  })
//   console.log(report)
  return {
    success: res,
    report,
  }
}
