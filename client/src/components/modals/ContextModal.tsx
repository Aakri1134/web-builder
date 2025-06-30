import {} from "react"
import "./Modal.css"

interface InputContextModal {
  position: {
    left: string
    top: string
  }
  options: Option[]
}

interface Option {
  name: string
  callback: () => void
}

const ContextModal = ({ position, options }: InputContextModal) => {
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
        {options.map(({name, callback}: Option) => {
            return(
                <div
                    onClick={callback}
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
