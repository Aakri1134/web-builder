type InputAdjustableDiv = {
  children: React.ReactNode
}

export default function AdjustableContainer({ children }: InputAdjustableDiv) {
  return (
    <div className=" relative w-96 " >
      <div className=" absolute right-0 h-full bg-transparent z-50 w-2" />
      <div className=" absolute bottom-0 w-full bg-transparent z-50 h-2" />
      <div />
      <div id="AdjustableDiv" className=" h-full w-96" >
        <div >{children}</div>
      </div>
    </div>
  )
}
