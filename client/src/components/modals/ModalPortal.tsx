import { useEffect } from "react"
import { createPortal } from "react-dom"

export default function ModalPortal({
  children,
  hideModal,
}: {
  children: React.ReactNode
  hideModal: () => void
}) {
  useEffect(() => {
    const scrollY = window.scrollY
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, scrollY)
    }
  }, [])

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        height : "100%"
      }}
      onClick={hideModal}
    >
      {children}
    </div>,
    document.body
  )
}
