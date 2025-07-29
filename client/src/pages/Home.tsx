import { Link } from "react-router";

export default function Home () {
    return(
        <div>
            <h1 className="">Home</h1>
            <Link to="/edit/1" >1</Link>
            <Link to="/edit/2" >2</Link>
            <Link to="/edit/3" >3</Link>
        </div>
    )
}