import Convertor from "../../components/Convertor";
import type { DSLComponent } from "../../utils/DSL/sanetizer";

export default function Article({ id, style, children } : {id : DSLComponent["id"], style : DSLComponent["style"], children : DSLComponent["children"]}) {
  return <article style={style}>
    <Convertor components={children}/>
  </article>
}
