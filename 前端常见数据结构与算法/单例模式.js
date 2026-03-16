/**
 * class写法
 */
class SingleTon{
    static instance=null
    constructor(){
        if(!SingleTon.instance){
            //如果不存在
            SingleTon.instance=this
        }
        return SingleTon.instance
    }
    static get(){
        if(!SingleTon.instance){
            SingleTon.instance=new SingleTon()
        }
        return SingleTon.instance
    }
}
class SingleTon{
    static instance=null
    constructor(){
        if(!SingleTon.instance){
            //不存在创建
            SingleTon.instance=this// 这个this怎么理解？-->相当于new出来的那个object
        }
        return SingleTon.instance
    }
    static get(){
         if(!SingleTon.instance){
            SingleTon.instance=new SingleTon()
        }
        return SingleTon.instance
    }
}
/**
 *  函数写法
 */
const danli=function(){
    this.instance=null
}
//开始处理
danli.getInstance=function(){
    if(!danli.instance){
        danli.instance=new danli()
    }
    return danli.instance
}
let a=danli.getInstance()
let b=danli.getInstance();
console.log(a===b)

// 后面改为this.instance 
//因为可以代码复用：
/**
 * 
 * const get = danli.getInstance
get("a")

这时候调用方式变了：

get()
 */