import Button from "../DSLComponents/Button"
import Heading from "../DSLComponents/text/Heading"
import Text from "../DSLComponents/text/Text"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import ImageCustom from "../DSLComponents/Image"
import Anchor from "../DSLComponents/text/Anchor"
import Container from "../DSLComponents/container/Container"

export default function Convertor({
  components,
  parents,
}: {
  components: DSLComponent[]
  parents: DSLComponent["id"][]
}) {
  if (components.length === 0) {
    return <></>
  }

  return (
    <>
      {components.map((child: DSLComponent) => {
        switch (child.type) {
          case "Div":
          case "ListItems": 
          case "List": 
          case "Nav": 
          case "Main":
          case "Section": 
          case "Article":
          case "Body":
            return (
              <Container
                type={child.type}
                key={child.id}
                id={child.id}
                style={child.style}
                children={child.children}
                parents={parents}
                props={child.props}
              />
            )
          case "Heading":
            return (
              <Heading
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
                parents={parents}
              />
            )
          case "Text":
            return (
              <Text
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
                parents={parents}
              />
            )
          case "Image": //
            return (
              <ImageCustom
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
                parent={parents}
              />
            )
          case "Link": //
            return (
              <Anchor
                props={child.props}
                key={child.id}
                id={child.id}
                style={child.style}
                parents={parents}
              />
            )

          case "Button": //
            return (
              <Button
                key={child.id}
                id={child.id}
                style={child.style}
                props={child.props}
                parent={parents}
              />
            )
          case "Loop": //
            return <h1>Loop</h1>
          case "Show": //
            return <h1>Show</h1>

          case "Modal":
            return <h1>Modal</h1>

          case "Dropdown": //
            return <h1>Dropdown</h1>

          default:
            alert(`Unexpected Component found ${child.id}`)
            return <h1>Error</h1>
        }
      })}
    </>
  )
}
