import { useState } from "react";

export default function useStyle(initial : React.CSSProperties) {
    const [style, setStyle] = useState<React.CSSProperties>(initial)

    const updateStyle = (key : keyof React.CSSProperties, value : any) => {
        setStyle(x => ({...x, [key] : value}))
    }

    return [style, updateStyle]
}