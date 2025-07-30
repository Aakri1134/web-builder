import { captureException } from "@sentry/react"
import type { DSLComponent } from "./sanetizer"

type Type = DSLComponent["type"]
type ID = DSLComponent["id"]

const IDMap: Map<ID, Type> = new Map()

export function addElementToTypeMap(type: Type, id: ID) {
  try {
    IDMap.set(id, type)
  } catch (err) {
    console.log(err)
    captureException(err)
  }
}

export function clearMap(): void {
    IDMap.clear()
}

export function getType(id : ID): Type | null {
    return IDMap.get(id) || null
}

export function getIDs(type : Type) : ID[]{
    let IDs : ID[] = [];
    IDMap.forEach((value, key) => {
        if(value === type){
            IDs.push(key)
        }
    })
    return IDs
}
