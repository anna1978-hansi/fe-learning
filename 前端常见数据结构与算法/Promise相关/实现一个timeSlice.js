function timeSlice(tasks,options={}){
    const {timeLimit=10}=options
    let index=0
    const result=[]
    let finished=0
    return new Promise((resolved,reject)=>{
        function runChunk(){
            /**
             * 将任务放入runChunk，借此可以宏任务放入下一轮循环
             * 不然又要这个流程再写一遍
             */
            while(index<tasks.length&&Date.now()-start<timeLimit){
                const cur=index++
                try{
                    const res=tasks[cur]()
                    resule[cur]=res
                    finished++
                }catch(e){
                    reject(e)
                    return
                }
            }

            if(finished===tasks.length){
                resolved(result)
                return 
            }
            //剩下的任务放入宏任务队列。
            setTimeout(runChunk,0)
        }
        runChunk()
    })
}