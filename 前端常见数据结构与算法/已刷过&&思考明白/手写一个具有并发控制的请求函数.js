function requestPool(tasks, max) {
    return new Promise((resolve,reject)=>{
        let running=0 //记录正在执行的数量
        const result=[],length=tasks.length
        let index=0  //记录一下执行的顺序
        function runNext() {
            //所有任务完成
            if(){
                resolve(result)
            }
            while(running<max&&index<length){
                //找到这个任务
                const tempIndex=index
                index++
                running++
                task[tempIndex]().then((res)=>{

                },err=>{}).finally(()=>{
                    running--
                    runNext()
                })
            }
        }
        runNext()
    })
}