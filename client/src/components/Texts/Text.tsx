import type React from "react"

interface InputText {
    initial : string,
    style : React.CSSProperties
}

const Text = ({initial, style} : InputText) => {
    return(
        <p style={{
            ...style
        }}>{initial}</p>
    )
}

export default Text