type InputAdjustableDiv = {
  children: React.ReactNode
}

export default function AdjustableContainer({ children }: InputAdjustableDiv) {
  return (
    <div className=" relative w-96 " >
      <div className=" absolute right-0 h-full  bg-transparent z-[2000] w-2 cursor-col-resize" />
      <div className=" absolute bottom-0 w-full  bg-transparent z-[2000] h-2 cursor-row-resize" />
      <div className=" absolute left-0 h-full  bg-transparent z-[2000] w-2 cursor-col-resize" />
      <div className=" absolute top-0 w-full bg-transparent z-[2000] h-2 cursor-row-resize" />
      <div id="AdjustableDiv" style={{containerType : "inline-size"}} className=" h-full w-96" >
        <div >{children}</div>
      </div>
    </div>
  )
}
