/**
 * 
 * @param {} fn 
 * @param {*} wait 
 * @returns 
 * 
 * 防抖是wait内再出发重新计时；最后一次wait之后再触发
 */
function debounce(fn,wait=300){
    let timer=null //一开始初始化
    return function(...args){
        //直接定时器wait=300执行
        /**
         * 这里的this，其实是在调用函数的时候，动态决定的
         */
        const context=this
         if(timer){
            //之前有定时器，所以清楚
            clearTimeout(timer)
         }
         timer=setTimeout(()=>{
            fn.apply(context,...args)
            timer=null;
         },wait)
    }
}