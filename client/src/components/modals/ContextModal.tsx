import {} from "react"
import "./Modal.css"

interface InputContextModal {
  position: {
    left: string
    top: string
  }
  options: Option[]
  handleResponse : (token : EditTokens) => void
}

interface Option extends EditTokens {
  name: string
}

export interface EditTokens{
  token: "text" | "weight" | "family" | "line-height" | "height" | "size"
}

const ContextModal = ({ position, options, handleResponse }: InputContextModal) => {
  return (
      <div
        style={{
          position: "fixed",
          ...position,
        }}
        className="modal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {options.map(({name, token}: Option) => {
            return(
                <div
                key={name}
                    onClick={() => {handleResponse({token})}}
                    className="button"
                >
                    <p style={{ margin: 0 }}>{name}</p>
                </div>
            )
        })}
      </div>
  )
}

export default ContextModal
