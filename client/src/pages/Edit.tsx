import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { DSL } from "../utils/DSL/sanetizer"
import Convertor from "../components/Convertor"
import { getDSL } from "../utils/DSL/getDSL"
import "../Custom.css"

export default function Edit() {
//@ts-ignore
  const { id } = useParams()
  const [DSL, setDSL] = useState<DSL>({
    components: [],
    functions: [],
  })

  const fetchDSL = () => {
    const res = getDSL("");
    if(!res){
        setDSL({
            components : [],
            functions : []
        })
    }else{
        setDSL(res)
    }
  } 

  useEffect(() => {
    fetchDSL()
  }, [])

  return (
    <div style={{
        margin : 0
    }}>
      <Convertor components={DSL.components} parents={[]}/>
    </div>
  )
}
