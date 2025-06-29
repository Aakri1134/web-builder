interface InputTextEditor {
    initial : string
    position : {
        left : string,
        top : string
    },
    handleChange : (value : string) => void
    toggleVisibility : () => void
}

const TextEditorModal = ({initial, position, handleChange, toggleVisibility} : InputTextEditor) => {

    return(
        <div 
        style={{
            position : "absolute",
            inset : 0,
            backgroundColor : "rgba(0, 0, 0, 0.2)"
        }}
        onClick={toggleVisibility}>
            <div 
            style={{
                position : "fixed",
                ...position,
                width : "100vw",
                maxWidth : "300px",
                backgroundColor : "rgba(255, 255, 255, 0.95)"
            }}
            onClick={(e) => {e.stopPropagation()}}>
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
        </div>
    )
}   

export default TextEditorModal