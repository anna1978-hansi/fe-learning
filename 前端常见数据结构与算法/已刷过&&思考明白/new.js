// 这一块写new的代码
/**
 * 
 * @param {*} constructor 
 * @param  {...any} args 
 * 传入一个构造函数，然后构造函数的args作为入参。
 */
function myNew(constructor,...args){
    const obj = {}

    Object.setPrototypeOf(obj, constructor.prototype)

    const result = constructor.apply(obj,args)

    if(result && (typeof result === 'object' || typeof result === 'function')){
        return result
    }

    return obj
}