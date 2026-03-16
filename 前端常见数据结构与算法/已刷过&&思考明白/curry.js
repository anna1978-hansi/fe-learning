/*场景：
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1, 2, 3)); // 6
*/

function curry(fn) {
  return function curried(...args){
    if(args.length>=fn.length){
        //执行fn
        return fn.apply(this,args)
    }
    return function(...restArgs){
        return curried.apply(this,args.concat(restArgs))
    }
  }
}