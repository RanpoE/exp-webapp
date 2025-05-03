import { useReducer, useState } from "react";

export function useToggleState(initialState=false){
    const [state, setState] = useState(initialState)

    const toggleState = useReducer((state) => !state)

    
}