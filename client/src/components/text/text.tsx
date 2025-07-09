interface Input {
  children: React.ReactNode
  style: React.CSSProperties
}

const text = ({ children, style }: Input) => {
  return <h1 style={style}>{children}</h1>
}

export default text
