import { useRecoilValue } from "recoil"
import { currentComponentID } from "../../recoil/atoms/component"
import useComponentEdit from "../../hooks/getComponentEdit";
import { useRef } from "react";
import { checkPresence } from "../../utils/DSL/requirements";

export default function GlobalEditor () {

    const activeComponentID = useRecoilValue(currentComponentID)
    const textInput = useRef(null)

    if(activeComponentID === null){
        return;
    }
    //@ts-ignore
    const {style, setStyle, props, setProps} = useComponentEdit(activeComponentID)


    return(
        <div style={{
            width : "95px",
            backgroundColor : "black"
        }}>
            {props.text && <div>
                <h1>Text</h1>
                <input
                ref={textInput}
                placeholder={props.text}
                type="text"
                />
            </div>}

        </div>
    )
}