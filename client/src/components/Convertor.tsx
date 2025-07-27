import Div from "../DSLComponents/container/Div"
import Heading from "../DSLComponents/text/Heading"
import Text from "../DSLComponents/text/Text"
import type { DSLComponent } from "../utils/DSL/sanetizer"

export default function Convertor({
  components,
}: {
  components: DSLComponent[]
}) {
  if (components.length === 0) {
    return <></>
  }

  return (
    <>
      {components.map((child: DSLComponent) => {
        switch (child.type) {
          case "Div":
            return (
              <Div
                key={child.id}
                id={child.id}
                style={child.style}
                children={child.children}
              />
            )
          case "Heading":
            return (
              <Heading
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
              />
            )
          case "Text":
            return (
              <Text
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
              />
            )
          case "Nav"://
          case "Main"://
          case "Section"://
          case "Article"://
          case "Image"://
          case "Link"://
          case "Button"://
          case "Body"://
          case "Loop"://
          case "Show"://
          case "Modal":
          case "Dropdown"://
          case "ListItems"://
          case "List"://
          default:
            alert(`Unexpected Component found ${child.id}`)
            return <h1>Error</h1>
        }
      })}
    </>
  )
}
