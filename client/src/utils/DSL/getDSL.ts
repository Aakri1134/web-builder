import { convertor } from "./convertor";
import sanetizer, { type DSL } from "./sanetizer";

export function getDSL(){
    // fetch DSL
    //@ts-ignore
    const DSL : DSL = {}

    console.log("Running Tests...")
    const res = sanetizer(DSL)
    if(res){
        convertor(DSL)
    }else{
        // handle invalid DSLs
    }
}