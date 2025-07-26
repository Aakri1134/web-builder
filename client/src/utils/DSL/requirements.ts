import { type DSLComponent, type Report } from "./sanetizer";

// to check if the required parameters are present in component.props
type PropKeys = (keyof NonNullable<DSLComponent["props"]>)
const requirements : {[key in DSLComponent["type"]] : PropKeys[]}= {
    Button : ["text", "onClick"],
    Link : ["text", "href"],
    Image : ["src", "alt"],
    Heading : ["text"],
    Text : ["text"],
    Show : ["onClick"],

    Card : [],
    "Section-Horizontal" : [],
    "Section-Vertical" : [],
    Body : [],
    Div : [],
    Loop : [],
    Dropdown : [],
    Modal : []
} 

export function checkRequirements (component : DSLComponent) : {
    success  : boolean,
    report : Report[]
} {
    let report : Report[] = [];
    const res: boolean = requirements[component.type].every((x: PropKeys) => {
        if(!component.props){
            report.push({
                id: component.id,
                reason: `props not found in the ${component.type}`
            });
            return false
        }
        if (component.props[x] === undefined || component.props[x] === null) {
            report.push({
                id: component.id,
                reason: `${x} not found in the ${component.type}`
            });
            return false;
        }
        return true;
    });
    return {
        success: res,
        report
    };
}