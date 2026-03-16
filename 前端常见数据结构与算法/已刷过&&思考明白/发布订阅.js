class EventBus{
    constructor(){
        this.events={}
    }
     // 订阅
    on(event, callback) {
        if (!this.events[event]) {
        this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
    emit(event,...args){
        if (!this.events[event]) return;
        this.events[event].forEach((callback)=>{
            callback(...args)
        })
    }
    once(event,callback){
        const wrapper=(...args)=>{
            callback(args)
            this.off(event.wrapper)
        }
        this.on(event,wrapper)
    }   
}