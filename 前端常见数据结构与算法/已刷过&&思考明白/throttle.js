function throttle(fn, wait = 300) {
  let lastTime=0;
  return function(...args){
    const now=Date.now()
    if(now-lastTime>wait){
        //可以执行
        fn.apply(this,args)
        lastTime=now
    }
  }
}
