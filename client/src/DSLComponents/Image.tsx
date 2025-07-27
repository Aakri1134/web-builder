import type { DSLComponent } from "../utils/DSL/sanetizer";

export default function Button ({id, style, props} : DSLComponent) {
    // logic for ???
    return (
    <img style={style} src={props?.src} alt={props?.alt || ""}></img>
    )
}