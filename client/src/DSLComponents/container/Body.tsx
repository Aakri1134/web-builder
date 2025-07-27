import Convertor from "../../components/Convertor";
import type { DSLComponent } from "../../utils/DSL/sanetizer";

export default function Body({ id, style, children } : {id : DSLComponent["id"], style : DSLComponent["style"], children : DSLComponent["children"]}) {
  return <body style={style}>
    <Convertor components={children}/>
  </body>
}
