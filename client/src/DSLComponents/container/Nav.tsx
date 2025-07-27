import Convertor from "../../components/Convertor";
import type { DSLComponent } from "../../utils/DSL/sanetizer";

export default function Nav({ id, style, children } : {id : DSLComponent["id"], style : DSLComponent["style"], children : DSLComponent["children"]}) {
  return <nav style={style}>
    <Convertor components={children}/>
  </nav>
}
