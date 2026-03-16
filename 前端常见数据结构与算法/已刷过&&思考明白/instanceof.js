/**
 * obj instanceOf Constructor
 * 思路就是说，判断obj__proto__是否为Constructor.prototype
 */

function myInstanceOf(obj,Constructor){
    let proto=Object.getPrototypeOf(obj)
    while(proto){
        if(proto==Constructor.prototype){
            return true
        }
        //不然修改proto
        proto=Object.getPrototypeOf(proto)
    }

    return false
}