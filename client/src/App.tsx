import { useState } from "react"
import ModalPortal from "./components/modals/ModalPortal"

function App() {
  const [tr, settr] = useState<boolean>(false)

  return <>
  {tr && <ModalPortal hideModal={()=>{settr(false)}}><h1>hello</h1></ModalPortal>}
    <button onClick={() => {settr(x => !x)}}>{tr}</button>
  </>
}

export default App
