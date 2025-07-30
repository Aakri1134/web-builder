import { useSetRecoilState } from "recoil"
import type { DSLComponent } from "../utils/DSL/sanetizer"
import { currentComponentID } from "../recoil/atoms/component"

type ID = DSLComponent["id"]


// ideal version, need to reduce rerenders, but for now ill go with a dumber version
// export default function useComponentClickHandler(parents: ID[]) {
//   const [activeComponent, setActiveComponent] =
//     useRecoilState(currentComponentID)

//   function handleComponentClick() {
//     console.log(activeComponent)
    
//     if (activeComponent === null) {
//       setActiveComponent(parents[parents.length - 1])
//       return
//     }

//     let index = parents.indexOf(activeComponent)

//     if (index === -1 || index === 0) {
//       setActiveComponent(null)
//       return
//     }

//     setActiveComponent(parents[index - 1])
//   }

//   return {handleComponentClick}
// }


export default function useComponentClickHandler(parents : ID[]){
    const setActiveComponent = useSetRecoilState(currentComponentID)
    const handleComponentClick = () => setActiveComponent(parents[parents.length - 1])
    return {handleComponentClick}
}