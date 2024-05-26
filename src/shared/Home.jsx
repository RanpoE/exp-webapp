import { useState } from "react"
import { Login } from "../pages/Login";
export function Home(){
    const [logged] = useState(false);

    return (
        logged ? (
            <div className="flex w-screen h-screen">
                <h1 className="text-3xl mx-auto">Welcome user</h1>
            </div>
        ) : (<Login />)
    )
}
