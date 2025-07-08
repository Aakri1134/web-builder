interface DSLComponent {
  type:
    | "Heading"
    | "Text"
    | "Card"
    | "Section-Horizontal"
    | "Section-Vertical"
    | "Image"
    | "Link"
    | "Button"
    | "Body"
    | "Modal"
    | "Dropdown"
    | "Checkbox"
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
    href?:string
    alt?:string
  }
}

interface DSLFunctions {
  id: string,
  input: any[],
  type: "api-call" | "navigate" | "show-modal"
  inputs?: {
    [key: string] : string | number
  }
}

interface DSL {
  components : DSLComponent[],
  functions : DSLFunctions[]
}

export default function sanetizer(data: string) {
  try {
    const DSL : DSL = JSON.parse(data)
    
  } catch (err) {
    console.log(err)
  }
}
