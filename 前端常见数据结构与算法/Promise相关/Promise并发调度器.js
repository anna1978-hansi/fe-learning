/**
 * 使用方式：
 * const scheduler = new Scheduler(2)

function timeout(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

scheduler.add(() => timeout(1000)).then(res => console.log(res))
scheduler.add(() => timeout(500)).then(res => console.log(res))
scheduler.add(() => timeout(300)).then(res => console.log(res))
scheduler.add(() => timeout(400)).then(res => console.log(res))
 */
class scheduler{
    constructor(max){
        this.max=max;
        this.running=0
        this.queue=[]
    }
    add(task){
        /**
         * 输入结果是一个promise
         * 返回结果是promise
        */
        return new Promise((res,reject)=>{
            // 这一块是将task+res和reject放入queue
            //等待queue跑出来run之后，调用这个task的res
            //这样那个res去处理这个promise状态
            this.queue.push({task,res,reject})
            this.run()
        })
    }
    run(){
        /**
         * 根据公共变量running去判断，这一次这个任务是否能执行
         * 或者也不是add的任务，主要是要看this.queue
         */
        if(this.running>=this.max){
            return
        }
        if(!this.queue.length){
            return 
        }
        /**
         * 不然就可以弹出最先加入的一个任务&&执行
         */
        this.running++
        const{task,res,reject}=this.queue.shift()
        task().then((success)=>{
            res(success)
        }).catch((fail)=>{
            reject(fail)
        }).finally(()=>{
            this.running--
            this.run()
        })
    }
}