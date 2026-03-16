const { useState, useEffect } = require("react");

/**
 * 核心：延迟更新 value
 */
function useDebounce(value,delay=500){
    const [debounce,setDebounce]=useState(value);
    useEffect(()=>{
         const timer=setTimeout(()=>{
            setDebounce(value)
         },delay)
         return ()=>clearInterval(timer)
    },[value,delay])

    return debounce
}