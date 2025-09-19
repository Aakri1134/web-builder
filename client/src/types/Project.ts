import type { DSL } from "./DSL"

export type Project = {
    id : string
    name : string
    pages : {
        id : string
        name : string
        page : DSL
    }[]
}