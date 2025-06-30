import type { InputTextEditor } from "./TextEditorModal";

interface InputDropdownEditor extends InputTextEditor {
    options : Option[]
}

interface Option {
    value : string
    outputType : "string" | "number"
    text : string
}

export default function DropdownEditorModal ({} : InputDropdownEditor) {
    return(
        <></>
    )
}