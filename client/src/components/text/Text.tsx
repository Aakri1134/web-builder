import useStyle from "../../hooks/useStyle"

interface Input {
  children: React.ReactNode
  initial? : React.CSSProperties
}

export default function Text ({ children, initial }: Input) {

  const [style, updateStyle] = useStyle(initial || {
    color : "black",
    
  })
  return <h1 style={{...style}}>{children}</h1>
}


