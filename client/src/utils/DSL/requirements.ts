import { type Report } from "./sanetizer"
import type { DSLComponent } from "../../types/DSL"

// to check if the required parameters are present in component.props
type PropKeys = keyof NonNullable<DSLComponent["props"]>
const requirements: { [key in DSLComponent["type"]]: PropKeys[] } = {
  //   Button: ["className", "text", "onClick"],
  //   Link: ["className", "text", "href"],
  //   Image: ["className", "src", "alt"],
  //   Heading: ["className", "text"],
  //   Text: ["className", "text"],
  //   Show: ["className", "onClick"],
  //   Body: ["className"],
  //   Div: ["className"],
  //   Loop: ["className"],
  //   Dropdown: ["className"],
  //   Modal: ["className"],
  //   Section: ["className"],
  //   Main: ["className"],
  //   Nav: ["className"],
  //   Article: ["className"],
  //   List: ["className"],
  //   ListItems: ["className"],
  Button: ["className", "text"],
  Link: ["className", "text"],
  Image: ["className", "src", "alt"],
  Heading: ["className", "text"],
  Text: ["className", "text"],
  Show: ["className"],
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
  requirements[component.type].map((x: PropKeys) => {
    // console.log(x)

    if (
      component.props[x] === undefined ||
      component.props[x] === null ||
      !component.props[x]
    ) {
      if (x === "className") {
      } else {
        report.push({
          id: component.id,
          reason: `${x} not found in the ${component.type}`,
        })
      }

      return false
    } else {
      return true
    }
  })
  // console.log("Requirements")
  //   console.log(report)

  const res = report.length == 0
  return {
    success: res,
    report,
  }
}

export function checkPresence(type: DSLComponent["type"], propKey: PropKeys) {
  return requirements[type].includes(propKey)
}
