/**
 * 传入一个数组；调用reject；
 * 返回第一个失败的那个 promise 的 reason
 */

static all(promises){
    let count=0; //处理
    const result=[]
    return new Promise(resolve,reject){
        const addData=(index,value)=>{
            result[index]=value
            count++
            if(count===promises.length)resolve(result)
        }
        promises.forEach((p,index)=>{
            if(p instanceof Promise){
                p.then(res=>{
                    addData(index,res)
                },err=>{
                    //错误，直接
                    reject(err)
                })
            }else{
                //如果不是promise，直接添加
                addData(index,p)
            }
        })
    }
}