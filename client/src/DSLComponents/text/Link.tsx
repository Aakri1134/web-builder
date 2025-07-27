import useStyle from "../../hooks/useStyle"
import type { DSLComponent } from "../../utils/DSL/sanetizer"


export default function Text ({ id, props, style }: DSLComponent) {

  return <a href={props?.href} style={{...style}}>{props?.text}</a>
}


