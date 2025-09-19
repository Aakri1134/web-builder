export type DSLComponent = {
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
    mobile?: string // @container (max-width: 768px) {${mobile}} plain CSS for responsiveness
    tablet?: string // @container (min-width: 769px) and (max-width: 1024px) {${tablet}}plain CSS for responsiveness
    desktop?: string // @container (min-width: 1025px) {${desktop}} plain CSS for responsiveness
    large?: string // @container (min-width: 1440px) {${large}} plain CSS for responsiveness
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

export type DSLFunctions = {
  id: string
  input: any[]
  type: "api-call" | "navigate" | "show-modal"
  inputs?: {
    [key: string]: string | number
  }
}

export type DSL = {
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
    mobile?: string // "@container (max-width: 768px)" plain CSS for responsiveness
    tablet?: string // "@container (min-width: 769px) and (max-width: 1024px)" plain CSS for responsiveness
    desktop?: string // "@container (min-width: 1025px)" plain CSS for responsiveness
    large?: string // "@container (min-width: 1440px)" plain CSS for responsiveness
  }
}