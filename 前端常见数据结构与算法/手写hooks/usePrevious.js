/**
 * （获取上一次值）
 * @param {*} value 
 */

const { useEffect } = require("react")

function usePrevious(value){
    const ref=useRef(0)
    useEffect(()=>{
         ref.current = value;
    },[value])

    return ref.current
}