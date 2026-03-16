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