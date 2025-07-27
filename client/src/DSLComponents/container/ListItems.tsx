import Convertor from "../../components/Convertor";
import type { DSLComponent } from "../../utils/DSL/sanetizer";

export default function ListItems({ id, style, children } : {id : DSLComponent["id"], style : DSLComponent["style"], children : DSLComponent["children"]}) {
  return <li style={style}>
    <Convertor components={children}/>
  </li>
}
