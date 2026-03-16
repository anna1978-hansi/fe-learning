/**
 * 传入一个数组；
 * 返回一个promise，最先完成的结果，不看成功与否。
 */


static race(promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            if (promise instanceof MyPromise) {
                promise.then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            } else {
                resolve(promise)
            }
        })
    })
}