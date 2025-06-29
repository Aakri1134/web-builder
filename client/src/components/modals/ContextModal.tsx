import {} from "react"

interface InputContextModal {
  position: {
    left: string
    top: string
  }
  hideModal: () => void
  options: Option[]
}

interface Option {
  name: string
  callback: () => void
}

const ContextModal = ({ position, hideModal, options }: InputContextModal) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
      onClick={hideModal}
    >
      <div
        style={{
          position: "fixed",
          ...position,
          width: "100vw",
          maxWidth: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {options.map(({name, callback}: Option) => {
            return(
                <div onClick={callback}>
                    <h1>{name}</h1>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default ContextModal
