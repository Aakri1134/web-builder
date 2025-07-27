import useStyle from "../../hooks/useStyle"
import type { DSLComponent } from "../../utils/DSL/sanetizer"


export default function Heading ({ id, props, style }: Partial<DSLComponent>) {

  return <h1 style={{...style}}>{props?.text}</h1>
}


