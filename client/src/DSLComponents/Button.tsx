import type { DSLComponent } from "../utils/DSL/sanetizer";

export default function Button ({id, style, props} : DSLComponent) {
    // logic to convert props.onClick to premade functions
    // logic for visibility
    // logic for ???
    return (
    <button style={style}>
        {props?.text}
    </button>
    )
}