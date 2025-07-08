interface Input {
    children : React.ReactNode
}

const text = ({children} : Input) => {
    return(
        <h1>{children}</h1>
    )
}

export default text