import { useEffect, useState } from "react";

export default function Timer(){
    //记录时间
    const [count, setCount] = useState(0);
    //记录是否停止计时器
    const [running, setRunning] = useState(false);
    useEffect(()=>{
        if(!running)return
        const timer=setInterval(()=>{
            setCount(c=>c+1)
        },1000)
        return ()=>clearInterval(timer)
    },[running])

    return(
        <div>
            <div>{count}</div>
            <button onClick={() => setRunning(true)}>start</button>
            <button onClick={() => setRunning(false)}>stop</button>
        </div>
    )
}