import { useState } from "react";

export default function Counter(){
    const[count,setCount]=useState();

    return (
        <div>
             <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>reset</button>

        </div>
    )
}