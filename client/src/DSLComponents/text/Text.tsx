import useStyle from "../../hooks/useStyle"
import type { DSLComponent } from "../../utils/DSL/sanetizer"


export default function Text ({ id, props, style }: Partial<DSLComponent>) {

  return <p style={{...style}}>{props?.text}</p>
}


