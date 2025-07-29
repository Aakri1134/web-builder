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
    console.log(DSL)
  }, [])

  return (
    <><style>
        {DSL.hover}
        {DSL.animations}
        {DSL.theme?.light}
        {DSL.theme?.dark}
      </style>
    <div style={{
        margin : 0
    }}
    className="light"
    >
      
      <Convertor components={DSL.components} parents={[]}/>
    </div>
    </>
  )
}
