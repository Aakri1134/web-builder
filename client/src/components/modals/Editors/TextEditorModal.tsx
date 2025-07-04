export interface InputTextEditor {
    initial : string | number
    position : {
        left : string,
        top : string
    },
    handleChange : (value : string) => void
    toggleVisibility : () => void
    heading : string
}

const TextEditorModal = ({initial, position, handleChange, toggleVisibility, heading} : InputTextEditor) => {

    return(
            <div 
            style={{
                position : "fixed",
                ...position,
                width : "100vw",
                maxWidth : "300px",
                backgroundColor : "rgba(255, 255, 255, 0.95)"
            }}
            onClick={(e) => {e.stopPropagation()}}>
                <h1>{heading}</h1>
                <input
                    value={initial}
                    onChange={(e) => {handleChange(e.target.value)}}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            toggleVisibility()
                        }
                    }}
                />
            </div>
    )
}   

export default TextEditorModal