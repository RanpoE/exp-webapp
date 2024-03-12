import { useState } from "react"
import { Login } from "../pages/Login";
export const Home = () => {
    const [logged, setLogged] = useState(false);

    return (
        logged ? (<div>hello</div>) : (<Login />)
    )
}
