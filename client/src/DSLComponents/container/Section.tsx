import Convertor from "../../components/Convertor";
import type { DSLComponent } from "../../utils/DSL/sanetizer";

export default function Section({ id, style, children } : {id : DSLComponent["id"], style : DSLComponent["style"], children : DSLComponent["children"]}) {
  return <section style={style}>
    <Convertor components={children}/>
  </section>
}
